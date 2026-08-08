<?php

namespace App\Repository;

use App\Entity\CharacterRelations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CharacterRelations>
 */
class CharacterRelationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CharacterRelations::class);
    }

    //    /**
    //     * @return CharacterRelations[] Returns an array of CharacterRelations objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?CharacterRelations
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findRelationsFromCharacters(array $characters)
    {
        $qb = $this->createQueryBuilder("cr");

        dd("(" . implode(", ", $characters) . ")");

        return $qb->andWhere('cr.characterOne IN :characters')
                    ->orWhere('cr.characterTwo IN :characters')
                    ->setParameter('characters', "(" . implode(", ", $characters) . ")")
                    ->andWhere('cr.isActive = :isActive')
                    ->andWhere('cr.isDeleted = :isDeleted')
                    ->setParameter('isActive', true)
                    ->setParameter('isDeleted', false)
                    ->getQuery()
                    ->getResult();
    }
}
