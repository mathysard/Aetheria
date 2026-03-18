import React, { useEffect, useRef, useState, type Ref, type RefObject } from 'react'
import Navbar from "../components/Navbar"
import { dataURIToBlob, createUniqueId } from '../utils';

interface CharacterInterface {
    firstName: string;
    middleNames: string;
    lastName: string;
    nickname: string;
    gender: string;
    pronouns: string;
    race: string;
    age: string;
    uuid: string;
    image: Blob|null;
    imageBase64: string;
    public: boolean;
    userFields: {
        label: string;
        value: string;
        uuid: string;
    }[];
}

interface LocationInterface {
    name: string;
    description: string;
    uuid: string;
    image: Blob|null;
    imageBase64: string;
    public: boolean;
    userFields: {
        label: string;
        value: string;
        uuid: string;
    }[];
}

interface CharacterCardInterface {
    character: CharacterInterface;
    dialogRef: RefObject<HTMLDialogElement | null>;
    setChosenCharacter: React.Dispatch<React.SetStateAction<CharacterInterface | undefined>>;
    setCharacters: React.Dispatch<React.SetStateAction<CharacterInterface[]>>;
}

interface CharacterFormInterface {
    characters: CharacterInterface[];
    setCharacters: React.Dispatch<React.SetStateAction<CharacterInterface[]>>;
    charactersDivRef: Ref<HTMLDivElement>|undefined|null;
    characterFormRef: Ref<HTMLDivElement>|undefined|null;
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

const CharacterCard = ({character, dialogRef, setChosenCharacter, setCharacters}: CharacterCardInterface) => {
    return (
        <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs w-[80%] mx-auto mb-8">
            <div className="w-full h-50 flex bg-gray-400">
                {character.image && character.imageBase64 ? (
                    <div className="w-full h-full overflow-hidden">
                        <img src={character.imageBase64} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center"></div>
                )}
            </div>
            <div className="px-6 pt-6 text-center">
                <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">{character.firstName || character.middleNames || character.lastName ? `${character.firstName} ${character.middleNames} ${character.lastName}` : "Prénom Nom"}</h5>
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

                {character.public === true ? (
                    <button
                        className="border-2 border-gray-400 rounded-full py-1 px-2 flex cursor-pointer"
                        onClick={() => {
                            setCharacters(prev => {
                                const newCharacters = [...prev];
                                const foundCharacter = newCharacters.find((val) => val.uuid == character?.uuid) as CharacterInterface;
                                foundCharacter.public = false;

                                return newCharacters;
                            })
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4a5565" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <p className="ml-2 mr-1 text-gray-600">Public</p>
                    </button>
                ) : (
                    <button
                        className="border-2 border-gray-400 rounded-full py-1 px-2 flex cursor-pointer"
                        onClick={() => {
                            setCharacters(prev => {
                                const newCharacters = [...prev];
                                const foundCharacter = newCharacters.find((val) => val.uuid == character?.uuid) as CharacterInterface;
                                foundCharacter.public = true;
                                
                                return newCharacters;
                            })
                        }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4a5565" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                        <p className="ml-2 mr-1 text-gray-600">Privé</p>
                    </button>
                )}

                <button
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
                    onClick={() => {
                        const navbar = document.getElementById("navbar") as HTMLDivElement;
                        navbar.scrollIntoView({
                            behavior: 'smooth'
                        });
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
    const [, setLoadState] = useState(false);
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
                            middleNames: "",
                            lastName: "",
                            nickname: "",
                            gender: "",
                            pronouns: "",
                            race: "",
                            age: "",
                            uuid: createUniqueId(),
                            image: null,
                            imageBase64: "",
                            public: true,
                            userFields: []
                        };

                        setCharacters(prev => [...prev, newCharacter]);
                        setChosenCharacter(newCharacter);
                        dialogRef.current?.showModal();
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

                                const newCharacters = target.value.length > 0 ? characters.filter((character: CharacterInterface) => `${character.firstName.toLowerCase()} ${character.middleNames.toLowerCase()} ${character.lastName.toLowerCase()}`.includes(target.value.toLowerCase())) : characters;
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

            <dialog ref={dialogRef} className="w-[60%] mx-auto absolute top-5 backdrop:bg-gray-600 backdrop:opacity-50">
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
                        {chosenCharacter?.image && chosenCharacter?.imageBase64 ? (
                            <div className="my-8 w-[40%] mx-auto h-60">
                                <div className="w-full h-full">
                                    <img src={chosenCharacter?.imageBase64} className="w-full h-full object-cover" />
                                </div>
                                <div
                                    className="bg-red-500 py-4 w-full flex justify-center hover:bg-red-600 active:bg-red-800"
                                    onClick={() => {
                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                            foundCharacter.image = null;
                                            foundCharacter.imageBase64 = "";
            
                                            return newCharacters;
                                        });
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-8 w-[40%] mx-auto h-60 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                                <div
                                    className="w-full h-full flex justify-center items-center"
                                    onClick={() => {
                                        const chosenCharacterFileInput = document.getElementById(`character_${chosenCharacter?.uuid}_image_input`);
                                        chosenCharacterFileInput?.click();
                                    }}
                                >
                                    <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                    <div className="pb-18" />

                    <div id="characterForm" ref={characterFormRef} className="w-[75%] mx-auto">
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
                            <label className="font-semibold text-base">Second(s) prénom(s)</label>
                            <div className="my-1.5" />
                            <input
                                type="text"
                                id="characterMiddleNames"
                                name="middleNames"
                                className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Prénom..."
                                value={chosenCharacter?.middleNames}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;

                                    setCharacters(prev => {
                                        const newCharacters = [...prev];
                                        const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;
                                        foundCharacter.middleNames = target.value;

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
                                    placeholder={`${field.label}...`}
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
                        <div className="bg-gray-400 w-full h-0.5 mt-2 mb-8" />
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
                    </div>
                </div>

                {characters.map((character) => (
                    <input
                        hidden
                        type="file"
                        name={`character_${character.uuid}_image`}
                        id={`character_${character.uuid}_image_input`}
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;

                            setCharacters(prev => {
                                const newCharacters = [...prev];
                                const foundCharacter = newCharacters.find((val) => val.uuid == chosenCharacter?.uuid) as CharacterInterface;

                                var file = (target.files as FileList)[0];
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    foundCharacter.image = dataURIToBlob(reader.result as string);
                                    foundCharacter.imageBase64 = reader.result as string;
                                    setLoadState(prev => !prev);
                                }
                                reader.readAsDataURL(file);
                                
                                return newCharacters;
                            });
                        }}
                    />
                ))}
            </dialog>
        </>
    );
}

const LocationCard = ({location, dialogRef, setChosenLocation, setLocations}: LocationCardInterface) => {
    return (
        <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs w-[80%] mx-auto mb-8">
            <div className="w-full h-50 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                <div className="w-full h-full flex justify-center items-center">
                    {location.image && location.imageBase64 ? (
                        <div className="w-full h-full overflow-hidden">
                            <img src={location.imageBase64} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center"></div>
                    )}
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

                {location.public === true ? (
                    <button
                        className="border-2 border-gray-400 rounded-full py-1 px-2 flex cursor-pointer"
                        onClick={() => {
                            setLocations(prev => {
                                const newLocations = [...prev];
                                const foundLocation = newLocations.find((val) => val.uuid == location?.uuid) as LocationInterface;
                                foundLocation.public = false;

                                return newLocations;
                            })
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4a5565" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <p className="ml-2 mr-1 text-gray-600">Public</p>
                    </button>
                ) : (
                    <button
                        className="border-2 border-gray-400 rounded-full py-1 px-2 flex cursor-pointer"
                        onClick={() => {
                            setLocations(prev => {
                                const newLocations = [...prev];
                                const foundLocation = newLocations.find((val) => val.uuid == location?.uuid) as LocationInterface;
                                foundLocation.public = true;
                                
                                return newLocations;
                            })
                        }}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4a5565" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                        <p className="ml-2 mr-1 text-gray-600">Privé</p>
                    </button>
                )}

                <button
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
                    onClick={() => {
                        const navbar = document.getElementById("navbar") as HTMLDivElement;
                        navbar.scrollIntoView({
                            behavior: 'smooth'
                        });
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
    const [, setLoadState] = useState(true);
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
                            image: null,
                            imageBase64: "",
                            public: true,
                            userFields: []
                        };

                        setLocations(prev => [...prev, newLocation]);
                        setChosenLocation(newLocation);
                        dialogRef.current?.showModal();
                    }}
                >
                    Ajouter un lieu
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

            <dialog ref={dialogRef} className="w-[60%] mx-auto absolute top-5 backdrop:bg-gray-600 backdrop:opacity-50">
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
                        {chosenLocation?.image && chosenLocation?.imageBase64 ? (
                            <div className="my-8 w-[40%] mx-auto h-60">
                                <div className="w-full h-full">
                                    <img src={chosenLocation?.imageBase64} className="w-full h-full object-cover" />
                                </div>
                                <div
                                    className="bg-red-500 py-4 w-full flex justify-center hover:bg-red-600 active:bg-red-800"
                                    onClick={() => {
                                        setLocations(prev => {
                                            const newLocations = [...prev];
                                            const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;
                                            foundLocation.image = null;
                                            foundLocation.imageBase64 = "";
            
                                            return newLocations;
                                        });
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-8 w-[40%] mx-auto h-60 flex bg-gray-400 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                                <div
                                    className="w-full h-full flex justify-center items-center"
                                    onClick={() => {
                                        const chosenLocationFileInput = document.getElementById(`location_${chosenLocation?.uuid}_image_input`);
                                        chosenLocationFileInput?.click();
                                    }}
                                >
                                    <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                    <div className="pb-18" />

                    <div id="locationForm" ref={locationFormRef} className="w-[75%] mx-auto">
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
                                    placeholder={`${field.label}...`}
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
                        <div className="bg-gray-400 w-full h-0.5 mt-2 mb-8" />
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
                    </div>
                </div>

                {locations.map((location) => (
                    <input
                        hidden
                        type="file"
                        name={`location_${location.uuid}_image`}
                        id={`location_${location.uuid}_image_input`}
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;

                            setLocations(prev => {
                                const newLocations = [...prev];
                                const foundLocation = newLocations.find((val) => val.uuid == chosenLocation?.uuid) as LocationInterface;

                                var file = (target.files as FileList)[0];
                                var reader = new FileReader();
                                reader.onloadend = function() {
                                    foundLocation.image = dataURIToBlob(reader.result as string);
                                    foundLocation.imageBase64 = reader.result as string;
                                    setLoadState(prev => !prev);
                                }
                                reader.readAsDataURL(file);
                                
                                return newLocations;
                            });
                        }}
                    />
                ))}
            </dialog>
        </>
    );
}

const GenericData = () => {
    const [activeScreen, setActiveScreen] = useState<"characters"|"locations">("characters");
    
    const [characters, setCharacters] = useState<CharacterInterface[]>([]);
    const charactersDivRef = useRef(null);
    const characterFormRef = useRef(null);

    const [locations, setLocations] = useState<LocationInterface[]>([]);
    const locationsDivRef = useRef(null);
    const locationFormRef = useRef(null);
    
    const formData = {
        characters: characters,
        locations: locations
    };

    return (
        <>
            <div className="sticky top-0">
                <Navbar />
            </div>
            <div className="mt-16 flex justify-center">
                <div className="flex w-full">
                    <div className="mx-[8%] w-full px-8 pt-4 bg-white shadow-xl">
                        <h1 className="text-center mb-8 font-bold text-3xl">Données génériques</h1>
                        <div className="flex h-max border-b-2 mb-8 border-gray-400">
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "characters" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("characters")}>Personnages</p>
                            <p className={`text-2xl font-semibold mb-4 mr-16 ${activeScreen === "locations" ? "text-blue-400" : ""} cursor-pointer hover:text-blue-400 active:text-blue-600`} onClick={() => setActiveScreen("locations")}>Lieux</p>
                        </div>
                        <div className={activeScreen !== "characters" ? "hidden" : ""}>
                            <CharactersForm characters={characters} setCharacters={setCharacters} charactersDivRef={charactersDivRef} characterFormRef={characterFormRef} />
                        </div>
                        <div className={activeScreen !== "locations" ? "hidden" : ""}>
                            <LocationsForm locations={locations} setLocations={setLocations} locationsDivRef={locationsDivRef} locationFormRef={locationFormRef} />
                        </div>
                        {(activeScreen === "characters" && characters.length === 0) || (activeScreen === "locations" && locations.length === 0) ? (<div className="pb-64" />) : null}
                        {(
                            (activeScreen === "characters" && characters.length > 0)
                            || (activeScreen === "locations" && locations.length > 0)
                        ) && (
                            <div className="text-right mt-16 mb-4">
                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl disabled:bg-blue-900 disabled:cursor-not-allowed">Créer</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenericData