import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { isNumber } from '../utils';
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import { Loading } from "../components/Loading";

interface BookThumbnailInterface {
    formatter?: Intl.NumberFormat;
    id: number;
    title: string;
    cover: string;
    views?: number;
    likes?: number;
    description: string;
}

const BookThumbnail = ({ id, title, cover, description }: BookThumbnailInterface) => {
    const { userId } = useParams();

    return (
        <div className="flex gap-6">
            <div className="w-32 h-48 bg-black text-white flex items-center justify-center text-xs rounded-md">
                <div className="w-full h-full overflow-hidden cursor-pointer">
                    <img className="w-full h-full" src={cover} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex">
                    {userId === "me" && (
                        <a href={`/book/${id}/update`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(37.3% 0.034 259.733)" className="size-6 mr-2 hover:cursor-pointer">
                                <path stroke-linecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>                  
                        </a>
                    )}
                    <a href={`/book/${id}`}>
                        <h3 className="font-semibold text-lg cursor-pointer hover:underline">{title}</h3>
                    </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                    {/* <div className="flex justify-around pt-2 pb-1">
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
                    </div> */}
                </div>

                <p title={description} className="text-sm text-gray-500 max-w-xl whitespace-pre-wrap">{description.substring(0, 214) + (description.length > 214 ? "..." : "")}</p>
            </div>
        </div>
    )
}

export default function UserPage() {
    const { userId } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any|null>();
    const [userProfilePicture, setUserProfilePicture] = useState<string>("");
    const [books, setBooks] = useState<any|null>([]);
    const [booksDisplayCount, setBooksDisplayCount] = useState(5);

    if (userId !== "me") {
        if (!isNumber(userId)) {
            return <Toast state="error" text="L'id de l'utilisateur doit être un nombre." />
        }
    }

    useEffect(() => {
        setLoading(true);
        fetch(`https://127.0.0.1:8000/api/user/${userId}`, {
            method: 'POST',
            body: JSON.stringify({token: localStorage.getItem("auth_token")})
        })
        .then(res => res.json())
        .then(res => {
            setUser(JSON.parse(res.user));
            setUserProfilePicture(res.userProfilePicture);
            setBooks(res.books);
            setLoading(false);
        })
    }, []);

    if(loading) {
        return <Loading />
    }

    return (
        <>
            <Navbar />
            <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-10">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-sm overflow-hidden">
                        <img src={userProfilePicture ?? ""} className="w-full h-full" />
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>

                    {/* <div className="flex text-sm">
                        <span>
                            <strong>{formatter.format(1300)}</strong> abonnements
                        </span>
                        <div className="mx-2.5 bg-gray-500 w-[0.1rem]" />
                        <span>
                            <strong>{formatter.format(3769)}</strong> abonnés
                        </span>
                    </div> */}

                    {/* {userId === "me" && (<button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900">Modifier le profil</button>)} */}
                </div>

                <div className="space-y-4">
                    <div className="flex items-end justify-between border-b pb-2">
                        <h2 className="text-2xl font-semibold">{userId === "me" ? "Mes livres" : `Livres de ${user.displayName}`}</h2>
                    </div>

                    <div className="rounded-2xl">
                        <div className="p-6 space-y-6">
                            {books.length > 0 ? books.slice(0, booksDisplayCount).map((book: any) => (
                                <BookThumbnail
                                    // formatter={formatter}
                                    id={book.id}
                                    title={book.title}
                                    cover={book.coverBase64}
                                    // views={book.views}
                                    // likes={book.likes}
                                    description={book.description}
                                />
                            )) : <p className="text-lg text-gray-500 font-semibold text-center">{user.displayName} n'a encore de livre.</p>}

                            {books.length > 0 && (
                                <div className="mt-8 border-gray-500 border-2 rounded-full">
                                    <button disabled={books.length <= booksDisplayCount} className="w-full rounded-xl text-base py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300" onClick={() => setBooksDisplayCount(prev => prev + 5)}>
                                        Afficher plus
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}