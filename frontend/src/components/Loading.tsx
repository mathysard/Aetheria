import React from "react";
import Loader from "./Loader";

export function Loading() {
    return (
        <div className="flex justify-center h-screen items-center">
            <div className="text-center">
                <Loader />
                <p className="text-gray-600">Chargement...</p>
            </div>
        </div>
    )
}