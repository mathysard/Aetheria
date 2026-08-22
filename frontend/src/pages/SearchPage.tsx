import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';

interface BookThumbnailInterface {
    formatter: Intl.NumberFormat;
    title: string;
    cover: string;
    views?: number;
    likes?: number;
    description: string;
}

interface UserThumbnailInterface {
    formatter: Intl.NumberFormat;
    id: number;
    displayName: string;
    userName: string;
    profilePicture: string;
    followersCount?: number;
    booksCount: number;
}

const BookThumbnail = ({ formatter, title, cover, description }: BookThumbnailInterface) => {
    return (
        <div className="flex gap-6">
            <div className="w-32 h-48 bg-black text-white flex items-center justify-center text-xs rounded-md">
                <div className="w-full h-full overflow-hidden cursor-pointer">
                    <img className="w-full h-full" src={cover} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg cursor-pointer hover:underline">{title}</h3>

                {/* <div className="flex items-center gap-3 text-sm text-gray-500">
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
                </div> */}

                <p title={description} className="text-sm text-gray-500 max-w-xl whitespace-pre-wrap">{description.substring(0, 214) + (description.length > 214 ? "..." : "")}</p>
            </div>
        </div>
    )
}

const UserThumbnail = ({formatter, id, displayName, userName, profilePicture, booksCount}: UserThumbnailInterface) => {
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
                        {/* <span>
                            <span className="font-semibold">{formatter.format(followersCount)}</span> abonnés
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchPage = () => {
    const { userSearch } = useParams();
    const [activeScreen, setActiveScreen] = useState<"books" | "users">("books");
    const [loading, setLoading] = useState(true);

    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact"
    });

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const BASE_COUNT = 10;
    const [booksDisplayCount, setBooksDisplayCount] = useState(BASE_COUNT);
    const [usersDisplayCount, setUsersDisplayCount] = useState(BASE_COUNT);

    useEffect(() => {
        setLoading(true);
        fetch("https://127.0.0.1:8000/api/searchScreen", {
            method: 'POST',
            body: JSON.stringify({
                search: userSearch
            })
        })
        .then(res => res.json())
        .then(res => {
            setUsers(res.users);
            setBooks(res.books);
            setLoading(false);
        })
    }, []);

    if(loading) {
        return <Loading />
    }

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
                                {books.slice(0, booksDisplayCount).map((book: any) => (
                                    <div className="mb-8">
                                        <BookThumbnail
                                            formatter={formatter}
                                            title={book.title}
                                            cover={book.coverBase64}
                                            // views={book.views}
                                            // likes={book.likes}
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
                                {users.slice(0, usersDisplayCount).map((user: any) => (
                                    <div className="mb-8">
                                        <UserThumbnail
                                            formatter={formatter}
                                            id={user.id}
                                            displayName={user.displayName}
                                            userName={user.userName}
                                            profilePicture={user.profilePictureBase64}
                                            // followersCount={user.followersCount}
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