import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { isNumber } from '../utils';
import Error from '../classes/Error';

const CreateChapter = () => {
  const error = new Error();
  const { bookId } = useParams();

  if(!isNumber(bookId)) {
    error.set("L'id du livre doit être un nombre.");

    window.location.href = "/";
  }

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterSummary, setChapterSummary] = useState("");

  return (
    <>
        <Navbar />
        <div className="flex justify-between px-4 py-4 bg-white sticky border-b border-b-gray-700">
            <div className="flex">
                <div className="w-10 h-20 overflow-hidden">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1734004864" className="w-full h-full" />
                </div>
                <div className="ml-4">
                    <p className="text-lg font-semibold">The Imperfections of Memory</p>
                    <p className="text-gray-500">817 mots</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl h-fit">Créer</button>
                <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-stone-200 hover:cursor-pointer active:bg-stone-300 shadow-xl border h-fit">Annuler</button>
            </div>
        </div>
        <div className="mt-4 mx-4">
            <div>
                <label className="font-semibold text-base">Titre ({chapterTitle.length}/255)</label>
                <input
                    type="text"
                    id="chapterTitle"
                    name="title"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body w-full"
                    placeholder="Titre du chapitre."
                    value={chapterTitle}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;

                        if(target.value.length <= 255) {
                            setChapterTitle(target.value);
                        }
                    }}
                />
            </div>
            <div className="mb-4" />

            <div>
                <label className="font-semibold text-base">Résumé ({chapterSummary.length}/500)</label>
                <textarea
                    id="chapterSummary"
                    name="title"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block px-3 py-2.5 shadow-xs placeholder:text-body w-full"
                    placeholder="Court résumé du déroulé du chapitre."
                    value={chapterSummary}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;

                        if(chapterSummary.length <= 500) {
                            setChapterSummary(target.value);
                        }
                    }}
                />
            </div>
        </div>
    </>
  )
}

export default CreateChapter