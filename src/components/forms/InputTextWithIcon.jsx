export default function InputTextWithIcon({ twoIcon, icon, iconTwo, placeholder, handleButton, handleButtonTwo,value,setValue }) {
    return (
        <div className="flex relative ">

            <input
                type="text"
                id="email-with-icon"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="dark:bg-gray-600  dark:text-gray-300 font-bold  rounded-l-md flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 dark:focus:ring-gray-900 focus:ring-gray-400 focus:border-transparent"
                name="email"
                placeholder={placeholder}
            />
            {twoIcon && (
                <span 
                    onClick={handleButtonTwo}
                    className="inline-flex  items-center px-3 bg-pink-700 hover:bg-pink-900 cursor-pointer text-zinc-100  shadow-sm text-sm">
                    <i className={`far fa-${iconTwo} text-xl`}></i>
                </span>
            )}
            <span 
                onClick={handleButton}
                className="hover:bg-purple-900 cursor-pointer  dark:border-gray-700 text-zinc-100   rounded-r-md inline-flex  items-center px-3 bg-purple-700  shadow-sm text-sm">
                <i className={`far fa-${icon} text-xl`}></i>
            </span>
        </div>

    )
}