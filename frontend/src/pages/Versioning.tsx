import Navbar from "../components/Navbar"

const Versioning = () => {
    return (
        <>
            <div className="sticky top-0">
                <Navbar />
            </div>

            <div className="mt-8 mb-4 ml-8">
                <p className="text-3xl font-semibold">Historique des versions</p>
                <div className="mt-2 bg-gray-400 pb-[0.20rem] w-[91.7%]" />
            </div>

            <div className="flex">
                <svg viewBox="0 0 16 16" width="20" height="20" className="ml-8 mb-4 mt-1" fill="currentColor">
                    <path d="m.427 1.927 1.215 1.215a8.002 8.002 0 1 1-1.6 5.685.75.75 0 1 1 1.493-.154 6.5 6.5 0 1 0 1.18-4.458l1.358 1.358A.25.25 0 0 1 3.896 6H.25A.25.25 0 0 1 0 5.75V2.104a.25.25 0 0 1 .427-.177ZM7.75 4a.75.75 0 0 1 .75.75v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5A.75.75 0 0 1 7.75 4Z" />
                </svg>
                <p className="ml-2 text-xl"><b>33</b> commits</p>
            </div>

            <div className="w-[90%] border-gray-300 rounded-lg border-2 mt-8 ml-8 pb-2">
                <div className="flex justify-between">
                    <p className="mt-1 ml-2 text-xl"><b>v0.0</b></p>
                    <p className="mt-1 mr-2 text-lg font-medium text-gray-600">25 janvier 2026</p>
                </div>
                <p className="ml-2 mt-4">Le tout premier commit de l'application, ainsi que sa création. La page d'accueil et la barre de navigation ont commencés à être développées.</p>
            </div>

            <div className="w-[90%] border-gray-300 rounded-lg border-2 mt-8 ml-8 pb-2">
                <div className="flex justify-between">
                    <p className="mt-1 ml-2 text-xl"><b>v1.0</b></p>
                    <p className="mt-1 mr-2 text-lg font-medium text-gray-600">22 août 2026</p>
                </div>
                <p className="ml-2 mt-4">La toute première version de l'application avec les fonctionnalités nécéssaires à la présentation de ce projet. Cette version comprend :</p>
                <ul className="ml-2">
                    <li>• Création de compte</li>
                    <li>• Authentification</li>
                    <li>• Création et modification de livre</li>
                    <li>• Création et modification de chapitre</li>
                    <li>• Recherche de livres et d'utilisateurs</li>
                </ul>
            </div>

            <div className="w-[90%] border-gray-300 rounded-lg border-2 mt-8 ml-8 pb-2">
                <div className="flex justify-between">
                    <p className="mt-1 ml-2 text-xl"><b>v1.0.1</b></p>
                    <p className="mt-1 mr-2 text-lg font-medium text-gray-600">24 août 2026</p>
                </div>
                <p className="ml-2 mt-4">Correction de bugs divers et variés de la première application, notamment des problèmes de noms des routes de <span className="underline hover:cursor-help" title="backend/src/Controller/ApiController.php">ApiController.php</span>, des morceaux de texte oubliés ou encore quelques améliorations dans le formulaire d'authentification.</p>
            </div>

            <div className="w-[90%] border-gray-300 rounded-lg border-2 mt-8 ml-8 pb-2">
                <div className="flex justify-between">
                    <p className="mt-1 ml-2 text-xl"><b>v1.1</b></p>
                    <p className="mt-1 mr-2 text-lg font-medium text-gray-600">29 août 2026</p>
                </div>
                <p className="ml-2 mt-4">Implémentation plus poussée de la sécurité. Cette version valide le token sur la partie front-end de l'application, se protège des attaques brute-force à la connexion, et redirige un utilisateur sur la page d'accueil si il se trouve sur une page où il n'est pas censé avoir accès.</p>
                <p className="ml-2">Cette version comprend également cette page, un historique des versions de l'application.</p>
            </div>

            <div className="mb-8" />
        </>
    )
}

export default Versioning