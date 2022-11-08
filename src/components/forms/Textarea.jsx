export default function Textarea({value,setValue,placeholder}){
    return(
        <div className="border-2 border-gray-400 dark:border-gray-700 rounded-md h-12">
            <textarea 
                name="text" 
                id="text_id"
                className="w-full h-full bg-transparent resize-none p-2 text-xs focus:outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            ></textarea>
        </div>
    )
}