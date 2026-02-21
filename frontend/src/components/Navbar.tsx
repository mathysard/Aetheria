import { useState } from "react"

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <nav className="bg-white w-full z-20 border-b border-gray-400">
            <div className="flex items-center justify-between p-4">
                <img src="../../public/logo.png" className="h-9" alt="Flowbite Logo" />
                {window.location.href === "/" && (
                    <div className="flex items-center pl-2 rounded-2xl border-gray-300 border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" className="bg-neutral-secondary-medium text-heading text-sm rounded-base outline-0 block px-3 py-2.5 shadow-xs" placeholder="Recherche..." />
                    </div>
                )}
                {isAuthenticated ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src="https://images-ext-1.discordapp.net/external/pHp4FyubJ24K_VHSfZqUjlh9YiVPtx48Hw1StKzKNgw/https/cdn.pluralkit.me/images/hv/fwvag5xr5citmuxefbua47qe.webp?format=webp" className="w-full h-full object-cover" />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                ) : (
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900">Connexion</button>
                )}
            </div>
        </nav>
    )
}

export default Navbar