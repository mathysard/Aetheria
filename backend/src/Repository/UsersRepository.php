<?php

namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Users>
 */
class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Users::class);
    }

    //    /**
    //     * @return Users[] Returns an array of Users objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Users
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findBySearch($search) {
        return $this->createQueryBuilder('u')
                    ->andWhere('u.username = :search')
                    ->orWhere('u.displayName LIKE :search')
                    ->setParameter('search', "%" . $search . "%")
                    ->andWhere('u.isActive = :isActive')
                    ->andWhere('u.isDeleted = :isDeleted')
                    ->setParameter('isActive', true)
                    ->setParameter('isDeleted', false)
                    ->orderBy('u.createdAt', 'DESC')
                    ->getQuery()
                    ->getResult();
    }
}
