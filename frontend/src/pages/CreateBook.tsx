import React, { useState } from 'react'
import Navbar from "../components/Navbar"

function CreateBook() {
    const [activeScreen, setActiveScreen] = useState<"book"|"characters"|"relations"|"locations"|"chapters">("book");
    return (
        <>
            <Navbar />
            <div className="mt-16 ml-24">
                <div className="flex">
                    <div className="bg-gray-400 w-[20%] h-120 hover:bg-gray-500 cursor-pointer active:bg-gray-600">
                        <div className="w-full h-full flex justify-center items-center">
                            <svg width="25%" height="25%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 5L19 8M19 8L22 5M19 8V2M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

                                <div className="text-right mt-16">
                                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 hover:cursor-pointer active:bg-blue-900 shadow-xl">Créer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBook