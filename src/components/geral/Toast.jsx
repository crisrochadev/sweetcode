import { useEffect, useState } from "react";

export default function Toast({ theme, icon, text, isVisible, setIsVisible }) {
    const [loading, setLoading] = useState(100)
    let themes;
    let icons;
    switch (theme) {
        case 'success':
            themes = 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200'
            icons = icon != undefined ? icon : 'check'
            break;
        case 'alert':
            themes = 'text-orange-500 bg-orange-100 dark:bg-orange-800 dark:text-orange-200'
            icons = icon != undefined ? icon : 'exclamation'
            break;
        case 'danger':
            themes = 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
            icons = icon != undefined ? icon : 'exclamation-triangle'
            break;
        case 'info':
            themes = 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200'
            icons = icon != undefined ? icon : 'info'
            break;
    }


    useEffect(() => {
        setTimeout(() => setIsVisible(false), 3000)
    }, [isVisible])
    return (
        <div>
            {isVisible && <div
                id="toast-success"
                className="absolute z-50 top-1/2  left-1/2 -translate-x-1/2  -translate-y-1/2 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow shadow-gray-800 dark:shadow-gray-500 dark:text-gray-400 dark:bg-gray-800"
                role="alert"
            >
                <div className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8  rounded-lg ${themes}`}>
                    <i className={`far fa-${icons}`}></i>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{text}</div>
                <button
                    type="button"
                    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-success"
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    <i className="far fa-times text-xl"></i>
                </button>
                <div className={`h-2 absolute w-full `}>
                    <div style={{ width: '100%' }} className="absolute top-0 h-4 rounded shim-green"></div>
                </div>
            </div>}
        </div>

    )
}