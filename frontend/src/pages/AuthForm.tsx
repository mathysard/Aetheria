import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { formDataToObject } from '../utils';
import { Toaster, toast } from 'sonner';

interface ErrorsInterface {
    [key: string]: string[];
}

interface FormInterface {
    "displayName": string[];
    "username": string[];
    "email": string[];
    "password": string[];
    "confirmPassword": string[];
}

const AuthForm = () => {
    const authState: "login"|"register" = window.location.pathname.split('/')[1].includes('login') ? 'login' : 'register';
    const [formErrors, setFormErrors] = useState<ErrorsInterface>(
        {
            "displayName": [],
            "username": [],
            "email": [],
            "password": [],
            "confirmPassword": []
        }
    );

    const isInDevelopment = true;

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
        return /[A-Z]/.test(string);
    }

    const validateForm = (form: FormInterface) => {
        const errors: ErrorsInterface = {
            "displayName": [],
            "username": [],
            "email": [],
            "password": [],
            "confirmPassword": []
        };

        Object.entries(form).map(([field, value]) => {
            switch(field) {
                case 'displayName':
                    const displayNameType = typeof value === "string";
                    const displayNameMinLength = value.length > 0;
                    const displayNameMaxLength = value.length <= 255;
    
                    if(!displayNameType) {
                        errors.displayName.push("❌ Chaîne de caractères");
                    }
    
                    if(!displayNameMinLength) {
                        errors.displayName.push("❌ Minimum 1 caractère.");
                    }
    
                    if(!displayNameMaxLength) {
                        errors.displayName.push("❌ Maximum 255 caractères.");
                    }
                    break;
                case 'username':
                    const usernameType = typeof value === "string"
                    const usernameMinLength = value.length > 4;
                    const usernameMaxLength = value.length <= 255;
                    const usernameHasSpaces = !value.includes(" ");
                    const usernameHasEmojis = !/\p{Emoji}/u.test(value);
    
                    if(!usernameType) {
                        errors.username.push("❌ Chaîne de caractères");
                    }
    
                    if(!usernameMinLength) {
                        errors.username.push("❌ Minimum 4 caractères.");
                    }
    
                    if(!usernameMaxLength) {
                        errors.username.push("❌ Maximum 255 caractères.");
                    }
    
                    if(!usernameHasSpaces) {
                        errors.username.push("❌ Pas d'espace(s).");
                    }
    
                    if(!usernameHasEmojis) {
                        errors.username.push("❌ Pas d'émojis.");
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
                        errors.password.push("❌ Chaîne de caractères");
                    }
    
                    if(!passwordMinLength) {
                        errors.password.push("❌ Minimum 4 caractères.");
                    }
    
                    if(!passwordMaxLength) {
                        errors.password.push("❌ Maximum 255 caractères.");
                    }
    
                    if(!passwordHasSpaces) {
                        errors.password.push("❌ Ne doit pas contenir d'espace(s).");
                    }
    
                    if(!passwordHasNumbers) {
                        errors.password.push("❌ Minimum 1 nombre.");
                    }
    
                    if(!passwordHasUpperCase) {
                        errors.password.push("❌ Minimum 1 majuscule.");
                    }
                    break;
                case 'confirmPassword':
                    const confirmPasswordIsPassword = form.password === value;

                    if(!confirmPasswordIsPassword) {
                        errors.confirmPassword.push("❌ Égal au mot de passe.")
                    }
            }
        })

        if(
            errors.displayName.length === 0
            && errors.username.length === 0
            && errors.email.length === 0
            && errors.password.length === 0
            && errors.confirmPassword.length === 0
        ) {
            return true;
        } else {
            setFormErrors(errors);
            return false;
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const formData = new FormData(target);
        const form = formDataToObject(formData) as FormInterface;

        if(authState === "register") {
            const formIsValid = validateForm(form);
    
            if(formIsValid) {
                try {
                    fetch("https://127.0.0.1:8000/api/register", {
                        method: "POST",
                        body: JSON.stringify(form)
                    })
                    .then(res => res.ok ? res.json() : null)
                    .then(res => {
                        if(res.result === false && res.type === 'formErrors') {
                            setFormErrors(res.errors);
                        }
    
                        if(res.result === false && res.type === 'userExists') {
                            toast.error(res.message);
                        }
    
                        if(res.result === true) {
                            toast.success(res.message);
                        }
                    })
                } catch(error: any) {
                    toast.error(error);
                }
            }
        } else {
            try {
                fetch("https://127.0.0.1:8000/api/login", {
                    method: "POST",
                    body: JSON.stringify(form)
                })
                .then(res => res.ok ? res.json() : null)
                .then(res => {
                    if(res.result === false && (res.type === 'userNotExists' || res.type === 'passwordNotMatches')) {
                        toast.error(res.message);
                    }

                    if(res.result === true) {
                        toast.success(res.message);
                        
                        if(localStorage.getItem('auth_token') === null) {
                            localStorage.setItem('auth_token', res.token);
                        }

                        window.location.href = "/";
                    }
                })
            } catch(error: any) {
                toast.error(error);
            }
        }
    }

    return (
        <>
            <Toaster richColors position='top-right' />
            <Navbar />
            <div className="h-max flex justify-center items-center">
                <div>
                    <div className="flex min-h-full flex-col justify-center px-16 mt-20 bg-white shadow-xl">
                        <div className="mx-auto w-full max-w-sm">
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">{authState === "login" ? "Se connecter" : "S'inscrire"}</h2>
                        </div>

                        <div className="mt-4 mx-auto w-full max-w-sm">
                            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                {authState === "register" && (
                                    <>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="displayName" className="font-semibold text-base">Nom d'affichage</label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="displayName"
                                                    type="text"
                                                    name="displayName"
                                                    required
                                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                                    placeholder="Nom..."
                                                />
                                            </div>
                                            {formErrors.displayName.length > 0 ? formErrors.displayName.map(displayName => (
                                                <p className="font-light text-red-500">{displayName}</p>
                                            )) : null}
                                        </div>
                                    
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="username" className="font-semibold text-base">Nom d'utilisateur</label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    required
                                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                                    placeholder="Nom d'utilisateur..."
                                                />
                                            </div>
                                            {formErrors.username.length > 0 ? formErrors.username.map(username => (
                                                <p className="font-light text-red-500">{username}</p>
                                            )) : null}
                                        </div>
                                    </>
                                )}

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="email" className="font-semibold text-base">E-mail</label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                            placeholder="E-mail..."
                                        />
                                    </div>
                                    {formErrors.email.length > 0 ? formErrors.email.map(email => (
                                        <p className="font-light text-red-500">{email}</p>
                                    )) : null}
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
                                            className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                            placeholder="Mot de passe..."
                                        />
                                    </div>
                                    {formErrors.password.length > 0 ? formErrors.password.map(password => (
                                        <p className="font-light text-red-500">{password}</p>
                                    )) : null}
                                </div>

                                {authState === "register" && (
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="confirmPassword" className="font-semibold text-base">Confirmation du mot de passe</label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                name="confirmPassword"
                                                required
                                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                                placeholder="Confirmation du mot de passe..."
                                            />
                                        </div>
                                        {formErrors.confirmPassword.length > 0 ? formErrors.confirmPassword.map(confirmPassword => (
                                            <p className="font-light text-red-500">{confirmPassword}</p>
                                        )) : null}
                                    </div>
                                )}

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