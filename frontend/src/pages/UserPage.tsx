import { useState } from "react";
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { isNumber } from '../utils';

interface BookThumbnailInterface {
    formatter: Intl.NumberFormat;
    title: string;
    cover: string;
    views: number;
    likes: number;
    description: string;
}

const BookThumbnail = ({ formatter, title, cover, views, likes, description }: BookThumbnailInterface) => {
    return (
        <div className="flex gap-6">
            <div className="w-32 h-48 bg-black text-white flex items-center justify-center text-xs rounded-md">
                <div className="w-full h-full overflow-hidden cursor-pointer">
                    <img src={cover} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg cursor-pointer hover:underline">{title}</h3>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex justify-around pt-2 pb-1">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <p className="pl-1 text-gray-600">{formatter.format(views)}</p>
                        </div>

                        <div className="flex ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <p className="pl-1 text-gray-600">{formatter.format(likes)}</p>
                        </div>
                    </div>
                </div>

                <p title={description} className="text-sm text-gray-500 max-w-xl whitespace-pre-wrap">{description.substring(0, 214) + (description.length > 214 ? "..." : "")}</p>
            </div>
        </div>
    )
}

export default function UserPage() {
    const { userId } = useParams();

    if (userId !== "me") {
        if (!isNumber(userId)) {
            window.location.href = "/";
        }
    }

    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact"
    });

    const books = [
        {
            "title": "The Silent Horizon",
            "cover": "https://picsum.photos/seed/book1/400/600",
            "views": 18452,
            "likes": 9421,
            "description": "In a world where the oceans suddenly stop moving, a young scientist discovers a hidden truth about the planet's forgotten past and must race against time to prevent a global catastrophe. He teams up with one of his old classmates, Mary, and they combine their strength to fight the said catastrophe."
        },
        {
            "title": "Echoes of the Forgotten City",
            "cover": "https://picsum.photos/seed/book2/400/600",
            "views": 26731,
            "likes": 15322,
            "description": "When an archaeologist uncovers a buried city beneath the desert, strange echoes begin to haunt the expedition, revealing secrets that were never meant to be discovered."
        },
        {
            "title": "The Clockmaker's Secret",
            "cover": "https://picsum.photos/seed/book3/400/600",
            "views": 12984,
            "likes": 6430,
            "description": "A mysterious clock left behind by a brilliant inventor leads a curious teenager into a puzzle that bends time itself."
        },
        {
            "title": "Shadows in the Library",
            "cover": "https://picsum.photos/seed/book4/400/600",
            "views": 31567,
            "likes": 20891,
            "description": "Every night, the books in the ancient library rearrange themselves. One librarian finally decides to follow the clues hidden between the pages."
        },
        {
            "title": "The Last Ember of Winter",
            "cover": "https://picsum.photos/seed/book5/400/600",
            "views": 22109,
            "likes": 11754,
            "description": "In a kingdom locked in eternal winter, a young warrior discovers a forgotten flame that may be the key to restoring the seasons."
        },
        {
            "title": "Digital Ghosts",
            "cover": "https://picsum.photos/seed/book6/400/600",
            "views": 19403,
            "likes": 9035,
            "description": "A cybersecurity student begins receiving messages from accounts that belong to people who died years ago."
        },
        {
            "title": "The Garden Beyond Time",
            "cover": "https://picsum.photos/seed/book7/400/600",
            "views": 14092,
            "likes": 7510,
            "description": "Hidden behind an abandoned house lies a garden where every path leads to a different moment in history."
        },
        {
            "title": "The Storm Cartographer",
            "cover": "https://picsum.photos/seed/book8/400/600",
            "views": 28745,
            "likes": 16992,
            "description": "A sailor who can predict impossible storms is recruited for a dangerous mission to chart the world's most violent seas."
        },
        {
            "title": "Fragments of Tomorrow",
            "cover": "https://picsum.photos/seed/book9/400/600",
            "views": 32480,
            "likes": 21043,
            "description": "After a strange meteor shower, people begin seeing brief flashes of their own future—and some of them want to change it."
        },
        {
            "title": "The Painter of Lost Memories",
            "cover": "https://picsum.photos/seed/book10/400/600",
            "views": 11876,
            "likes": 5099,
            "description": "A reclusive artist discovers that every portrait he paints restores a forgotten memory to the person in the painting."
        },
        {
            "title": "Iron City Rebellion",
            "cover": "https://picsum.photos/seed/book11/400/600",
            "views": 25991,
            "likes": 14422,
            "description": "In a city run entirely by machines, a small group of humans begins to question who truly controls their future."
        },
        {
            "title": "The Lighthouse at the Edge of the World",
            "cover": "https://picsum.photos/seed/book12/400/600",
            "views": 17342,
            "likes": 8804,
            "description": "A lonely lighthouse keeper discovers that his light guides more than ships—it opens a doorway to another realm."
        },
        {
            "title": "Whispers of the Ancient Forest",
            "cover": "https://picsum.photos/seed/book13/400/600",
            "views": 29854,
            "likes": 17630,
            "description": "Deep within an untouched forest, a biologist hears voices in the wind that seem to know her name."
        }
    ];

    const [booksDisplayCount, setBooksDisplayCount] = useState(5);

    return (
        <>
            <Navbar />
            <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-10">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-sm overflow-hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ha2FS4G5-FyeAtF5t4--Qi4uSMattB-wlQ&s" className="w-full h-full" />
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">John Doe</h1>
                        <p className="text-gray-500">@johndoe</p>
                    </div>

                    <div className="flex text-sm">
                        <span>
                            <strong>{formatter.format(1300)}</strong> abonnements
                        </span>
                        <div className="mx-2.5 bg-gray-500 w-[0.1rem]" />
                        <span>
                            <strong>{formatter.format(3769)}</strong> abonnés
                        </span>
                    </div>

                    {userId === "me" && (<button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900">Modifier le profil</button>)}
                </div>

                <div className="space-y-4">
                    <div className="flex items-end justify-between border-b pb-2">
                        <h2 className="text-2xl font-semibold">{userId === "me" ? "Mes livres" : `Livres de John Doe`}</h2>
                    </div>

                    <div className="rounded-2xl">
                        <div className="p-6 space-y-6">
                            {books.slice(0, booksDisplayCount).map(book => (
                                <BookThumbnail
                                    formatter={formatter}
                                    title={book.title}
                                    cover={book.cover}
                                    views={book.views}
                                    likes={book.likes}
                                    description={book.description}
                                />
                            ))}

                            <div className="mt-8 border-gray-500 border-2 rounded-full">
                                <button disabled={books.length <= booksDisplayCount} className="w-full rounded-xl text-base py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300" onClick={() => setBooksDisplayCount(prev => prev + 5)}>
                                    Afficher plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}