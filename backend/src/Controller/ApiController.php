<?php

namespace App\Controller;

use App\Entity\AuthTokens;
use App\Entity\BookGenres;
use App\Entity\Books;
use App\Entity\Chapters;
use App\Entity\CharacterRelations;
use App\Entity\Characters;
use App\Entity\CharacterUserFields;
use App\Entity\Locations;
use App\Entity\LocationUserFields;
use App\Entity\UserRoles;
use App\Entity\Users;
use App\Repository\AuthTokensRepository;
use App\Repository\BooksRepository;
use App\Repository\CharacterRelationsRepository;
use App\Repository\ChaptersRepository;
use App\Repository\CharactersRepository;
use App\Repository\CharacterUserFieldsRepository;
use App\Repository\GenresRepository;
use App\Repository\LocationsRepository;
use App\Repository\LocationUserFieldsRepository;
use App\Repository\RolesRepository;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
final class ApiController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UsersRepository $usersRepository,
        private RolesRepository $rolesRepository,
        private AuthTokensRepository $authTokensRepository,
        private GenresRepository $genresRepository,
        private BooksRepository $booksRepository,
        private CharactersRepository $charactersRepository,
        private CharacterUserFieldsRepository $characterUserFieldsRepository,
        private LocationsRepository $locationsRepository,
        private CharacterRelationsRepository $characterRelationsRepository,
        private LocationUserFieldsRepository $locationUserFieldsRepository,
        private ChaptersRepository $chaptersRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/profilePicture/{fileName}', name: 'api_profile_picture')]
	public function apiProfilePicture($fileName)
	{
        return $this->file($_ENV["BACKEND_PATH"] . '/images/profile_pictures/' . $fileName, $fileName, ResponseHeaderBag::DISPOSITION_INLINE);
	}

    #[Route('/bookCover/{fileName}', name: 'api_book_cover')]
	public function apiBookCover($fileName)
	{
        return $this->file($_ENV["BACKEND_PATH"] . '/images/book_covers/' . $fileName, $fileName, ResponseHeaderBag::DISPOSITION_INLINE);
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
        // dd(json_decode($payload["relations"]));

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

        if($screen === "characters") {
            if(!array_key_exists("characters", $payload)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Il manque les personnages."
                ]);
            }

            if(!array_key_exists("bookId", $payload)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Il manque l'id du livre."
                ]);
            }

            if(json_validate($payload["characters"] === false)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Les personnages ne sont pas dans un format JSON."
                ]);
            }

            if($this->booksRepository->find($payload["bookId"]) === null) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "L'id du livre n'a pas été trouvé dans la base de données."
                ]);
            }

            foreach(json_decode($payload["characters"], true) as $character) {
                $missingData = [];
    
                if(!array_key_exists("firstName", $character)) {
                    $missingData[] = "Il manque le prénom du personnage.";
                }
    
                if(!array_key_exists("lastName", $character)) {
                    $missingData[] = "Il manque le prénom du personnage.";
                }

                if(!array_key_exists("uuid", $character)) {
                    $missingData[] = "Il manque le UUID du personnage.";
                }
    
                if(count($missingData) > 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => implode(" ", $missingData)
                    ]);
                }
                
                if(strlen($character["uuid"]) > 255) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le UUID du personnage dépasse 255 caractères."
                    ]);
                }
    
                if(strlen($character["uuid"]) === 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le UUID du personnage ne contient pas au moins 1 caractère."
                    ]);
                }

                $image = $request->files->get($character["uuid"]);
                $imageName = "";
                if($image) {
                    $tempPath = $image->getRealPath();
                    $imageName = $image->getClientOriginalName();
                    $imageName = uniqid() . "_" . $imageName;
                    $image->move($_ENV["BACKEND_PATH"] . "/images/characters", $imageName);
                }

                $characterEntity = new Characters();
                $characterInDb = $this->charactersRepository->findOneBy(["uuid" => $character["uuid"]]);
                if($characterInDb !== null) {
                    $characterEntity = $characterInDb;
                }

                $characterEntity->setUuid($character["uuid"]);
                $characterEntity->setBook($this->booksRepository->find($payload["bookId"]));
                $characterEntity->setFirstName($character["firstName"]);
                $characterEntity->setMiddleNames(array_key_exists("middleNames", $character) ? $character["middleNames"] : null);
                $characterEntity->setLastName($character["lastName"]);
                $characterEntity->setNickname(array_key_exists("nickname", $character) ? $character["nickname"] : null);
                $characterEntity->setImage($image ? $imageName : null);
                $characterEntity->setGender(array_key_exists("gender", $character) ? $character["gender"] : null);
                $characterEntity->setPronouns(array_key_exists("pronouns", $character) ? $character["pronouns"] : null);
                $characterEntity->setRace(array_key_exists("race", $character) ? $character["race"] : null);
                $characterEntity->setAge(array_key_exists("age", $character) ? $character["age"] : null);
                $characterEntity->setStatus("N");
                $characterEntity->setIsActive(true);
                $characterEntity->setIsDeleted(false);
                $characterEntity->setCreatedAt($date);
                $characterEntity->setCreatedBy($user);

                $this->entityManager->persist($characterEntity);
                $this->entityManager->flush();

                if(count($character["userFields"]) > 0) {
                    foreach($character["userFields"] as $userField) {
                        $characterUserField = new CharacterUserFields();
                        $characterUserFieldInDb = $this->characterUserFieldsRepository->findOneBy(["uuid" => $userField["uuid"]]);
                        if($characterUserFieldInDb !== null) {
                            $characterEntity = $characterUserFieldInDb;
                        }
        
                        $characterUserField->setUuid($userField["uuid"]);
                        $characterUserField->setBookCharacter($characterEntity);
                        $characterUserField->setName($userField["label"]);
                        $characterUserField->setContent($userField["value"]);
                        $characterUserField->setStatus("N");
                        $characterUserField->setIsActive(true);
                        $characterUserField->setIsDeleted(false);
                        $characterUserField->setCreatedAt($date);
                        $characterUserField->setCreatedBy($user);

                        $this->entityManager->persist($characterUserField);
                        $this->entityManager->flush();
                    }
                }
            }

            return new JsonResponse([
                'result' => true,
                'message' => "Personnages créés avec succès !",
            ]);
        }

        if($screen === "relations") {
            $missingData = [];

            if(!array_key_exists("relations", $payload)) {
                $missingData[] = "Il manque les relations.";
            }

            if(!array_key_exists("bookId", $payload)) {
                $missingData[] = "Il manque l'ID' du livre.";
            }

            if(json_validate($payload["relations"] === false)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Les relations ne sont pas dans un format JSON."
                ]);
            }

            if($this->booksRepository->find($payload["bookId"]) === null) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "L'id du livre n'a pas été trouvé dans la base de données."
                ]);
            }

            if(count($missingData) > 0) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => implode(" ", $missingData)
                ]);
            }

            foreach(json_decode($payload["relations"], true) as $relation) {
                if(!array_key_exists("characterOne", $relation)) {
                    $missingData[] = "Il manque le premier personnage.";
                }

                if(!array_key_exists("characterTwo", $relation)) {
                    $missingData[] = "Il manque le deuxième personnage.";
                }

                if(json_validate($relation["characterOne"] === false)) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le premier personnage n'est pas dans un format JSON."
                    ]);
                }

                if(json_validate($relation["characterTwo"] === false)) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le deuxième personnage n'est pas dans un format JSON."
                    ]);
                }

                $characterOne = $this->charactersRepository->findOneBy(["uuid" => $relation["characterOne"]["uuid"]]);
                $characterTwo = $this->charactersRepository->findOneBy(["uuid" => $relation["characterTwo"]["uuid"]]);

                if($characterOne === null) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "L'id du premier personnage n'a pas été trouvé dans la base de données."
                    ]);
                }

                if($characterTwo === null) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "L'id du deuxième personnage n'a pas été trouvé dans la base de données."
                    ]);
                }

                if(strlen($relation["label"]) > 255) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le libellé de la relation dépasse 255 caractères."
                    ]);
                }
    
                if(strlen($relation["label"]) === 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le libellé de la relation ne contient pas au moins 1 caractère."
                    ]);
                }
    
                $characterRelation = new CharacterRelations();
                $characterRelationInDb = $this->characterRelationsRepository->findOneBy(["uuid" => $relation["uuid"]]);
                if($characterRelationInDb !== null) {
                    $characterRelationEntity = $characterRelationInDb;
                }

                $characterRelation->setUuid($relation["uuid"]);
                $characterRelation->setFirstCharacter($characterOne);
                $characterRelation->setSecondCharacter($characterTwo);
                $characterRelation->setRelationLabel($relation["label"]);
                $characterRelation->setStatus("N");
                $characterRelation->setIsActive(true);
                $characterRelation->setIsDeleted(false);
                $characterRelation->setCreatedAt($date);
                $characterRelation->setCreatedBy($user);
    
                $this->entityManager->persist($characterRelation);
                $this->entityManager->flush();
            }

            return new JsonResponse([
                'result' => true,
                'message' => "Relations créées avec succès !",
            ]);
        }

        if($screen === "locations") {
            if(!array_key_exists("locations", $payload)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Il manque les lieux."
                ]);
            }

            if(!array_key_exists("bookId", $payload)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Il manque l'id du livre."
                ]);
            }

            if(json_validate($payload["locations"] === false)) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "Les lieux ne sont pas dans un format JSON."
                ]);
            }

            if($this->booksRepository->find($payload["bookId"]) === null) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'invalidData',
                    'message' => "L'id du livre n'a pas été trouvé dans la base de données."
                ]);
            }

            foreach(json_decode($payload["locations"], true) as $location) {
                $missingData = [];
    
                if(!array_key_exists("name", $location)) {
                    $missingData[] = "Il manque le nom du lieu.";
                }

                if(!array_key_exists("uuid", $location)) {
                    $missingData[] = "Il manque le UUID du lieu.";
                }
    
                if(count($missingData) > 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => implode(" ", $missingData)
                    ]);
                }
                
                if(strlen($location["uuid"]) > 255) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le UUID du lieu dépasse 255 caractères."
                    ]);
                }
    
                if(strlen($location["uuid"]) === 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le UUID du lieu ne contient pas au moins 1 caractère."
                    ]);
                }

                if(strlen($location["name"]) > 255) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le nom du lieu dépasse 255 caractères."
                    ]);
                }
    
                if(strlen($location["name"]) === 0) {
                    return new JsonResponse([
                        'result' => false,
                        'type' => 'invalidData',
                        'message' => "Le nom du lieu ne contient pas au moins 1 caractère."
                    ]);
                }

                $image = $request->files->get($location["uuid"]);
                $imageName = "";
                if($image) {
                    $tempPath = $image->getRealPath();
                    $imageName = $image->getClientOriginalName();
                    $imageName = uniqid() . "_" . $imageName;
                    $image->move($_ENV["BACKEND_PATH"] . "/images/locations", $imageName);
                }

                $locationEntity = new Locations();
                $locationInDb = $this->locationsRepository->findOneBy(["uuid" => $location["uuid"]]);
                if($locationInDb !== null) {
                    $locationEntity = $locationInDb;
                }

                $locationEntity->setUuid($location["uuid"]);
                $locationEntity->setBook($this->booksRepository->find($payload["bookId"]));
                $locationEntity->setName($location["name"]);
                $locationEntity->setDescription(array_key_exists("description", $location) ? $location["description"] : null);
                $locationEntity->setImage($image ? $imageName : null);
                $locationEntity->setStatus("N");
                $locationEntity->setIsActive(true);
                $locationEntity->setIsDeleted(false);
                $locationEntity->setCreatedAt($date);
                $locationEntity->setCreatedBy($user);

                $this->entityManager->persist($locationEntity);
                $this->entityManager->flush();

                if(count($location["userFields"]) > 0) {
                    foreach($location["userFields"] as $userField) {
                        $locationUserField = new LocationUserFields();
                        $locationUserFieldInDb = $this->locationUserFieldsRepository->findOneBy(["uuid" => $userField["uuid"]]);
                        if($locationUserFieldInDb !== null) {
                            $locationEntity = $locationUserFieldInDb;
                        }
        
                        $locationUserField->setUuid($userField["uuid"]);
                        $locationUserField->setBookLocation($locationEntity);
                        $locationUserField->setName($userField["label"]);
                        $locationUserField->setContent($userField["value"]);
                        $locationUserField->setStatus("N");
                        $locationUserField->setIsActive(true);
                        $locationUserField->setIsDeleted(false);
                        $locationUserField->setCreatedAt($date);
                        $locationUserField->setCreatedBy($user);

                        $this->entityManager->persist($locationUserField);
                        $this->entityManager->flush();
                    }
                }
            }

            return new JsonResponse([
                'result' => true,
                'message' => "Lieux créés avec succès !",
            ]);
        }
    }

    #[Route('/book/{bookId}/chapter/handle/{chapterId}', name: 'api_handle_chapter')]
    public function apiHandleChapter(Request $request, $bookId = null, $chapterId = null): Response
    {
        $payload = $request->request->all();

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

        $book = $this->booksRepository->find($bookId);

        if(!$book) {
            return new JsonResponse([
                'result' => false,
                'type' => 'bookNotExist',
                'message' => "Le livre n'existe pas."
            ]);
        }

        $chapter = new Chapters();
        if($chapterId !== "create") {
            $chapter = $this->chaptersRepository->find($chapterId);

            if(!$chapter) {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'chapterNotExist',
                    'message' => "Le chapitre n'existe pas."
                ]);
            }
        }

        $chapter->setBook($book);
        $chapter->setTitle($payload["title"]);
        $chapter->setSummary($payload["summary"]);
        $chapter->setContent($payload["content"]);

        if($chapterId === "create") {
            $chapter->setStatus("N");
            $chapter->setIsActive(true);
            $chapter->setIsDeleted(false);
            $chapter->setCreatedAt($date);
            $chapter->setCreatedBy($user);
        } else {
            $chapter->setUpdatedAt($date);
            $chapter->setUpdatedBy($user);
        }

        $this->entityManager->persist($chapter);
        $this->entityManager->flush();

        return new JsonResponse([
            'result' => true,
            'message' => sprintf("Chapitre %s avec succès !", $chapterId === "create" ? "crée" : "modifié"),
            'chapterId' => $chapter->getId()
        ]);
    }

    #[Route('/book/{id}', name: 'api_get_book')]
    public function apiBook(Request $request, $id = null): Response
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
        } else {
            $user = $token->getUser();
            $token = $token->getToken();
        }

        $book = $this->booksRepository->find($id);

        if(!$book) {
            return new JsonResponse([
                'result' => false,
                'type' => 'bookNotExist',
                'message' => "Le livre n'existe pas."
            ]);
        }

        if($request->query->has('forChapterCreation')) {
            if($book->getCreatedBy() === $user) {
                return new JsonResponse([
                    'result' => true,
                    'book' => $this->serializer->serialize($book, 'json')
                ]);
            } else {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'bookNotBelongsToUser',
                    'message' => "Le livre ne vous appartient pas."
                ]);
            }
        }

        if($request->query->has('forBookCreation')) {
            // interface CharacterInterface {
            //     firstName: string;
            //     middleNames: string;
            //     lastName: string;
            //     nickname: string;
            //     gender: string;
            //     pronouns: string;
            //     race: string;
            //     age: string;
            //     uuid: string;
            //     image: File|null;
            //     imageBase64: string;
            //     public: boolean;
            //     userFields: {
            //         label: string;
            //         value: string;
            //         uuid: string;
            //     }[];
            // }
            
            // interface RelationInterface {
            //     characterOne: CharacterInterface,
            //     characterTwo: CharacterInterface,
            //     label: string;
            //     uuid: string;
            // }
            
            // interface LocationInterface {
            //     name: string;
            //     description: string;
            //     uuid: string;
            //     image: File|null;
            //     imageBase64: string;
            //     public: boolean;
            //     userFields: {
            //         label: string;
            //         value: string;
            //         uuid: string;
            //     }[];
            // }

            if($book->getCreatedBy() === $user) {
                $characters = [];
                $charactersFromBook = $this->charactersRepository->findBy(["book" => $book, "isActive" => true, "isDeleted" => false]);
                foreach($charactersFromBook as $character) {
                    $characterUserFields = [];
                    $userFieldsFromCharacter = $this->characterUserFieldsRepository->findBy(["character" => $character, "isActive" => true, "isDeleted" => false]);
                    foreach($userFieldsFromCharacter as $userField) {
                        $characterUserFields[] = [
                            "label" => $userField->getLabel(),
                            "value" => $userField->getValue(),
                            "uuid" => $userField->getUuid()
                        ];
                    }

                    $characterPath = $_ENV["BACKEND_PATH"] . "/images/characters/" . $character->getImage();
                    $characterType = pathinfo($characterPath, PATHINFO_EXTENSION);
                    $characterData = file_get_contents($characterPath);
                    $characterBase64 = 'data:image/' . $type . ';base64,' . base64_encode($characterData);

                    $characters[] = [
                        "name" => $character->getName(),
                        "description" => $character->getDescription(),
                        "uuid" => $character->getUuid(),
                        "image" => $character->getImage(),
                        "imageBase64" => $base64,
                        "public" => true,
                        "userFields" => $characterUserFields
                    ];
                }

                $locations = [];
                $locationsFromBook = $this->locationsRepository->findBy(["book" => $book, "isActive" => true, "isDeleted" => false]);
                foreach($locationsFromBook as $location) {
                    $locationUserFields = [];
                    $userFieldsFromLocation = $this->locationUserFieldsRepository->findBy(["location" => $location, "isActive" => true, "isDeleted" => false]);
                    foreach($userFieldsFromLocation as $userField) {
                        $locationUserFields[] = [
                            "label" => $userField->getLabel(),
                            "value" => $userField->getValue(),
                            "uuid" => $userField->getUuid()
                        ];
                    }

                    $locationPath = $_ENV["BACKEND_PATH"] . "/images/locations/" . $location->getImage();
                    $locationType = pathinfo($locationPath, PATHINFO_EXTENSION);
                    $locationData = file_get_contents($locationPath);
                    $locationBase64 = 'data:image/' . $type . ';base64,' . base64_encode($locationData);

                    $locations[] = [
                        "firstName" => $location->getFirstName(),
                        "middleNames" => $location->getMiddleNames(),
                        "lastName" => $location->getLastName(),
                        "nickname" => $location->getNickname(),
                        "gender" => $location->getGender(),
                        "pronouns" => $location->getPronouns(),
                        "race" => $location->getRace(),
                        "age" => $location->getAge(),
                        "uuid" => $location->getUuid(),
                        "image" => $location->getImage(),
                        "imageBase64" => $base64,
                        "public" => true,
                        "userFields" => $locationUserFields
                    ];
                }

                dd($characters);

                $relations = [];
                $relationsFromBook = $this->characterRelationsRepository->findRelationsFromCharacters($characters);
                foreach($relationsFromBook as $relation) {
                    $characterOne = array_find($characters, function($character) use($relation) {
                        return $character["uuid"] === $relation->getCharacterOne()->getUuid();
                    });
                    $characterTwo = array_find($characters, function($character) use($relation) {
                        return $character["uuid"] === $relation->getCharacterTwo()->getUuid();
                    });

                    $relations[] = [
                        "characterOne" => $characterOne,
                        "characterTwo" => $characterTwo,
                        "label" => "string",
                        "uuid" => "string"
                    ];
                }

                $chapters = [];
                $chaptersFromBook = $this->chaptersRepository->findBy(["book" => $book, "isActive" => true, "isDeleted" => false]);
                foreach($chaptersFromBook as $chapter) {
                    $chapters[] = [
                        "id" => $chapter->getId(),
                        "title" => $chapter->getTitle(),
                        "summary" => $chapter->getSummary(),
                        "content" => $chapter->getContent(),
                        "status" => $chapter->getStatus(),
                        "isActive" => $chapter->isActive(),
                        "isDeleted" => $chapter->isDeleted(),
                        "createdAt" => $chapter->getCreatedAt(),
                        "createdBy" => $chapter->getCreatedBy(),
                        "updatedAt" => $chapter->getUpdatedAt(),
                        "updatedBy" => $chapter->getUpdatedBy()
                    ];
                }

                return new JsonResponse([
                    'result' => true,
                    'book' => $this->serializer->serialize($book, 'json'),
                    'characters' => $characters,
                    'relations' => $relations,
                    'locations' => $locations,
                    'chapters' => $chapters
                ]);
            } else {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'bookNotBelongsToUser',
                    'message' => "Le livre ne vous appartient pas."
                ]);
            }
        }

        return new JsonResponse([
            'result' => true,
            'book' => $this->serializer->serialize($book, 'json')
        ]);
    }

    #[Route('/chapter/{id}', name: 'api_get_chapter')]
    public function apiChapter(Request $request, $id = null): Response
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
        } else {
            $user = $token->getUser();
            $token = $token->getToken();
        }

        $chapter = $this->chaptersRepository->find($id);

        if(!$chapter) {
            return new JsonResponse([
                'result' => false,
                'type' => 'chapterNotExist',
                'message' => "Le livre n'existe pas."
            ]);
        }

        if($request->query->has('forChapterCreation')) {
            if($chapter->getCreatedBy() === $user) {
                return new JsonResponse([
                    'result' => true,
                    'chapter' => $this->serializer->serialize($chapter, 'json')
                ]);
            } else {
                return new JsonResponse([
                    'result' => false,
                    'type' => 'chapterNotBelongsToUser',
                    'message' => "Le livre ne vous appartient pas."
                ]);
            }
        }

        return new JsonResponse([
            'result' => true,
            'chapter' => $this->serializer->serialize($chapter, 'json')
        ]);
    }
}
