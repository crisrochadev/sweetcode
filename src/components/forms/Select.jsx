import { useState } from "react"

export default function Select({ options,placeholder,icon ,selected,setSelected,defaultOption}) {
    const [isSelected,setIsSelected ] = useState(null)
    const [ openList, setOpenList ] = useState(false)
    const [displayOption,setDisplayOption] = useState([])
    return (
        <div className="md:w-64 w-full">
            <div className="mt-1 relative">
                <button
                onClick={() => setOpenList(openList ? false : true)}
                    type="button"
                    className="w-full relative bg-white dark:bg-gray-600 rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-gray-800 dark:focus:border-gray-800 sm:text-sm"
                >
                    <span className="flex items-center">
                    <i className={`far fa-${displayOption.icon ? displayOption.icon : defaultOption.icon} text-lg text-gray-800 dark:text-gray-300`}></i>
                        <span className="ml-3 text-gray-600 dark:text-gray-300 uppercase text-xs block truncate">{displayOption.label ? displayOption.label : defaultOption.label}</span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="far fa-caret-down text-lg text-gray-800 dark:text-gray-300"></i>
                    </span>
                </button>
                {openList && (
                    <div className="absolute mt-1 w-full z-10 rounded-md bg-white dark:bg-gray-700 shadow-lg">
                    <ul
                        onBlur={() => setOpenList(false)}
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        className="max-h-56 rounded-md py-1 text-base ring-1 ring-black  ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                        <li
                                onClick={() => {
                                    setIsSelected(isSelected === defaultOption.id ? null : defaultOption.id)
                                    setDisplayOption(selected === defaultOption ? {
                                        icon:icon,
                                        label:placeholder
                                    } : defaultOption )
                                }}
                                id="listbox-item-0"
                                role="option"
                                className="cursor-pointer  text-gray-900 dark:text-gray-300 hover:bg-pink-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                            >
                                <div className="flex items-center">
                                    <i className={`far fa-${defaultOption.icon} text-lg text-gray-800`}></i>

                                    <span className="ml-3 block font-normal truncate uppercase text-xs">{defaultOption.label}</span>
                                </div>
                                {isSelected === defaultOption.id && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <i className={`far fa-check text-lg text-gray-800`}></i>
                                    </span>
                                )}
                            </li>
                        {options.map(option => (
                            <li
                                key={option.id}
                                onClick={() => {
                                    setIsSelected(isSelected === option.id ? null : option.id)
                                    setSelected(selected === option ? {} : option )
                                    setDisplayOption(isSelected === option.id ? defaultOption : option )
                                }}
                                id="listbox-item-0"
                                role="option"
                                className="cursor-pointer  text-gray-900 dark:text-gray-300 hover:bg-pink-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                            >
                                <div className="flex items-center">
                                    <i className={`far fa-${option.icon} text-lg text-gray-800`}></i>

                                    <span className="ml-3 block font-normal truncate uppercase text-xs">{option.label}</span>
                                </div>
                                {isSelected === option.id && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <i className={`far fa-check text-lg text-gray-800`}></i>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>

    )
}