<?php

namespace App\Entity;

use App\Repository\BookReadersRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookReadersRepository::class)]
class BookReaders
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Books $book = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Users $reader = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chapters $lastChapter = null;

    #[ORM\Column(length: 1)]
    private ?string $status = null;

    #[ORM\Column]
    private ?bool $isActive = null;

    #[ORM\Column]
    private ?bool $isDeleted = null;

    #[ORM\Column]
    private ?\DateTime $createdAt = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Users $createdBy = null;

    #[ORM\Column]
    private ?\DateTime $updatedAt = null;

    #[ORM\ManyToOne]
    private ?Users $updatedBy = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBook(): ?Books
    {
        return $this->book;
    }

    public function setBook(?Books $book): static
    {
        $this->book = $book;

        return $this;
    }

    public function getReader(): ?Users
    {
        return $this->reader;
    }

    public function setReader(?Users $reader): static
    {
        $this->reader = $reader;

        return $this;
    }

    public function getLastChapter(): ?Chapters
    {
        return $this->lastChapter;
    }

    public function setLastChapter(?Chapters $lastChapter): static
    {
        $this->lastChapter = $lastChapter;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function isDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(bool $isDeleted): static
    {
        $this->isDeleted = $isDeleted;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedBy(): ?Users
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?Users $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUpdatedBy(): ?Users
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?Users $updatedBy): static
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }
}
