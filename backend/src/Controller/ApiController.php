<?php

namespace App\Controller;

use App\Entity\Users;
use App\Entity\UserRoles;
use App\Entity\AuthTokens;
use App\Entity\Books;
use App\Entity\BookGenres;
use App\Repository\UsersRepository;
use App\Repository\RolesRepository;
use App\Repository\AuthTokensRepository;
use App\Repository\GenresRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api')]
final class ApiController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UsersRepository $usersRepository,
        private RolesRepository $rolesRepository,
        private AuthTokensRepository $authTokensRepository,
        private GenresRepository $genresRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/profilePicture/{fileName}', name: 'api_profile_picture')]
	public function downloadAttachedFile($fileName)
	{
        return $this->file($_ENV["BACKEND_PATH"] . '/images/profile_pictures/' . $fileName, $fileName, ResponseHeaderBag::DISPOSITION_INLINE);
	}

    #[Route('/register', name: 'api_register')]
    public function apiRegister(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);

        $emailExists = $this->usersRepository->findOneBy(["email" => $payload["email"]]);
        $usernameExists = $this->usersRepository->findOneBy(["username" => $payload["username"]]);

        if($emailExists) {
            return new JsonResponse([
                'result' => false,
                'message' => sprintf("Un utilisateur avec l'e-mail %s est déjà connu.", $payload["email"])
            ]);
        }

        if($usernameExists) {
            return new JsonResponse([
                'result' => false,
                'type' => 'userExists',
                'message' => sprintf("Un utilisateur avec le nom d'utilisateur %s est déjà connu.", $payload["username"])
            ]);
        }

        $errors = [
            "displayName" => [],
            "username" => [],
            "email" => [],
            "password" => [],
            "confirmPassword" => []
        ];

        foreach ($payload as $field => $value) {
            switch ($field) {
                case 'displayName':
                    $displayNameType = is_string($value);
                    $displayNameMinLength = strlen($value) > 0;
                    $displayNameMaxLength = strlen($value) <= 255;

                    if (!$displayNameType) {
                        $errors['displayName'][] = "❌ Chaîne de caractères";
                    }

                    if (!$displayNameMinLength) {
                        $errors['displayName'][] = "❌ Minimum 1 caractère.";
                    }

                    if (!$displayNameMaxLength) {
                        $errors['displayName'][] = "❌ Maximum 255 caractères.";
                    }
                    break;

                case 'username':
                    $usernameType = is_string($value);
                    $usernameMinLength = strlen($value) > 4;
                    $usernameMaxLength = strlen($value) <= 255;
                    $usernameHasSpaces = strpos($value, ' ') === false;
                    $usernameHasEmojis = !preg_match('/\p{Emoji}/u', $value);

                    if (!$usernameType) {
                        $errors['username'][] = "❌ Chaîne de caractères";
                    }

                    if (!$usernameMinLength) {
                        $errors['username'][] = "❌ Minimum 4 caractères.";
                    }

                    if (!$usernameMaxLength) {
                        $errors['username'][] = "❌ Maximum 255 caractères.";
                    }

                    if (!$usernameHasSpaces) {
                        $errors['username'][] = "❌ Pas d'espace(s).";
                    }

                    if (!$usernameHasEmojis) {
                        $errors['username'][] = "❌ Pas d'émojis.";
                    }
                    break;

                case 'password':
                    $passwordType = is_string($value);
                    $passwordMinLength = strlen($value) >= 6;
                    $passwordMaxLength = strlen($value) <= 255;
                    $passwordHasSpaces = strpos($value, ' ') === false;
                    $passwordHasNumbers = preg_match('/\d/', $value) === 1;
                    $passwordHasUpperCase = preg_match('/[A-Z]/', $value) === 1;;

                    if (!$passwordType) {
                        $errors['password'][] = "❌ Chaîne de caractères";
                    }

                    if (!$passwordMinLength) {
                        $errors['password'][] = "❌ Minimum 4 caractères.";
                    }

                    if (!$passwordMaxLength) {
                        $errors['password'][] = "❌ Maximum 255 caractères.";
                    }

                    if (!$passwordHasSpaces) {
                        $errors['password'][] = "❌ Ne doit pas contenir d'espace(s).";
                    }

                    if (!$passwordHasNumbers) {
                        $errors['password'][] = "❌ Minimum 1 nombre.";
                    }

                    if (!$passwordHasUpperCase) {
                        $errors['password'][] = "❌ Minimum 1 majuscule.";
                    }
                    break;

                case 'confirmPassword':
                    $confirmPasswordIsPassword = $payload["password"] === $value;

                    if (!$confirmPasswordIsPassword) {
                        $errors['confirmPassword'][] = "❌ Égal au mot de passe.";
                    }
                    break;
            }
        }

        if(
            count($errors["displayName"]) > 0
            || count($errors["username"]) > 0
            || count($errors["email"]) > 0
            || count($errors["password"]) > 0
            || count($errors["confirmPassword"]) > 0
        ) {
            return new JsonResponse([
                'result' => false,
                'type' => 'formErrors',
                'errors' => $errors
            ]);
        }

        $user = new Users();

        $user->setDisplayName($payload["displayName"]);
        $user->setUserName($payload["username"]);
        $user->setEmail($payload["email"]);
        $user->setPassword(password_hash($payload["password"], PASSWORD_DEFAULT));
        $user->setProfilePicture("default.jpg");
        $user->setStatus("N");
        $user->setIsActive(true);
        $user->setIsDeleted(false);
        $user->setCreatedAt(new \DateTime());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $userRole = new UserRoles();
        $userRole->setUser($user);
        $userRole->setRole($this->rolesRepository->findOneBy(["name" => "Utilisateur"]));
        $userRole->setStatus("N");
        $userRole->setIsActive(true);
        $userRole->setIsDeleted(false);
        $userRole->setCreatedAt(new \DateTime());

        $this->entityManager->persist($userRole);
        $this->entityManager->flush();

        return new JsonResponse([
            'result' => true,
            'message' => "Utilisateur créé avec succès !"
        ]);
    }

    #[Route('/login', name: 'api_login')]
    public function apiLogin(Request $request): Response
    {
        // header("Access-Control-Allow-Origin: *");
        $payload = json_decode($request->getContent(), true);

        $user = $this->usersRepository->findOneBy(["email" => $payload["email"]]);

        if(!$user) {
            return new JsonResponse([
                'result' => false,
                'type' => 'userNotExists',
                'message' => sprintf("Un utilisateur avec l'e-mail %s n'existe pas.", $payload["email"])
            ]);
        }

        if(!password_verify($payload["password"], $user->getPassword())) {
            return new JsonResponse([
                'result' => false,
                'type' => 'passwordNotMatches',
                'message' => "Le mot de passe est incorrect."
            ]);
        }

        $userHasValidToken = $this->authTokensRepository->findByUserAndValidity($user);
        if($userHasValidToken !== null) {
            return new JsonResponse([
                'result' => true,
                'message' => "Une session valide pour cet utilisateur existe déjà !",
                'token' => $userHasValidToken->getToken()
            ]);
        }

        $authToken = new AuthTokens();

        $date = date('Y-m-d H:i:s');
        $dateObject = new \DateTime(date('Y-m-d H:i:s', strtotime($date . " +6 months")));

        $token = [
            "id" => $user->getId(),
            "displayName" => $user->getDisplayName(),
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "profilePicture" => $user->getProfilePicture()
        ];
        $token = base64_encode(json_encode($token));
        
        $authToken->setToken($token);
        $authToken->setValidUntil($dateObject);
        $authToken->setUser($user);
        $authToken->setStatus("N");
        $authToken->setIsActive(true);
        $authToken->setIsDeleted(false);
        $authToken->setCreatedAt(new \DateTime());

        $this->entityManager->persist($authToken);
        $this->entityManager->flush();

        return new JsonResponse([
            'result' => true,
            'message' => "Vous êtes connecté !",
            'token' => $token
        ]);
    }

    #[Route('/logout', name: 'api_logout')]
    public function apiLogout(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);
        $token = $this->authTokensRepository->findByTokenAndValidity($payload["token"]);
        $date = new \DateTime();

        if(!$token || ($token && $token->getValidUntil() < $date)) {
            return new JsonResponse([
                'result' => false,
                'type' => 'tokenNotValid',
                'message' => "Le token n'existe pas ou n'est plus valide."
            ]);
        }

        $token->setValidUntil($date);

        $this->entityManager->persist($token);
        $this->entityManager->flush();

        return new JsonResponse([
            'result' => true,
            'message' => "Vous êtes déconnecté !"
        ]);
    }

    #[Route('/genres', name: 'api_genres')]
    public function apiGenres(): Response
    {
        $genres = $this->genresRepository->findBy(["isActive" => true, "isDeleted" => false]);

        return new JsonResponse([
            "genres" => $this->serializer->serialize($genres, 'json')
        ]);
    }

    #[Route('/createBook/{screen}', name: 'api_create_book')]
    public function apiCreateBook(Request $request, $screen = null): Response
    {
        $payload = $request->request->all();
        // header("Access-Control-Allow-Origin: *");
        // dd($payload);

        $possibleScreens = ["book", "characters", "locations", "relations"];
        if(!in_array($screen, $possibleScreens)) {
            return new JsonResponse([
                'result' => false,
                'type' => 'screenNotValid',
                'message' => "L'écran n'est pas valide."
            ]);
        }

        if(!array_key_exists("token", $payload)) {
            return new JsonResponse([
                'result' => false,
                'type' => 'noToken',
                'message' => "Il manque un token."
            ]);
        }

        $token = $this->authTokensRepository->findByTokenAndValidity($payload["token"]);
        $date = new \DateTime();

        if(!$token || ($token && $token->getValidUntil() < $date)) {
            return new JsonResponse([
                'result' => false,
                'type' => 'tokenNotValid',
                'message' => "Le token n'existe pas ou n'est plus valide."
            ]);
        } else {
            $user = $token->getUser();
            $token = $token->getToken();
        }

        if($screen === "book") {
            $missingData = [];

            if(!array_key_exists("title", $payload)) {
                $missingData[] = "Il manque le titre du livre.";
            }

            if(!array_key_exists("genre", $payload)) {
                $missingData[] = "Il manque le genre du livre.";
            }

            if(!array_key_exists("visibility", $payload)) {
                $missingData[] = "Il manque la visiblité du livre.";
            }

            if(count($missingData) > 0) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => implode(" ", $missingData)
                ]);
            }

            if(strlen($payload["title"]) > 255) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Le titre du livre dépasse 255 caractères."
                ]);
            }

            if(strlen($payload["title"]) === 0) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Le titre du livre ne contient pas au moins 1 caractère."
                ]);
            }

            if(!in_array($payload["visibility"], ["public", "unlisted", "private"])) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "La visibilité du livre est invalide."
                ]);
            }

            $genre = $this->genresRepository->find($payload["genre"]);

            if($genre === null || $genre->isActive() === false || $genre->isDeleted() === true) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Le genre est invalide."
                ]);
            }

            $cover = $request->files->get('cover');
            $coverName = "";
            if($cover) {
                $tempPath = $cover->getRealPath();
                $imageName = $cover->getClientOriginalName();
                $coverName = uniqid() . "_" . $imageName;
                $cover->move($_ENV["BACKEND_PATH"] . "/images/book_covers", $coverName);
            }

            $book = new Books();

            $book->setTitle($payload["title"]);
            $book->setCover($cover ? $coverName : null);
            $book->setDescription(array_key_exists("description", $payload) ? $payload["description"] : null);
            $book->setIsNsfw(array_key_exists("isNsfw", $payload) ? $payload["isNsfw"] === true : null);
            $book->setVisibility(array_key_exists("visibility", $payload) ? $payload["visibility"] : null);
            $book->setTriggerWarnings(array_key_exists("triggerWarnings", $payload) ? $payload["triggerWarnings"] : null);
            $book->setStatus("N");
            $book->setIsActive(true);
            $book->setIsDeleted(false);
            $book->setCreatedAt($date);
            $book->setCreatedBy($user);

            $this->entityManager->persist($book);
            $this->entityManager->flush();

            $bookGenre = new BookGenres();

            $bookGenre->setBook($book);
            $bookGenre->setGenre($genre);
            $bookGenre->setStatus("N");
            $bookGenre->setIsActive(true);
            $bookGenre->setIsDeleted(false);
            $bookGenre->setCreatedAt($date);
            $bookGenre->setCreatedBy($user);

            $this->entityManager->persist($bookGenre);
            $this->entityManager->flush();

            return new JsonResponse([
                'result' => true,
                'message' => "Livre créé avec succès !",
                'bookId' => $book->getId()
            ]);
        }
    }
}
