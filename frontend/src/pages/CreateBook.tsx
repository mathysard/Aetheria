import React, { useEffect, useRef, useState, type Ref, type RefObject } from 'react'
import Navbar from "../components/Navbar"

interface CharacterInterface {
    firstName: string;
    lastName: string;
    nickname: string;
    gender: string;
    pronouns: string;
    race: string;
    age: string;
    uuid: string;
    image: string;
    userFields: {
        label: string;
        value: string;
        uuid: string;
    }[];
}

interface RelationInterface {
    characterOne: CharacterInterface|object,
    characterTwo: CharacterInterface|object,
    label: string;
}

interface LocationInterface {
    name: string;
    description: string;
    uuid: string;
    userFields: {
        label: string;
        value: string;
        uuid: string;
    }[];
}

interface CharacterCardInterface {
    character: CharacterInterface;
    dialogRef: RefObject<HTMLDialogElement | null>
    setChosenCharacter: React.Dispatch<React.SetStateAction<CharacterInterface | undefined>>
    setCharacters: React.Dispatch<React.SetStateAction<CharacterInterface[]>>
}

interface CharacterFormInterface {
    characters: CharacterInterface[],
    setCharacters: React.Dispatch<React.SetStateAction<CharacterInterface[]>>,
    charactersDivRef: Ref<HTMLDivElement>|undefined|null,
    characterFormRef: Ref<HTMLDivElement>|undefined|null,
}

interface RelationFormInterface {
    relations: RelationInterface[];
    setRelations: React.Dispatch<React.SetStateAction<RelationInterface[]>>;
    characters: CharacterInterface[];
    relationsDivRef: Ref<HTMLDivElement>|undefined|null;
    relationFormRef: Ref<HTMLDivElement>|undefined|null;
}

interface LocationCardInterface {
    location: LocationInterface;
    dialogRef: RefObject<HTMLDialogElement | null>
    setChosenLocation: React.Dispatch<React.SetStateAction<LocationInterface | undefined>>
    setLocations: React.Dispatch<React.SetStateAction<LocationInterface[]>>
}

interface LocationFormInterface {
    locations: LocationInterface[],
    setLocations: React.Dispatch<React.SetStateAction<LocationInterface[]>>,
    locationsDivRef: Ref<HTMLDivElement>|undefined|null,
    locationFormRef: Ref<HTMLDivElement>|undefined|null,
}

const createUniqueId = () => {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".split("");
    const charsLength = allowedChars.length;
    let id = "";

    for(let i = 0; i < 25; i++) {
        id += allowedChars[Math.round((Math.random() * charsLength) - 1)];
    }

    return id;
}

const BookForm = () => {
    const [triggerWarningsAreDisplayed, setTriggerWarningsAreDisplayed] = useState(false);
    const [friendsOnlyIsDisplayed, setFriendsOnlyIsDisplayed] = useState(false);

    return (
        <form>
            <div className="mb-6">
                <label className="font-semibold text-base">Titre (0/255)</label>
                <div className="my-1.5" />
                <input
                    type="text"
                    id="bookTitle"
                    name="title"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Titre..."
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        const parentElement = target.parentElement as HTMLDivElement;
                        parentElement.children[0].textContent = `Titre (${target.value.length}/255)`
                    }}
                />
            </div>
            <div className="mb-6">
                <label className="font-semibold text-base">Description</label>
                <div className="my-1.5" />
                <textarea
                    id="bookDescription"
                    name="description"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Description..."
                />
            </div>
            <div className="mb-6">
                <label className="font-semibold text-base">Genre</label>
                <div className="my-1.5" />
                <select
                    id="bookGenre"
                    name="genre"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                >
                    <option></option>
                </select>
            </div>
            <div className="mb-6">
                <label className="font-semibold text-base">Mots-clés</label>
                <div className="my-1.5" />
                <input
                    type="text"
                    id="bookKeyword"
                    name="keyword"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Mots-clés..."
                />
                <p className="text-sm mt-1">Séparer par une virgule.</p>
            </div>
            <div className="mb-6">
                <label className="font-semibold text-base mr-2">Mature</label>
                <input
                    type="checkbox"
                    name="nsfw"
                    id="bookNsfw"
                    onClick={(e) => {
                        const target = e.target as HTMLInputElement;

                        setTriggerWarningsAreDisplayed(target.checked);
                    }}
                />
            </div>
            {triggerWarningsAreDisplayed && (
                <div className="mb-6">
                    <label className="font-semibold text-base">Trigger Warning(s)</label>
                    <div className="my-1.5" />
                    <textarea
                        id="bookTriggerWarnings"
                        name="triggerWarnings"
                        className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Trigger Warnings..."
                    />
                </div>
            )}
            <div className="mb-6">
                <label className="font-semibold text-base">Visibilité</label>
                <div className="my-1.5" />
                <select
                    id="bookVisibility"
                    name="visibility"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    onChange={(e) => {
                        const target = e.target as HTMLSelectElement;

                        setFriendsOnlyIsDisplayed(target.value === "unlisted");
                    }}
                >
                    <option value="public">Public</option>
                    <option value="unlisted">Non-répertorié</option>
                    <option value="private">Privé</option>
                </select>
            </div>
            {friendsOnlyIsDisplayed && (
                <div>
                    <label className="font-semibold text-base mr-2">Visible aux ami(e)s uniquement</label>
                    <input
                        type="checkbox"
                        id="bookFriendsOnly"
                        name="friendsOnly"
                    />
                </div>
            )}
        </form>
    );
}

const CharacterCard = ({character, dialogRef, setChosenCharacter, setCharacters}: CharacterCardInterface) => {
    return (
        <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs w-[80%] mx-auto mb-8">
            <div className="w-full h-50 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                <div className="w-full h-full flex justify-center items-center">
                    <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="px-6 pt-6 text-center">
                <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">{character.firstName || character.lastName ? `${character.firstName} ${character.lastName}` : "Prénom Nom"}</h5>
            </div>
            <div className="pb-6 px-6 flex justify-between items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="red"
                    className="size-6 cursor-pointer"
                    onClick={() => {
                        setCharacters(prev => prev.filter((val) => val.uuid !== character?.uuid))
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <button
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
                    onClick={() => {
                        setChosenCharacter(character);
                        dialogRef.current?.showModal();
                    }}
                >
                    Voir
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </button>
            </div>
        </div>
    );
}

const CharactersForm = ({characters, setCharacters, charactersDivRef, characterFormRef}: CharacterFormInterface) => {
    const [charactersDisplay, setCharactersDisplay] = useState(characters);
    const [chosenCharacter, setChosenCharacter] = useState<CharacterInterface>();
    const buttonCreateRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        setCharactersDisplay(characters);
    }, [characters]);

    return (
        <>
            <div className="w-full text-center">
                <button
                    ref={buttonCreateRef}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                    onClick={() => {
                        const newCharacter = {
                            firstName: "",
                            lastName: "",
                            nickname: "",
                            gender: "",
                            pronouns: "",
                            race: "",
                            age: "",
                            uuid: createUniqueId(),
                            image: "",
                            userFields: []
                        };

                        setCharacters(prev => [...prev, newCharacter]);
                    }}
                >
                    Ajouter un personnage
                </button>
            </div>

            <div id="characters" ref={charactersDivRef}>
                {characters.length > 0 && (
                    <div className="text-center flex justify-center items-center pl-2 mt-8 h-fit rounded-2xl border-gray-300 border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            className="bg-neutral-secondary-medium text-heading text-sm rounded-base outline-0 block px-3 py-2.5 shadow-xs w-full"
                            placeholder="Recherche..."
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const buttonCreate = buttonCreateRef.current as HTMLButtonElement;
                                buttonCreate.disabled = target.value.length > 0;

                                const newCharacters = target.value.length > 0 ? characters.filter((character: CharacterInterface) => `${character.firstName.toLowerCase()} ${character.lastName.toLowerCase()}`.includes(target.value.toLowerCase())) : characters;
                                setCharactersDisplay(newCharacters);
                            }}
                        />
                    </div>
                )}
                <div className={`w-full grid grid-cols-2 ${charactersDisplay.length && "mt-8"}`.trim()}>
                    {charactersDisplay.map((character: CharacterInterface) => (
                        <div key={`character-${character.uuid}`}>
                            <CharacterCard character={character} dialogRef={dialogRef} setChosenCharacter={setChosenCharacter} setCharacters={setCharacters} />
                        </div>
                    ))}
                </div>
            </div>

            <dialog ref={dialogRef} className="w-[60%] mx-auto absolute top-16 backdrop:bg-gray-600 backdrop:opacity-50">
                <div className="w-full mt-8 bg-white">
                    <div className="flex justify-between mx-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                            onClick={() => dialogRef.current?.close()}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="pt-6" />
                    <div className="mt-8 w-[40%] mx-auto h-60 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                        <div className="w-full h-full flex justify-center items-center">
                            <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pb-18" />

                    <div id="characterForm" ref={characterFormRef} className="w-[75%] mx-auto">
                        <div className="flex justify-between mb-6">
                            <input type="text" placeholder="Nom du champ..." className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-[75%] px-3 py-2.5 shadow-xs placeholder:text-body" />
                            <button
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl"
                                onClick={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    const inputElement = target.parentElement?.children[0] as HTMLInputElement;

                                    if(inputElement.value.length > 0) {
                                        setCharacters(prev => {
                                            const newUserField = [...prev];
                                            const foundCharacter = newUserField.find((val) => val.uuid == chosenCharacter?.uuid);
                                            foundCharacter?.userFields?.push({
                                                label: inputElement.value,
                                                value: "",
                                                uuid: createUniqueId()
                                            });

                                            inputElement.value = "";
                                            
                                            return newUserField;
                                        });
                                    }

                                    inputElement.focus();
                                }}
                            >
                                + Champ
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Prénom</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterFirstName"
                                name="firstName"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Prénom..."
                                value={chosenCharacter?.firstName}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.firstName = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Nom</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterLastName"
                                name="lastName"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Nom..."
                                value={chosenCharacter?.lastName}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.lastName = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Surnom</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterNickname"
                                name="nickname"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Surnom..."
                                value={chosenCharacter?.nickname}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.nickname = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Genre</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterGender"
                                name="gender"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Genre..."
                                value={chosenCharacter?.gender}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.gender = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Pronoms</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterPronouns"
                                name="pronouns"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Pronoms..."
                                value={chosenCharacter?.pronouns}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.pronouns = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Race</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterRace"
                                name="race"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Race..."
                                value={chosenCharacter?.race}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.race = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        <div className="pb-6">
                            <label className="font-semibold text-base">Âge</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterAge"
                                name="age"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Âge..."
                                value={chosenCharacter?.age}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.age = target.value;

                                        return newCharacters;
                                    });
                                }}
                            />
                        </div>
                        {chosenCharacter?.userFields.map((field: any, fieldI: number) => (
                            <div className="pb-6" key={`character-${chosenCharacter?.uuid}-user-field-${field.uuid}`}>
                                <div className="flex">
                                    <label className="font-semibold text-base">{field.label}</label>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="red"
                                        className="size-6 cursor-pointer"
                                        onClick={() => {
                                            setCharacters(prev => {
                                                const newCharacters = [...prev];
                                                const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                                foundCharacter.userFields = foundCharacter?.userFields?.filter((val) => val.uuid !== field.uuid);
        
                                                return newCharacters;
                                            });
                                        }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                                <div className="my-1.5" />
                                <input
                                    type="text"
                                    id={`characterUserField_${fieldI+1}`}
                                    name={`userField_${fieldI+1}`}
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Âge..."
                                    value={field.value ?? undefined}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                            const foundField = foundCharacter?.userFields?.find((val) => val.uuid == field.uuid);
                                            (foundField as {value: string;}).value = target.value;
    
                                            return newCharacters;
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </dialog>
        </>
    );
}

const RelationsForm = ({relations, setRelations, characters, relationsDivRef, relationFormRef}: RelationFormInterface) => {
    return (
        <>
            <div className="w-full text-center">
                <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                    onClick={() => {
                        const newRelation = {
                            characterOne: {
                                firstName: "",
                                lastName: "",
                                nickname: "",
                                gender: "",
                                pronouns: "",
                                race: "",
                                age: "",
                                userFields: []
                            },
                            characterTwo: {
                                firstName: "",
                                lastName: "",
                                nickname: "",
                                gender: "",
                                pronouns: "",
                                race: "",
                                age: "",
                                userFields: []
                            },
                            label: ""
                        };

                        setRelations(prev => [...prev, newRelation]);
                    }}
                    disabled={characters.length < 1}
                >
                    Ajouter une relation
                </button>
                {characters.length < 1 && (
                    <>
                        <p className="text-red-500 mt-2">⛔ Veuillez créer au moins un personnage pour pouvoir ajouter une relation.</p>
                        <p className="text-orange-500">⚠️ De préférence, veuillez également renseigner soit le prénom soit le nom des personnages crées.</p>
                    </>
                )}
            </div>

            <div id="relations" ref={relationsDivRef}>
                {relations.map((relation: RelationInterface, i: number) => (
                    <div className="w-full border-gray-300 border-2 mt-8">
                        <div className="flex justify-end mt-4 mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                className="size-6 cursor-pointer"
                                onClick={() => setRelations(prev => prev.filter((val) => prev.indexOf(val) !== i))}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                        <div id="relationForm" ref={relationFormRef} className="w-[75%] mx-auto">
                            <div className="mb-6">
                                <label className="font-semibold text-base">Personnage N°1</label>
                                <div className="my-1.5" />
                                <select
                                    id="relationCharacterOne"
                                    name="characterOne"
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    value={relation.characterOne ? (relation.characterOne as CharacterInterface).uuid : undefined}
                                    onChange={(e) => {
                                        const target = e.target as HTMLSelectElement;

                                        const character = characters.find(char => char.uuid === target.value);

                                        if(character) {
                                            setRelations(prev => {
                                                const newRelations = [...prev];

                                                newRelations[i] = {
                                                    ...newRelations[i],
                                                    characterOne: character
                                                };

                                                return newRelations;
                                            })
                                        }
                                    }}
                                >
                                    {characters.map((character: CharacterInterface) => (
                                        <option value={character.uuid}>{character.firstName} {character.lastName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="font-semibold text-base">Personnage N°2</label>
                                <div className="my-1.5" />
                                <select
                                    id="relationCharacterTwo"
                                    name="characterTwo"
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    value={relation.characterTwo ? (relation.characterTwo as CharacterInterface).uuid : undefined}
                                    onChange={(e) => {
                                        const target = e.target as HTMLSelectElement;

                                        const character = characters.find(char => char.uuid === target.value);

                                        if(character) {
                                            setRelations(prev => {
                                                const newRelations = [...prev];

                                                newRelations[i] = {
                                                    ...newRelations[i],
                                                    characterTwo: character
                                                };

                                                return newRelations;
                                            })
                                        }
                                    }}
                                >
                                    {characters.map((character: CharacterInterface) => (
                                        <option value={character.uuid}>{character.firstName} {character.lastName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="font-semibold text-base">Nom</label>
                                <div className="my-1.5" />
                                <input
                                    type="text"
                                    id="relationLabel"
                                    name="label"
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Nom..."
                                    value={relation.label}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setRelations(prev => {
                                            const newRelations = [...prev];

                                            newRelations[i] = {
                                                ...newRelations[i],
                                                label: target.value
                                            };

                                            return newRelations;
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const LocationCard = ({location, dialogRef, setChosenLocation, setLocations}: LocationCardInterface) => {
    return (
        <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs w-[80%] mx-auto mb-8">
            <div className="w-full h-50 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                <div className="w-full h-full flex justify-center items-center">
                    <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="px-6 pt-6 text-center">
                <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">{location.name ? location.name : "Nom"}</h5>
            </div>
            <div className="pb-6 px-6 flex justify-between items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="red"
                    className="size-6 cursor-pointer"
                    onClick={() => {
                        setLocations(prev => prev.filter((val) => val.uuid !== location?.uuid))
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <button
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
                    onClick={() => {
                        setChosenLocation(location);
                        dialogRef.current?.showModal();
                    }}
                >
                    Voir
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </button>
            </div>
        </div>
    );
}

const LocationsForm = ({locations, setLocations, locationsDivRef, locationFormRef}: LocationFormInterface) => {
    const [locationsDisplay, setLocationsDisplay] = useState(locations);
    const [chosenLocation, setChosenLocation] = useState<LocationInterface>();
    const buttonCreateRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        setLocationsDisplay(locations);
    }, [locations]);

    return (
        <>
            <div className="w-full text-center">
                <button
                    ref={buttonCreateRef}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                    onClick={() => {
                        const newLocation = {
                            name: "",
                            description: "",
                            uuid: createUniqueId(),
                            image: "",
                            userFields: []
                        };

                        setLocations(prev => [...prev, newLocation]);
                    }}
                >
                    Ajouter un personnage
                </button>
            </div>

            <div id="locations" ref={locationsDivRef}>
                {locations.length > 0 && (
                    <div className="text-center flex justify-center items-center pl-2 mt-8 h-fit rounded-2xl border-gray-300 border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="oklch(55.1% 0.027 264.364)" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            className="bg-neutral-secondary-medium text-heading text-sm rounded-base outline-0 block px-3 py-2.5 shadow-xs w-full"
                            placeholder="Recherche..."
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                const buttonCreate = buttonCreateRef.current as HTMLButtonElement;
                                buttonCreate.disabled = target.value.length > 0;

                                const newLocations = target.value.length > 0 ? locations.filter((location: LocationInterface) => location.name.toLowerCase().includes(target.value.toLowerCase())) : locations;
                                setLocationsDisplay(newLocations);
                            }}
                        />
                    </div>
                )}
                <div className={`w-full grid grid-cols-2 ${locationsDisplay.length && "mt-8"}`.trim()}>
                    {locationsDisplay.map((location: LocationInterface) => (
                        <div key={`location-${location.uuid}`}>
                            <LocationCard location={location} dialogRef={dialogRef} setChosenLocation={setChosenLocation} setLocations={setLocations} />
                        </div>
                    ))}
                </div>
            </div>

            <dialog ref={dialogRef} className="w-[60%] mx-auto absolute top-16 backdrop:bg-gray-600 backdrop:opacity-50">
                <div className="w-full mt-8 bg-white">
                    <div className="flex justify-between mx-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                            onClick={() => dialogRef.current?.close()}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="pt-6" />
                    <div className="mt-8 w-[40%] mx-auto h-60 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                        <div className="w-full h-full flex justify-center items-center">
                            <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="pb-18" />

                    <div id="locationForm" ref={locationFormRef} className="w-[75%] mx-auto">
                        <div className="flex justify-between mb-6">
                            <input type="text" placeholder="Nom du champ..." className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-[75%] px-3 py-2.5 shadow-xs placeholder:text-body" />
                            <button
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl"
                                onClick={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    const inputElement = target.parentElement?.children[0] as HTMLInputElement;

                                    if(inputElement.value.length > 0) {
                                        setLocations(prev => {
                                            const newUserField = [...prev];
                                            const foundLocation = newUserField.find((val) => val.uuid == chosenLocation?.uuid);
                                            foundLocation?.userFields?.push({
                                                label: inputElement.value,
                                                value: "",
                                                uuid: createUniqueId()
                                            });

                                            inputElement.value = "";
                                            
                                            return newUserField;
                                        });
                                    }

                                    inputElement.focus();
                                }}
                            >
                                + Champ
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold text-base">Nom</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="locationName"
                                name="name"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Nom..."
                                value={chosenLocation?.name}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setLocations(prev => {
                                        const newLocations = [...prev];
                                        const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;
                                        foundLocation.name = target.value;

                                        return newLocations;
                                    });
                                }}
                            />
                        </div>
                        <div className="pb-6">
                            <label className="font-semibold text-base">Description</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="locationDescription"
                                name="description"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Description..."
                                value={chosenLocation?.description}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setLocations(prev => {
                                        const newLocations = [...prev];
                                        const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;
                                        foundLocation.description = target.value;

                                        return newLocations;
                                    });
                                }}
                            />
                        </div>
                        {chosenLocation?.userFields.map((field: any, fieldI: number) => (
                            <div className="pb-6" key={`location-${chosenLocation?.uuid}-user-field-${field.uuid}`}>
                                <div className="flex">
                                    <label className="font-semibold text-base">{field.label}</label>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="red"
                                        className="size-6 cursor-pointer"
                                        onClick={() => {
                                            setLocations(prev => {
                                                const newLocations = [...prev];
                                                const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;
                                                foundLocation.userFields = foundLocation.userFields?.filter((val) => val.uuid !== field.uuid);
        
                                                return newLocations;
                                            });
                                        }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                                <div className="my-1.5" />
                                <input
                                    type="text"
                                    id={`locationUserField_${fieldI+1}`}
                                    name={`userField_${fieldI+1}`}
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Âge..."
                                    value={field.value ?? undefined}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setLocations(prev => {
                                            const newLocations = [...prev];
                                            const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;
                                            const foundField = foundLocation?.userFields?.find((val) => val.uuid == field.uuid);
                                            (foundField as {value: string;}).value = target.value;
    
                                            return newLocations;
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </dialog>
        </>
    );
}

function CreateBook() {
    const [activeScreen, setActiveScreen] = useState<"book"|"characters"|"relations"|"locations"|"chapters">("book");

    const [characters, setCharacters] = useState<CharacterInterface[]>([]);
    const charactersDivRef = useRef(null);
    const characterFormRef = useRef(null);

    const [relations, setRelations] = useState<RelationInterface[]>([]);
    const relationsDivRef = useRef(null);
    const relationFormRef = useRef(null);

    const [locations, setLocations] = useState<LocationInterface[]>([]);
    const locationsDivRef = useRef(null);
    const locationFormRef = useRef(null);

    return (
        <>
            <Navbar />
            <div className="mt-16 ml-24">
                <div className="flex">
                    <div className="bg-gray-400 w-[20%] h-120 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                        <div className="w-full h-full flex justify-center items-center">
                            <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-[8%] px-8 pt-4 bg-white shadow-xl">
                        <div className="flex h-max border-b-2 mb-8 border-gray-400">
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "book" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("book")}>Livre</p>
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "characters" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("characters")}>Personnages</p>
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "relations" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("relations")}>Relations</p>
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "locations" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("locations")}>Lieux</p>
                            <p className={`text-2xl font-semibold mb-4 ${activeScreen === "chapters" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("chapters")}>Chapitres</p>
                        </div>
                        <div className={activeScreen !== "book" ? "hidden" : ""}>
                            <BookForm />
                        </div>
                        <div className={activeScreen !== "characters" ? "hidden" : ""}>
                            <CharactersForm characters={characters} setCharacters={setCharacters} charactersDivRef={charactersDivRef} characterFormRef={characterFormRef} />
                        </div>
                        <div className={activeScreen !== "relations" ? "hidden" : ""}>
                            <RelationsForm relations={relations} setRelations={setRelations} characters={characters} relationsDivRef={relationsDivRef} relationFormRef={relationFormRef} />
                        </div>
                        <div className={activeScreen !== "locations" ? "hidden" : ""}>
                            <LocationsForm locations={locations} setLocations={setLocations} locationsDivRef={locationsDivRef} locationFormRef={locationFormRef} />
                        </div>
                        {((activeScreen === "book") || (activeScreen === "characters" && characters.length > 0) || (activeScreen === "relations" && relations.length > 0) || (activeScreen === "locations" && locations.length > 0)) && (
                            <div className="text-right mt-16 mb-4">
                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl">Créer</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBook