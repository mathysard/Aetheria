<?php

namespace App\Command;

use App\Entity\Roles;
use App\Repository\RolesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-roles',
    description: 'Add the roles for creating a book',
)]
class CreateRolesCommand extends Command
{
    public function __construct(private RolesRepository $rolesRepository, private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {}

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $roles = [
            "Créateur",
            "Administrateur",
            "Modérateur",
            "Utilisateur"
        ];

        foreach($roles as $role) {
            if(!$this->rolesRepository->findOneBy([
                "name" => $role,
                "isActive" => true,
                "isDeleted" => false
            ])) {
                $newRole = new Roles();
                $newRole->setName($role);
                $newRole->setStatus("N");
                $newRole->setIsActive(true);
                $newRole->setIsDeleted(false);
                $newRole->setCreatedAt(new \DateTime());

                $this->entityManager->persist($newRole);
                $this->entityManager->flush();

                echo "$role : ✅\n";
            } else {
                echo "$role : ❌\n";
            }
        }

        return Command::SUCCESS;
    }
}
