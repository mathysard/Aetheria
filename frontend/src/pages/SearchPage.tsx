import { useState } from 'react'
import Navbar from "../components/Navbar"

interface BookThumbnailInterface {
    formatter: Intl.NumberFormat;
    title: string;
    cover: string;
    views: number;
    likes: number;
    description: string;
}

interface UserThumbnailInterface {
    formatter: Intl.NumberFormat;
    id: number;
    displayName: string;
    userName: string;
    profilePicture: string;
    followersCount: number;
    booksCount: number;
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

const UserThumbnail = ({formatter, id, displayName, userName, profilePicture, followersCount, booksCount}: UserThumbnailInterface) => {
    return (
        <div className="w-full bg-white rounded-xl shadow-md p-4 flex">
            <div className="flex items-center space-x-4">
                <img
                    src={profilePicture}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover cursor-pointer"
                    onClick={() => window.location.href = `/user/${id}`}
                />

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 cursor-pointer" onClick={() => window.location.href = `/user/${id}`}>
                        {displayName}
                    </h2>
                    <p className="text-gray-500 text-sm cursor-pointer" onClick={() => window.location.href = `/user/${id}`}>@{userName}</p>

                    <div className="flex space-x-4 mt-1 text-sm text-gray-700">
                        <span>
                            <span className="font-semibold">{formatter.format(booksCount)}</span> livres
                        </span>
                        <span>
                            <span className="font-semibold">{formatter.format(followersCount)}</span> abonnés
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchPage = () => {
    const [activeScreen, setActiveScreen] = useState<"books" | "users">("books");

    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact"
    });

    const [books, setBooks] = useState([
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
        },
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
    ]);
    const [users, setUsers] = useState([
        {
            "id": 1,
            "displayName": "Léanne Graham",
            "userName": "leanne_graham7",
            "email": "leanne.graham@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/women/1.jpg",
            "followersCount": 1240,
            "booksCount": 12
        },
        {
            "id": 2,
            "displayName": "Marc Dubois",
            "userName": "marc_dubois92",
            "email": "marc.dubois@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/men/2.jpg",
            "followersCount": 980,
            "booksCount": 7
        },
        {
            "id": 3,
            "displayName": "Sofia Martinez",
            "userName": "sofia_martinez",
            "email": "sofia.martinez@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/women/3.jpg",
            "followersCount": 2150,
            "booksCount": 18
        },
        {
            "id": 4,
            "displayName": "Lucas Bernard",
            "userName": "lucas_bernard",
            "email": "lucas.bernard@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg",
            "followersCount": 430,
            "booksCount": 3
        },
        {
            "id": 5,
            "displayName": "Emma Rossi",
            "userName": "emma_rossi",
            "email": "emma.rossi@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/women/5.jpg",
            "followersCount": 1675,
            "booksCount": 9
        },
        {
            "id": 6,
            "displayName": "Noah Schmidt",
            "userName": "noah_schmidt",
            "email": "noah.schmidt@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/men/6.jpg",
            "followersCount": 755,
            "booksCount": 5
        },
        {
            "id": 7,
            "displayName": "Chloé Dupont",
            "userName": "chloe_dupont",
            "email": "chloe.dupont@example.com",
            "profilePicture": "https://randomuser.me/api/portraits/women/7.jpg",
            "followersCount": 2890,
            "booksCount": 21
        }
    ]);
    const BASE_COUNT = 10;
    const [booksDisplayCount, setBooksDisplayCount] = useState(BASE_COUNT);
    const [usersDisplayCount, setUsersDisplayCount] = useState(BASE_COUNT);

    return (
        <>
            <div className="sticky top-0">
                <Navbar />
            </div>
            <div className="mt-16 flex justify-center">
                <div className="flex w-full">
                    <div className="mx-[8%] w-full px-8 pt-4 bg-white shadow-xl">
                        <div className="flex h-max border-b-2 mb-4 border-gray-400">
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "books" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("books")}>Livres</p>
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "users" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("users")}>Utilisateurs</p>
                        </div>
                        {activeScreen === "books" && (
                            <>
                                <p className="mb-4"><strong>{booksDisplayCount > books.length ? books.length : booksDisplayCount}</strong>/<strong>{books.length}</strong> livres affichés</p>
                                {books.slice(0, booksDisplayCount).map(book => (
                                    <div className="mb-8">
                                        <BookThumbnail
                                            formatter={formatter}
                                            title={book.title}
                                            cover={book.cover}
                                            views={book.views}
                                            likes={book.likes}
                                            description={book.description}
                                        />
                                    </div>
                                ))}

                                <div className="mt-8 border-gray-500 border-2 rounded-full">
                                    <button disabled={books.length <= booksDisplayCount} className="w-full rounded-xl text-base py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300" onClick={() => setBooksDisplayCount(prev => prev + BASE_COUNT)}>
                                        Afficher plus
                                    </button>
                                </div>
                            </>
                        )}

                        {activeScreen === "users" && (
                            <>
                                <p className="mb-4"><strong>{usersDisplayCount > users.length ? users.length : usersDisplayCount}</strong>/<strong>{users.length}</strong> utilisateurs affichés</p>
                                {users.slice(0, usersDisplayCount).map(user => (
                                    <div className="mb-8">
                                        <UserThumbnail
                                            formatter={formatter}
                                            id={user.id}
                                            displayName={user.displayName}
                                            userName={user.userName}
                                            profilePicture={user.profilePicture}
                                            followersCount={user.followersCount}
                                            booksCount={user.booksCount}
                                        />
                                    </div>
                                ))}

                                <div className="mt-8 border-gray-500 border-2 rounded-full">
                                    <button disabled={users.length <= usersDisplayCount} className="w-full rounded-xl text-base py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300" onClick={() => setUsersDisplayCount(prev => prev + BASE_COUNT)}>                                        Afficher plus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage