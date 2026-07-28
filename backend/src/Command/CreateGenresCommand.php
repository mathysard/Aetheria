<?php

namespace App\Command;

use App\Entity\Genres;
use App\Repository\GenresRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-genres',
    description: 'Add the genres for creating a book',
)]
class CreateGenresCommand extends Command
{
    public function __construct(private GenresRepository $genresRepository, private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {}

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $genres = [
            "Action" => "action",
            "Comédie" => "comedy",
            "Essai" => "essay",
            "Fantastique" => "fantasy_fiction",
            "Fantasy" => "fantasy",
            "Horreur" => "horror",
            "Journal intime" => "diary",
            "Mystère" => "mystery",
            "Mythe" => "myth",
            "Nouvelle" => "short_story",
            "Policier" => "detective",
            "Poésie" => "poetry",
            "Romance" => "romance",
            "Science-fiction" => "science_fiction",
            "Sport" => "sport",
            "Thriller" => "thriller",
            "Théâtre" => "theater",
            "Young Adult" => "young_adult",
            "Autre" => "other",
        ];

        foreach($genres as $label => $value) {
            if(!$this->genresRepository->findOneBy([
                "name" => $label,
                "value" => $value,
                "isActive" => true,
                "isDeleted" => false
            ])) {
                $genre = new Genres();
                $genre->setName($label);
                $genre->setValue($value);
                $genre->setStatus("N");
                $genre->setIsActive(true);
                $genre->setIsDeleted(false);
                $genre->setCreatedAt(new \DateTime());

                $this->entityManager->persist($genre);
                $this->entityManager->flush();

                echo "$label : ✅\n";
            } else {
                echo "$label : ❌\n";
            }
        }

        return Command::SUCCESS;
    }
}
