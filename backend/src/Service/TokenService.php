<?php

namespace App\Service;

use App\Repository\AuthTokensRepository;
use Symfony\Component\Serializer\SerializerInterface;

class TokenService {
    public function __construct(
        public AuthTokensRepository $authTokensRepository,
        public SerializerInterface $serializer
    ) {}

    public function validateToken(string $token) {
        $token = $this->authTokensRepository->findByTokenAndValidity($token);
        $date = new \DateTime();

        if(!$token || ($token && $token->getValidUntil() < $date)) {
            return [
                'result' => false,
                'type' => 'tokenNotValid',
                'message' => "Le token n'existe pas ou n'est plus valide."
            ];
        } else {
            $user = $token->getUser();
            $userToReturn = [
                "id" => $user->getId(),
                "displayName" => $user->getDisplayName(),
                "username" => $user->getUsername(),
                "email" => $user->getEmail(),
                "profilePicture" => $user->getProfilePicture()
            ];

            return [
                'result' => true,
                'user' => $userToReturn,
                'token' => $token->getToken()
            ];
        }
    }
}