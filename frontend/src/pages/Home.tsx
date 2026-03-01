import Navbar from "../components/Navbar"
import BookCard from "../components/home/BookCard";
import UserCard from "../components/home/UserCard";

function Home() {
    return (
        <>
            <Navbar />
            <div className="mt-8 mb-8 ml-8">
                <p className="text-3xl font-semibold">Vos lectures</p>
                <div className="flex gap-12 pt-4">
                    <BookCard title="The Imperfections Of Memory" cover="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1734004864" readCount={15656} likeCount={532} />
                    <BookCard title="The Story Of A Lonely Boy" cover="https://marketplace.canva.com/EAGUhHGuQOg/1/0/1003w/canva-orange-and-blue-anime-cartoon-illustrative-novel-story-book-cover-WZE2VIj5AVQ.jpg" readCount={1239} likeCount={148} />
                </div>
            </div>

            <div className="mt-8 mb-8 ml-8">
                <p className="text-3xl font-semibold">Livres les plus récents</p>
                <div className="flex gap-12 pt-4">
                    <BookCard title="Abandoned Kingdom : The Tale of God" cover="https://marketplace.canva.com/EAFKA0RgDtw/1/0/1003w/canva-brown-and-orange-elegant-simple-young-adult-fantasy-book-cover-Qb8uSVdJDzw.jpg" readCount={313} likeCount={56} />
                    <BookCard title="Echoes Of Tomorrow : A Journey Through Time" cover="https://images.template.net/453953/6x9-Book-Cover-Template-edit-online.png" readCount={18340} likeCount={3567} />
                    <BookCard title="SOUL" cover="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" readCount={1890} likeCount={102} />
                </div>
            </div>

            <div className="mt-8 mb-8 ml-8">
                <p className="text-3xl font-semibold">Livres les plus aimés</p>
                <div className="flex gap-12 pt-4">
                    <p className="text-lg text-gray-500 font-semibold text-center">Il n'y a pas encore de livres.</p>
                </div>
            </div>

            <div className="mt-8 mb-8 ml-8">
                <p className="text-3xl font-semibold">Utilisateurs les plus suivis</p>
                <div className="flex gap-12 pt-4">
                    <UserCard profilePicture="https://i.pinimg.com/736x/97/36/80/9736806e978c1eb7a43e7cd68534566d.jpg" username="ryan-potter" />
                    <UserCard profilePicture="https://i.pinimg.com/474x/a8/47/9a/a8479a922b151b03df56a6db105dc5dd.jpg" username="lya_hk" />
                </div>
            </div>

            <div className="mt-16 mb-8 ml-8">
                <p className="text-3xl font-semibold">Utilisateurs les plus inspirés</p>
                <div className="flex gap-12 pt-4">
                    <p className="text-lg text-gray-500 font-semibold text-center">Il n'y a pas encore d'utilisateurs.</p>
                </div>
            </div>
        </>
    )
}

export default Home