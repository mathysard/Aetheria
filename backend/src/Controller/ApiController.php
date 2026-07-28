<?php

namespace App\Controller;

use App\Entity\Users;
use App\Entity\UserRoles;
use App\Entity\AuthTokens;
use App\Repository\UsersRepository;
use App\Repository\RolesRepository;
use App\Repository\AuthTokensRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api')]
final class ApiController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UsersRepository $usersRepository,
        private RolesRepository $rolesRepository,
        private AuthTokensRepository $authTokensRepository
    ) {}

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
        $user->setProfilePicture($_ENV["BACKEND_PATH"] . "/images/profile_pictures/default.jpg");
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
            "email" => $user->getEmail()
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

    #[Route('/createBook', name: 'api_create_book')]
    public function apiCreateBook(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);
        $cover = $request->files->get('cover');

        header("Access-Control-Allow-Origin: *");
        dd($request->files->all());

        return new JsonResponse([]);
    }
}
