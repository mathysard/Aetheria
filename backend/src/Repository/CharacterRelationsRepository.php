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

        $charactersIds = [];

        if(count($characters) > 0) {
            foreach($characters as $character) {
                $charactersIds[] = $character["id"];
            }
        }

        return $qb->andWhere('cr.firstCharacter IN' . "(" . implode(", ", $charactersIds) . ")")
                    ->orWhere('cr.secondCharacter IN' . "(" . implode(", ", $charactersIds) . ")")
                    ->andWhere('cr.isActive = :isActive')
                    ->andWhere('cr.isDeleted = :isDeleted')
                    ->setParameter('isActive', true)
                    ->setParameter('isDeleted', false)
                    ->getQuery()
                    ->getResult();
    }
}
