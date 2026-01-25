interface PropsInterface {
    title: string;
    readCount: number;
    cover: string;
    likeCount: number;
}

function BookCard({title, cover, readCount, likeCount}: PropsInterface) {
    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact"
    });

    return (
        <div className="border-2 rounded-xl w-49 wrap-break-word">
            <p title={title} className="text-lg text-center font-medium py-2 my-auto h-18">{title.substring(0, 35) + (title.length > 35 ? "..." : "")}</p>
            <div data-role="Cover" className="w-48 h-76">
                {cover ? (
                    <img className="w-full h-full object-cover cursor-pointer" src={cover} />
                ) : (
                    <div className="w-full h-full bg-gray-400 opacity-75" />
                )}
            </div>
            <div className="flex justify-around pt-2 pb-1">
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className="pl-1 text-gray-600">{readCount ? formatter.format(readCount) : 0}</p>
                </div>

                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <p className="pl-1 text-gray-600">{likeCount ? formatter.format(likeCount) : 0}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCard