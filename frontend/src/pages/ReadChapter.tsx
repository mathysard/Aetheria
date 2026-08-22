import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { isNumber } from '../utils';
import Toast from '../components/Toast';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';

interface BookErrorPropsInterface {
    message: string;
}

const BookError = ({ message }: BookErrorPropsInterface) => {
    return (
        <div className="flex justify-center h-screen items-center">
            <div className="text-center">
                <Toast state="error" text={message} />
                <a href="/">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </button>
                </a>
            </div>
        </div>
    )
}

const ReadChapter = () => {
    const { chapterId } = useParams();
    const [showDisplayError, setShowDisplayError] = useState<string | boolean>(false);
    const [showWritingPage, setShowWritingPage] = useState<boolean>(false);
    const [book, setBook] = useState<null|any>(null);
    const [userProfilePicture, setUserProfilePicture] = useState<string>("");
    const [bookCover, setBookCover] = useState<string>("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterSummary, setChapterSummary] = useState("");
    const [chapterText, setChapterText] = useState("");

    if (!isNumber(chapterId)) {
        return <Toast state="error" text="L'id du chapitre doit être un nombre." />
    }

    useEffect(() => {
        fetch(`https://127.0.0.1:8000/api/chapter/${chapterId}?forChapterRead`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem("auth_token")
            })
        })
        .then(res => res.ok ? res.json() : null)
        .then(res => {
            if (res.result === false) {
                setShowDisplayError(res.message);
            }

            if (res.result === true) {
                setShowWritingPage(true);
                setBook(JSON.parse(res.book));
                setUserProfilePicture(res.userProfilePicture);
                setBookCover(res.bookCover);
                setChapterTitle(JSON.parse(res.chapter).title);
                setChapterSummary(JSON.parse(res.chapter).summary);
                setChapterText(JSON.parse(res.chapter).content);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    if (showDisplayError !== false) {
        return <BookError message={showDisplayError as string} />
    }
    
    if(showWritingPage) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-100 text-gray-800">
                    <div className="w-full bg-gray-50 shadow-sm p-4 flex items-center gap-4">
                        <img
                            src={bookCover}
                            alt="cover"
                            className="w-10 h-10 rounded"
                        />
                        <div>
                            <h1 className="font-semibold">{book.title}</h1>
                            <p className="text-sm text-gray-500">par
                                {' '}
                                <a href={`/user/${book.createdBy.id}`}>
                                    <span className="text-black hover:underline cursor-pointer">@{book.createdBy.username}</span>
                                </a>
                            </p>
                        </div>
                    </div>
    
                    <div className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-center mb-0.5">
                                {chapterTitle}
                            </h2>
                            <p className="text-lg text-gray-500 font-medium text-center mb-4">
                                {chapterSummary}
                            </p>
    
                            {/* <div className="flex justify-center gap-6 text-gray-500 text-sm mb-8">    
                                <div className="flex">
                                    <div className="flex text-xs text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <p className="pl-1 text-gray-600">11.1K</p>
                                    </div>
                                    <div className="mx-2" />
                                    <div className="flex text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                        <p className="pl-1 text-gray-600">107</p>
                                    </div>
                                </div>
                            </div> */}
    
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={userProfilePicture}
                                    className="w-12 h-12 rounded-full"
                                    alt="author"
                                />
                                <div>
                                    <p className="font-medium"><span>{book.createdBy.displayName}</span></p>
                                    {/* <button className="mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700">
                                        S'abonner
                                    </button> */}
                                </div>
                            </div>
    
                            <div className="bg-white rounded-2xl shadow p-6 text-gray-600 leading-relaxed mb-10 whitespace-pre-wrap">
                                {chapterText}
                            </div>
    
                            {/* <div className="flex justify-center mb-8">
                                <button className="bg-black text-white px-8 py-4 rounded-full font-semibold cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition">
                                    Passer au chapitre suivant
                                </button>
                            </div>
    
                            <div className="flex items-center gap-3 mb-8">
                                <input
                                    type="text"
                                    placeholder="Écrire un commentaire..."
                                    className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button className="w-10 h-10 rounded-full cursor-pointer bg-purple-400 hover:bg-purple-500 active:bg-purple-600 text-white">
                                    ➤
                                </button>
                            </div>
    
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white cursor-pointer">
                                        <img className="rounded-full" src="https://placehold.co/67" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="font-medium cursor-pointer hover:underline">Username</p>
                                            <span className="text-gray-400">⋯</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Exemple de commentaire utilisateur.
                                        </p>
                                        <div className="flex gap-4 text-xs text-gray-400 mt-2">
                                            <span>Il y a 3 j</span>
                                            <button className="hover:text-blue-500">Répondre</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="flex justify-center mt-8">
                                <button className="px-6 py-3 border rounded-full cursor-pointer hover:bg-gray-200 active:bg-gray-300">
                                    Afficher plus de commentaires
                                </button>
                            </div> */}
                        </div>
    
                        {/* <div className="hidden lg:block">
                            <h3 className="font-semibold mb-4">
                                Autres livres de Kaya-chan
                            </h3>
    
                            <div className="space-y-4">
                                <div className="flex gap-3 bg-white p-3 rounded-xl shadow-sm hover:shadow">
                                    <img
                                        src="https://placehold.co/60"
                                        className="w-14 h-16 object-cover rounded"
                                        alt="book"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Tales of the Angelic Light
                                        </p>
                                        <div className="flex">
                                            <div className="flex text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                <p className="pl-1 text-gray-600">195K</p>
                                            </div>
                                            <p className="mx-2 text-xs text-gray-500">•</p>
                                            <div className="flex text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="oklch(55.1% 0.027 264.364)" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                                <p className="pl-1 text-gray-600">36K</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="flex gap-3 bg-white p-3 rounded-xl shadow-sm hover:shadow">
                                    <img
                                        src="https://placehold.co/60"
                                        className="w-14 h-16 object-cover rounded"
                                        alt="book"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Everywhere At The End Of Time
                                        </p>
                                        <div className="flex">
                                            <div className="flex text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                <p className="pl-1 text-gray-600">897K</p>
                                            </div>
                                            <p className="mx-2 text-xs text-gray-500">•</p>
                                            <div className="flex text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="oklch(55.1% 0.027 264.364)" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                                <p className="pl-1 text-gray-600">191K</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }

    return <Loading />
}

export default ReadChapter