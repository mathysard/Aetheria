import { useState } from "react";
import { useParams } from "react-router-dom";
import { isJsonString } from "../utils";

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('auth_token') ?? false;
    const user = localStorage.getItem('auth_token') ? isJsonString(atob(localStorage.getItem('auth_token') as string)) ? JSON.parse(atob(localStorage.getItem('auth_token') as string)) : null : null;
    const { userSearch } = useParams();
    const [dropdownIsOpen, setDropdownIsOpen] = useState(0);
    // const [language, setLanguage] = useState(localStorage.getItem('language') ?? navigator.language.split('-')[0]);
    const [search, setSearch] = useState(userSearch ?? "");

    // console.log(user.profilePicture)

    return (
        <nav className="bg-white w-full z-20 border-b border-gray-400" id="navbar">
            <div className="flex items-center justify-between p-4">
                <a href="/">
                    <img src={`${window.location.origin}/public/logo.png`} className="h-9" />
                </a>
                <div className="flex items-center pl-2 rounded-2xl border-gray-300 border-2 w-[25%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            setSearch(target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                window.location.href = `/search/${search}`
                            }
                        }}
                        className="bg-neutral-secondary-medium text-heading text-sm rounded-base outline-0 block px-3 py-2.5 shadow-xs"
                        placeholder="Recherche..."
                    />
                </div>
                {/* <a href="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900">Connexion</a> */}
                {isAuthenticated ? (
                    <>
                        <div className="select-none flex items-center gap-2 cursor-pointer outline-none" onClick={() => setDropdownIsOpen(prev => prev === 0 ? 180 : 0)}>
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img src={user ? `https://127.0.0.1:8000/api/profilePicture/${user.profilePicture}` : "https://pfpstack.com/wp-content/uploads/2026/04/tiktok-default-pfp-7.jpg"} className="w-full h-full object-cover" />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer" style={{ transform: `rotate(${dropdownIsOpen ? 180 : 0}deg)` }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {/*
                            - Profil
                            - Écrire
                            - Paramètres
                            - Déconnexion
                        */}

                        <div className={`select-none z-10 ${!dropdownIsOpen ? "hidden" : ""} absolute right-4 top-14 bg-white border border-gray-400 border-default-medium rounded-base divide-y divide-default-medium shadow-lg w-44`}>
                            {/* <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDividerButton">
                                <li>
                                    <a href="/user/me" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profil</a>
                                </li>
                                <li>
                                    <a href="/createBook" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Écrire</a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</a>
                                </li>
                            </ul> */}
                            <div className="p-2 border-b border-b-gray-400 text-sm text-body font-medium">
                                <a href="/user/me" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profil</a>
                            </div>
                            <div className="p-2 border-b border-b-gray-400 text-sm text-body font-medium">
                                <a href="/createBook" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Écrire</a>
                            </div>
                            {/* <div className="p-2 border-b border-b-gray-400 text-sm text-body font-medium">
                                <a href="/user/me/update" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Paramètres</a>
                            </div> */}
                            <div className="p-2 text-sm text-body font-medium">
                                <a
                                    href="#"
                                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if(localStorage.getItem("auth_token") === null) {
                                            window.location.href = "/";
                                        }
                            
                                        fetch("https://127.0.0.1:8000/api/logout", {
                                            method: 'POST',
                                            body: JSON.stringify({token: localStorage.getItem("auth_token")})
                                        })
                                        .then(res => res.ok ? res.json() : null)
                                        .then(() => {
                                            localStorage.removeItem("auth_token");
                                            window.location.href = "/";
                                            return;
                                        })
                                    }}
                                >
                                        Déconnexion
                                    </a>
                            </div>
                        </div>

                    </>
                ) : (
                    <a href="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900">Connexion</a>
                )}
            </div>
        </nav>
    )
}

export default Navbar