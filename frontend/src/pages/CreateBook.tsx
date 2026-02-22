import React, { useRef, useState, type Ref } from 'react'
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
    userFields: {
        label: string;
        value: string;
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
    userFields: {
        label: string;
        value: string;
    }[];
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
                <label className="font-semibold text-base">Catégorie</label>
                <div className="my-1.5" />
                <select
                    id="bookCategory"
                    name="category"
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
                />
            </div>
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
            <div className="mb-6">
                <label className="font-semibold text-base">Visibilité</label>
                <div className="my-1.5" />
                <select
                    id="bookVisibility"
                    name="visibility"
                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                >
                    <option value="public">Public</option>
                    <option value="unlisted">Non-répertorié</option>
                    <option value="unlisted_friends_only">Non-répertorié (amis uniquement)</option>
                    <option value="private">Privé</option>
                </select>
            </div>
        </form>
    );
}

const CharactersForm = ({characters, setCharacters, charactersDivRef, characterFormRef}: CharacterFormInterface) => {
    return (
        <>
            <div className="w-full text-center">
                <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl"
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
                            userFields: []
                        };

                        setCharacters(prev => [...prev, newCharacter]);
                    }}
                >
                    Ajouter un personnage
                </button>
            </div>

            <div id="characters" ref={charactersDivRef}>
                {characters.map((character: CharacterInterface, i: number) => (
                    <div className="w-full border-gray-300 border-2 mt-8">
                        <div className="flex justify-end pt-2 pr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                className="size-6 cursor-pointer"
                                onClick={() => setCharacters(prev => prev.filter((val) => prev.indexOf(val) !== i))}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

                                                newUserField[i] = {
                                                    ...newUserField[i],
                                                    userFields: [
                                                        ...newUserField[i].userFields,
                                                        {
                                                            label: inputElement.value,
                                                            value: ""
                                                        }
                                                    ]
                                                };
                                                
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
                                    value={character.firstName}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                firstName: target.value
                                            };

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
                                    value={character.lastName}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                lastName: target.value
                                            };

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
                                    value={character.nickname}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                nickname: target.value
                                            };

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
                                    value={character.gender}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                gender: target.value
                                            };

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
                                    value={character.pronouns}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                pronouns: target.value
                                            };

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
                                    value={character.race}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                race: target.value
                                            };

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
                                    value={character.age}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setCharacters(prev => {
                                            const newCharacters = [...prev];
                                            newCharacters[i] = {
                                                ...newCharacters[i],
                                                age: target.value
                                            };

                                            return newCharacters;
                                        });
                                    }}
                                />
                            </div>
                            {character.userFields.map((field: any, fieldI: number) => (
                                <div className="pb-6">
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
                                                    const newUserField = [...prev];
                                                    
                                                    newUserField[i] = {
                                                        ...newUserField[i],
                                                        userFields: newUserField[i].userFields.filter((_, index) => index !== fieldI),
                                                    };
                                                    
                                                    return newUserField;
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

                                                newCharacters[i].userFields[fieldI] = {
                                                    ...newCharacters[i].userFields[fieldI],
                                                    value: target.value
                                                };

                                                return newCharacters;
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

const RelationsForm = ({relations, setRelations, characters, relationsDivRef, relationFormRef}: RelationFormInterface) => {
    return (
        <>
            <div className="w-full text-center">
                <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl"
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
                >
                    Ajouter une relation
                </button>
            </div>

            <div id="relations" ref={relationsDivRef}>
                {relations.map((relation: RelationInterface, i: number) => (
                    <div className="w-full border-gray-300 border-2 mt-8">
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

const LocationsForm = ({locations, setLocations, locationsDivRef, locationFormRef}: LocationFormInterface) => {
    return (
        <>
            <div className="w-full text-center">
                <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl"
                    onClick={() => {
                        const newLocation = {
                            name: "",
                            description: "",
                            userFields: []
                        };

                        setLocations(prev => [...prev, newLocation]);
                    }}
                >
                    Ajouter un lieu
                </button>
            </div>

            <div id="locations" ref={locationsDivRef}>
                {locations.map((location: LocationInterface, i: number) => (
                    <div className="w-full border-gray-300 border-2 mt-8">
                        <div className="flex justify-end pt-2 pr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                className="size-6 cursor-pointer"
                                onClick={() => setLocations(prev => prev.filter((val) => prev.indexOf(val) !== i))}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

                                                newUserField[i] = {
                                                    ...newUserField[i],
                                                    userFields: [
                                                        ...newUserField[i].userFields,
                                                        {
                                                            label: inputElement.value,
                                                            value: ""
                                                        }
                                                    ]
                                                };
                                                
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
                                    placeholder="Prénom..."
                                    value={location.name}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setLocations(prev => {
                                            const newLocations = [...prev];
                                            newLocations[i] = {
                                                ...newLocations[i],
                                                name: target.value
                                            };

                                            return newLocations;
                                        });
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="font-semibold text-base">Description</label>
                                <div className="my-1.5" />
                                <input
                                    type="text"
                                    id="locationDescription"
                                    name="description"
                                    className="bg-neutral-secondary-medium border-2 border-gray-400 text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Nom..."
                                    value={location.description}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        setLocations(prev => {
                                            const newLocations = [...prev];
                                            newLocations[i] = {
                                                ...newLocations[i],
                                                description: target.value
                                            };

                                            return newLocations;
                                        });
                                    }}
                                />
                            </div>
                            {location.userFields.map((field: any, fieldI: number) => (
                                <div className="pb-6">
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
                                                    const newUserField = [...prev];
                                                    
                                                    newUserField[i] = {
                                                        ...newUserField[i],
                                                        userFields: newUserField[i].userFields.filter((_, index) => index !== fieldI),
                                                    };
                                                    
                                                    return newUserField;
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

                                                newLocations[i].userFields[fieldI] = {
                                                    ...newLocations[i].userFields[fieldI],
                                                    value: target.value
                                                };

                                                return newLocations;
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
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
                        <div className="text-right mt-16">
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl">Créer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBook