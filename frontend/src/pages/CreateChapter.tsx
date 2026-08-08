import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { isNumber } from '../utils';
import MarkdownEditor from '../components/MarkdownEditor';
import Toast from '../components/Toast';
import { Toaster, toast } from 'sonner';
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

const CreateChapter = () => {
    const { bookId, chapterId } = useParams();

    if (!isNumber(bookId)) {
        return <Toast state="error" text="L'id du livre doit être un nombre." />
    }

    if (!isNumber(chapterId) && chapterId !== "create") {
        return <Toast state="error" text={"L'id du chapitre doit être un nombre ou \"create\"."} />
    }

    // TODO: Faire le CRUD

    const [showDisplayError, setShowDisplayError] = useState<string | boolean>(false);
    const [showWritingPage, setShowWritingPage] = useState<boolean>(false);
    const [book, setBook] = useState<null|any>(null);
    const [chapterIdState, setChapterIdState] = useState<null|any>(chapterId);
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterSummary, setChapterSummary] = useState("");
    const [chapterWordsCount, setChapterWordsCount] = useState(0);
    const [chapterText, setChapterText] = useState("");

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('token', localStorage.getItem("auth_token") as string)
        formData.append("title", chapterTitle)
        formData.append("summary", chapterSummary)
        formData.append("content", chapterText)

        fetch(`https://127.0.0.1:8000/api/book/${bookId}/chapter/handle/${chapterIdState}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.ok ? res.json() : null)
        .then(res => {
            if(res.result === false) {
                toast.error(res.message);
            }

            if(res.result === true) {
                toast.success(res.message);

                if(chapterId === "create") {
                    setChapterIdState(res.chapterId)
                }
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        fetch(`https://127.0.0.1:8000/api/book/${bookId}?forChapterCreation`, {
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
                }
            })
            .catch(error => {
                console.error(error);
            })

            if(chapterId !== "create") {
                fetch(`https://127.0.0.1:8000/api/chapter/${chapterId}?forChapterCreation`, {
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
                        setChapterTitle(JSON.parse(res.chapter).title)
                        setChapterSummary(JSON.parse(res.chapter).summary)
                        setChapterText(JSON.parse(res.chapter).content)
                    }
                })
                .catch(error => {
                    console.error(error);
                })
            }
    }, []);

    if (showDisplayError !== false) {
        return <BookError message={showDisplayError as string} />
    }

    if (showWritingPage) {
        return (
            <>
                <Toaster richColors position='top-right' />
                <div className="sticky top-0">
                    <Navbar />
                    <div className="flex justify-between px-4 py-4 bg-white sticky border-b border-b-gray-700">
                        <div className="flex">
                            <div className="w-10 h-20 overflow-hidden">
                                <img src={`https://127.0.0.1:8000/api/bookCover/${book.cover}`} className="w-full h-full" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold">{book.title}</p>
                                <p className="text-gray-500">{chapterWordsCount} {chapterWordsCount < 2 ? "mot" : "mots"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleSubmit} disabled={chapterTitle.trim().length === 0 || chapterText.trim().length === 0} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl h-fit disabled:bg-blue-800 disabled:cursor-not-allowed">{chapterId === "create" ? "Créer" : "Modifier"}</button>
                            <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-stone-200 hover:cursor-pointer active:bg-stone-300 shadow-xl border h-fit">
                                <a href="/">Annuler</a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between m-4">
                    <div className="w-[48%]">
                        <label className="font-semibold text-base">Titre ({chapterTitle.length}/255)</label>
                        <div className="my-1 5" />
                        <input
                            type="text"
                            id="chapterTitle"
                            name="title"
                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body w-full"
                            placeholder="Titre du chapitre."
                            value={chapterTitle}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                if (target.value.length <= 255) {
                                    setChapterTitle(target.value);
                                }
                            }}
                        />
                    </div>
                    <div className="mb-4" />

                    <div className="w-[48%]">
                        <label className="font-semibold text-base">Résumé ({chapterSummary.length}/500)</label>
                        <div className="my-1 5" />
                        <textarea
                            id="chapterSummary"
                            name="title"
                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body w-full"
                            placeholder="Court résumé du déroulé du chapitre."
                            value={chapterSummary}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                if (chapterSummary.length <= 500) {
                                    setChapterSummary(target.value);
                                }
                            }}
                        />
                    </div>
                </div>

                <MarkdownEditor chapterText={chapterText} setChapterText={setChapterText} setChapterWordsCount={setChapterWordsCount} />
            </>
        )
    }

    return <Loading />
}

export default CreateChapter