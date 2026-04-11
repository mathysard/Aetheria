<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api')]
final class ApiController extends AbstractController
{
    #[Route('/createBook', name: 'app_api')]
    public function index(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);
        $cover = $request->files->get('cover');

        header("Access-Control-Allow-Origin: *");
        dd($request->files->all());

        return new JsonResponse([]);
    }
}
