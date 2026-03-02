import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import AuthForm from './pages/AuthForm';

interface RoutesTitleInterface {
  [key: string]: string;
}

const App = () => {
  const setTitle = () => {
    const url = window.location.pathname;
    const baseTitle = "Aetheria";
    const routesTitle: RoutesTitleInterface = {
        "/": "",
        "/book/create": " — Créer un livre",
        "/login": " — Connexion",
        "/register": " — Inscription"
    }

    if(routesTitle.hasOwnProperty(url)) {
      console.log('yippee')
      return `${baseTitle}${routesTitle[url]}`;
    }

    // /book/{id}/update
    if(/^\/book\/\d+\/update$/.test(url)) {
      return `${baseTitle} — Modifier un livre`;
    }
  }

  return (
    <>
      <title>{setTitle()}</title>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/book/create" element={<CreateBook />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
