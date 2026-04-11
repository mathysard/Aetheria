import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import AuthForm from './pages/AuthForm';
import CreateChapter from './pages/CreateChapter';
import UserPage from './pages/UserPage';
import ReadChapter from './pages/ReadChapter';
import GenericData from './pages/GenericData';
import UpdateUser from './pages/UpdateUser';
import SearchPage from './pages/SearchPage';

interface RoutesTitleInterface {
  [key: string]: string;
}

const App = () => {
    useEffect(() => {
        const url = window.location.pathname;
        const baseTitle = "Aetheria";
        const routesTitle: RoutesTitleInterface = {
            "/": "Page d'accueil",
            "/book/create": "Créer un livre",
            "/login": "Connexion",
            "/register": "Inscription",
            "/user/me": "Mon profil",
            "/data/generic": "Données génériques"
        }

        if(routesTitle.hasOwnProperty(url)) {
            document.title = `${baseTitle} — ${routesTitle[url]}`;
            return;
        }

        // /book/{id}/update
        if(/^\/book\/\d+\/update$/.test(url)) {
            document.title = `${baseTitle} — Modifier un livre`;
            return;
        }

        // /book/{id}/chapter/create
        if(/^\/book\/\d+\/chapter\/create$/.test(url)) {
            document.title = `${baseTitle} — Créer un chapitre`;
            return;
        }

        // /user/{id}
        if(/^\/user\/\d+$/.test(url)) {
            document.title = `${baseTitle} — Utilisateur`;
            return;
        }

        // /chapter/{id}
        if(/^\/chapter\/\d+$/.test(url)) {
            document.title = `${baseTitle} — Chapitre`;
            return;
        }

        // /search/{userSearch}
        if(/^\/search\/.*$/.test(url)) {
            document.title = `${baseTitle} — Recherche`;
            return;
        }

        document.title = "Aetheria";
        return;
    }, []);

    return (
        <>
            {/* {errors && errors.length > 0 && (
                <div className="absolute top-20 right-8">
                    {errors.map((error: string) => (
                        <Toast state="error" text={error} />
                    ))}
                </div>
            )} */}
            
            <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<AuthForm />}
                />

                <Route
                    path="/register"
                    element={<AuthForm />}
                />

                <Route
                    path="/user/:userId"
                    element={<UserPage />}
                />

                <Route
                    path="/createBook"
                    element={<CreateBook />}
                />

                <Route
                    path="/generic/data"
                    element={<GenericData />}
                />

                <Route
                    path="/user/:userId/update"
                    element={<UpdateUser />}
                />

                <Route
                    path="/chapter/:chapterId"
                    element={<ReadChapter />}
                />

                <Route
                    path="/book/:bookId/chapter/create"
                    element={<CreateChapter />}
                />

                <Route
                    path="/search/:userSearch"
                    element={<SearchPage />}
                />
            </Routes>
            </Router>
        </>
    )
}

export default App
