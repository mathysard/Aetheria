import { useState } from 'react';
import Navbar from '../components/Navbar';

interface ErrorsInterface {
    [key: string]: string[];
}

function AuthForm() {
    const authState: "login"|"register" = window.location.pathname.split('/')[1].includes('login') ? 'login' : 'register';
    const [formErrors, setFormErrors] = useState<ErrorsInterface>();

    const strHasNumbers = (string: string) => {
        return string.includes("0")
        || string.includes("1")
        || string.includes("2")
        || string.includes("3")
        || string.includes("4")
        || string.includes("5")
        || string.includes("6")
        || string.includes("7")
        || string.includes("8")
        || string.includes("9")
    }

    const strHasUpperCase = (string: string) => {
        const splittedString = string.split('');
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        splittedString.map((char: string) => {
            if(!numbers.includes(char) && char.toLowerCase() !== char) return true;
        });

        return false;
    }

    const validateForm = (field: string, value: string) => {
        const errors: ErrorsInterface = {
            "displayName": [],
            "userName": [],
            "password": [],
        };

        switch(field) {
            case 'displayName':
                const displayNameType = typeof value === "string";
                const displayNameMinLength = value.length > 0;
                const displayNameMaxLength = value.length <= 255;

                if(!displayNameType) {
                    errors.displayName.push("Le nom doit être une chaîne de caractères");
                }

                if(!displayNameMinLength) {
                    errors.displayName.push("Le nom doit avoir minimum 1 caractère.");
                }

                if(!displayNameMaxLength) {
                    errors.displayName.push("Le nom doit être avoir maximum 255 caractères.");
                }
                break;
            case 'userName':
                const userNameType = typeof value === "string"
                const userNameMinLength = value.length > 4;
                const userNameMaxLength = value.length <= 255;
                const userNameHasSpaces = !value.includes(" ");
                const userNameHasEmojis = !/\p{Emoji}/u.test(value);

                if(!userNameType) {
                    errors.userName.push("Le nom d'utilisateur doit être une chaîne de caractères");
                }

                if(!userNameMinLength) {
                    errors.userName.push("Le nom d'utilisateur doit avoir minimum 4 caractères.");
                }

                if(!userNameMaxLength) {
                    errors.userName.push("Le nom d'utilisateur doit avoir maximum 255 caractères.");
                }

                if(!userNameHasSpaces) {
                    errors.userName.push("Le nom d'utilisateur ne doit pas contenir d'espace(s).");
                }

                if(!userNameHasEmojis) {
                    errors.userName.push("Le nom d'utilisateur ne doit pas contenir d'émojis.");
                }
                break;
            case 'password':
                const passwordType = typeof value === "string"
                const passwordMinLength = value.length >= 6;
                const passwordMaxLength = value.length <= 255;
                const passwordHasSpaces = !value.includes(" ");
                const passwordHasNumbers = strHasNumbers(value);
                const passwordHasUpperCase = strHasUpperCase(value);

                if(!passwordType) {
                    errors.password.push("Le mot de passe doit être une chaîne de caractères");
                }

                if(!passwordMinLength) {
                    errors.password.push("Le mot de passe doit avoir minimum 4 caractères.");
                }

                if(!passwordMaxLength) {
                    errors.password.push("Le mot de passe doit avoir maximum 255 caractères.");
                }

                if(!passwordHasSpaces) {
                    errors.password.push("Le mot de passe ne doit pas contenir d'espace(s).");
                }

                if(!passwordHasNumbers) {
                    errors.password.push("Le mot de passe doit contenir au moins un nombre.");
                }

                if(!passwordHasUpperCase) {
                    errors.password.push("Le mot de passe doit contenir au moins une majuscule.");
                }
                break;
        }

        setFormErrors(errors);
    }

    // const handleSubmit = () => {}

    return (
        <>
            <Navbar />
            <div className="h-max flex justify-center items-center">
                <div>
                    <div className="flex min-h-full flex-col justify-center px-16 mt-20 bg-white shadow-xl">
                        <div className="mx-auto w-full max-w-sm">
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">{authState === "login" ? "Se connecter" : "S'inscrire"}</h2>
                        </div>

                        <div className="mt-4 mx-auto w-full max-w-sm">
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="displayName" className="font-semibold text-base">Nom</label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="displayName"
                                            type="text"
                                            name="displayName"
                                            required
                                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nom..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="userName" className="font-semibold text-base">Nom d'utilisateur</label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="userName"
                                            type="text"
                                            name="userName"
                                            required
                                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nom d'utilisateur..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="font-semibold text-base">Mot de passe</label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Mot de passe..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md text-white cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-800 px-3 py-1.5 text-sm/6 font-semibold text-blackfocus-visible:outline-2 focus-visible:outline-offset-2">{authState === "login" ? "Se connecter" : "S'inscrire"}</button>
                                </div>
                            </form>

                            <p className="mt-4 text-center text-sm/6 text-gray-400 mb-8">
                                {authState === "login" ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
                                <a href={authState === "login" ? "/register" : "login"} className="font-semibold text-blue-500 hover:text-blue-600 ml-1">{authState === "login" ? "S'inscrire" : "Se connecter"}</a>
                            </p>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default AuthForm