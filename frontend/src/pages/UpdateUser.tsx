import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { isNumber } from '../utils';
import Toast from "../components/Toast";
import { useState } from 'react';
import type { ToastInterface } from '../interfaces/ToastInterface';

export default function UserPage() {
    const { userId } = useParams();

    if (userId !== "me") {
        if (!isNumber(userId)) {
            return <Toast state="error" text="L'id de l'utilisateur doit être un nombre." />
        }
    }

    const [userDisplayName, setUserDisplayName] = useState("John Doe");
    const [userUserName, setUserUserName] = useState("johndoe");
    const [userEmail, setUserEmail] = useState("john88@doe1161.com");

    const [toasts, setToasts] = useState<ToastInterface[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setToasts(prev => [...prev.slice(prev.length - 5 < 0 ? 0 : prev.length - 5, 4), {
            state: "info",
            text: "Traitement en cours..."
        }]);
        
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // Object.entries(data).map([key, value] => {
        //     switch(key) {
        //         case 
        //     }
        // });
    }

    return (
        <>
            {toasts && toasts.length > 0 && (
                <div className="absolute top-20 right-8 ease-in-out transform duration-300">
                    {toasts.map((toast, i) => (
                        <Toast key={i} state={toast.state} text={toast.text} />
                    ))}
                </div>
            )}
            <Navbar />
            <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-10">
                <div className="flex flex-col items-center text-center gap-4 mb-2">
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-sm overflow-hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ha2FS4G5-FyeAtF5t4--Qi4uSMattB-wlQ&s" className="w-full h-full" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold">{userDisplayName.length > 0 ? userDisplayName : "Pseudo"}</h1>
                        <p className="text-gray-500">@{userUserName.length > 0 ? userUserName : "nom_d_utilisateur"}</p>
                    </div>
                </div>

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="font-semibold text-base">Pseudo</label>
                        <div className="my-1.5" />
                        <input
                            type="text"
                            id="userDisplayName"
                            name="displayName"
                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="Pseudo..."
                            value={userDisplayName}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                setUserDisplayName(target.value);
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold text-base">Nom d'utilisateur</label>
                        <div className="my-1.5" />
                        <input
                            type="text"
                            id="userUserName"
                            name="userName"
                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="Nom d'utilisateur..."
                            value={userUserName}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                setUserUserName(target.value);
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold text-base">E-mail</label>
                        <div className="my-1.5" />
                        <input
                            type="text"
                            id="userEmail"
                            name="email"
                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="E-mail..."
                            value={userEmail}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;

                                setUserEmail(target.value);
                            }}
                        />
                    </div>

                    <div className="text-right mt-8 mb-4">
                        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl disabled:bg-blue-900 disabled:cursor-not-allowed">Modifier</button>
                    </div>
                </form>
            </div>
        </>
    );
}