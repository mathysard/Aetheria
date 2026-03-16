import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import AuthForm from './pages/AuthForm';
import CreateChapter from './pages/CreateChapter';
import Error from './classes/Error';
import Toast from './components/Toast';
import { useEffect, useState } from 'react';
import UserPage from './pages/UserPage';

interface RoutesTitleInterface {
  [key: string]: string;
}

const App = () => {
    const error = new Error();

    const [errors, setErrors] = useState(error.exists() ? error.getAll() : []);

    useEffect(() => {
        const url = window.location.pathname;
        const baseTitle = "Aetheria";
        const routesTitle: RoutesTitleInterface = {
            "/": "Page d'accueil",
            "/book/create": "Créer un livre",
            "/login": "Connexion",
            "/register": "Inscription",
            "/user/me": "Mon profil"
        }

        if(routesTitle.hasOwnProperty(url)) {
            document.title = `${baseTitle} — ${routesTitle[url]}`;
        }

        // /book/{id}/update
        if(/^\/book\/\d+\/update$/.test(url)) {
            document.title = `${baseTitle} — Modifier un livre`;
        }

        // /book/{id}/chapter/create
        if(/^\/book\/\d+\/chapter\/create$/.test(url)) {
            document.title = `${baseTitle} — Créer un chapitre`;
        }

        // /user/{id}
        if(/^\/user\/\d+$/.test(url)) {
            document.title = `${baseTitle} — Utilisateur`;
        }
    }, []);

    useEffect(() => {
        if(errors) {
            setTimeout(() => {
                error.clear();
                setErrors([]);
            }, 5000)
        }
    }, [errors]);

    return (
        <>
            {errors && errors.length > 0 && (
                <div className="absolute top-20 right-8">
                    {errors.map((error: string) => (
                        <Toast state="error" text={error} />
                    ))}
                </div>
            )}
            
            <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/book/create" element={<CreateBook />} />
                <Route path="/book/:bookId/chapter/create" element={<CreateChapter />} />
                <Route path="/user/:userId" element={<UserPage />} />
            </Routes>
            </Router>
        </>
    )
}

export default App
