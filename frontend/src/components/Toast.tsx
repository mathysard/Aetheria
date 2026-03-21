import { useState, useEffect } from "react";

interface PropsInterface {
    state: "success"|"error"|"warning"|"info";
    text: string;
}

function Toast({state, text}: PropsInterface) {
    if(!["success", "error", "warning", "info"].includes(state)) return;

    const toastBg = {
        success: "oklch(96.2% 0.044 156.743)",
        error: "oklch(93.6% 0.032 17.717)",
        warning: "oklch(95.4% 0.038 75.164)",
        info: "oklch(93.2% 0.032 255.585)"
    };

    const toastTextColor = {
        success: "oklch(44.8% 0.119 151.328)",
        error: "oklch(44.4% 0.177 26.899)",
        warning: "oklch(47% 0.157 37.304)",
        info: "oklch(42.4% 0.199 265.638)"
    };

    const toastSvg = {
        success: (
            <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>
        ),
        error: (
            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                </path>
            </svg>
        ),
        warning: (
            <svg viewBox="0 0 24 24" className="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z">
                </path>
            </svg>
        ),
        info: (
            <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
                </path>
            </svg>
        )
    }

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ backgroundColor: toastBg[state] }} className={`bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg transition-all duration-300 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
            {toastSvg[state]}
            <span style={{ color: toastTextColor[state] }}>{text}</span>
        </div>
    );
}

export default Toast