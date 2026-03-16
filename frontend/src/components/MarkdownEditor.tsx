import React, { useRef, type ChangeEvent } from 'react';

interface PropsInterface {
    chapterText: string;
    setChapterText: React.Dispatch<React.SetStateAction<string>>;
    setChapterWordsCount: React.Dispatch<React.SetStateAction<number>>
}

export const MarkdownEditor = ({chapterText, setChapterText, setChapterWordsCount}: PropsInterface) => {
    const textareaRef = useRef(null);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";

        const target = e.target as HTMLTextAreaElement;
        setChapterText(target.value);
        setChapterWordsCount(target.value.length > 0 ? target.value.trim().split(/\s+/).length : 0);
    };

    // const getSelectedText = () => {
    //     const dom = document as any;
    //     let text = "";
    //     if (typeof window.getSelection != "undefined") {
    //         text = window.getSelection()?.toString() ?? "";
    //     } else if (typeof dom.selection != "undefined" && dom.selection.type == "Text") {
    //         text = dom.selection.createRange().text;
    //     }
    //     return text;
    // }
    
    // const handleMarkdown = () => {
    //     console.log(getSelectedText());
    // }

    return (
        <div className="w-[98%] h-full mx-auto border-2 mb-8 border-gray-400 rounded-lg shadow bg-white">
            {/* <div className="flex flex-wrap gap-2 border-b-2 border-gray-400 p-3 bg-gray-50">
                <button
                    className="px-3 py-1 rounded border hover:bg-gray-200 font-bold cursor-pointer"
                    onClick={handleMarkdown}
                >
                    B
                </button>

                <button
                    className="px-3 py-1 rounded border hover:bg-gray-200 italic cursor-pointer"
                    onClick={handleMarkdown}
                >
                    I
                </button>

                <button
                    className="px-3 py-1 rounded border hover:bg-gray-200 underline cursor-pointer"
                    onClick={handleMarkdown}
                >
                    U
                </button>

                <button
                    className="px-3 py-1 rounded border hover:bg-gray-200 line-through cursor-pointer"
                    onClick={handleMarkdown}
                >
                    S
                </button>

                <div className="w-0.5 bg-gray-500 mx-2" />

                <button className="px-3 py-1 rounded border hover:bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>

                <button className="px-3 py-1 rounded border hover:bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                    </svg>
                </button>

                <button className="px-3 py-1 rounded border hover:bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                </button>
            </div> */}

            <textarea
                className="w-full min-h-[300px] p-4 outline-none font-mono"
                placeholder="✍️ Commencez à écrire."
                ref={textareaRef}
                value={chapterText}
                onInput={handleInput}
            />
        </div>
    )
}

export default MarkdownEditor