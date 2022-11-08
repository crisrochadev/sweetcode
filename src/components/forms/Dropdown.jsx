import React, { useState } from 'react';


const Dropdown = ({ list, addItem, placeholder, findItem, selecteds,restoreList }) => {
    const [isSelected, setIsSelected] = useState(null)

    function addItemInList(e,item){
       if(e.key === 'Enter'){
        if( list.length === 1 ) {
            if(list.some(li => li !== selecteds[0])) addItem(list[0])
            restoreList()
        }
       }
    }
    return (<div id="dropdown" className="absolute shadow top-100 bg-white dark:bg-gray-600 z-40 w-full lef-0 rounded max-h-select overflow-y-auto ">
        <div className="flex flex-col w-full">

            <div className="flex-1 flex justify-center w-full py-1">
                <input onKeyDown={(e) => addItemInList(e)} placeholder={placeholder} className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-[98%]  text-gray-800 border-gray-800 border-2 rounded-md" onChange={(e) => findItem(e.target.value)} />
            </div>
            {list.map((item, key) => {
                return <div key={key}
                    className={`cursor-pointer w-full ${list.length === 1 && list.some(it => it === item) ? 'bg-gray-400 dark:bg-gray-800' : 'dark:bg-gray-600 bg-gray-300'} dark:border-gray-700 border-gray-100 rounded-t border-b hover:bg-pink-600`}
                    onClick={() => {
                        addItem(item)
                        setIsSelected(isSelected === item ? null : item)
                    }}>
                    <div className="flex w-full items-center  text-gray-600 dark:text-gray-300 p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100 uppercase" >
                        <div className="w-full items-center flex">
                            <   div className="mx-2 leading-6  ">
                                <div style={{ background: item.color }} className="text-xs py-1 px-2 rounded-full">
                                    <i className={`far fa-${item.icon}`}></i>
                                    <span className='ml-2'>{item.label}</span>
                                </div>
                                {isSelected === item && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <i className={`far fa-check text-lg text-gray-800`}></i>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>);

};

export default Dropdown;