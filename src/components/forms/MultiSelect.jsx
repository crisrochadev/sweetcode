import React, { useRef, useState } from 'react';
import Dropdown from './Dropdown';


const Multiselect = ({ options, placeholder, icon, selectedItems, setSelectedItems }) => {
    // state showing if dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);
    const [openViewList, setOpenViewList] = useState(false);
    const [iconView, setIconView] = useState(icon)
    const [items, setItems] = useState(options)

    const [showItems, setShowItems] = useState(selectedItems)
    const [showCount, setShowCount] = useState(false)
    const [count, setCount] = useState(0)
    const itemsRef = useRef(null)
    const inputRef = useRef(null)
    console.log(selectedItems)
    const restoreList = () => {
        setItems(options)
    }
    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    // adds new item to multiselect
    const findItem = (value) => {

        const itemsPush = items.filter(item => {
            if (item.label.toLowerCase().includes(value.toLowerCase())) return item
        })
        setItems(value !== '' ? itemsPush : options)

    }

    const addTag = (item) => {
        console.log(itemsRef.current.offsetWidth)
        if (itemsRef.current.offsetWidth > inputRef.current.offsetWidth - 120) {
            setShowCount(true)
            setCount(count + 1)
        } else {
            let itemExists = showItems.some(it => it === item)
            if (!itemExists) setShowItems([...showItems, item])
        }
        console.log(inputRef.current.offsetWidth)
        let selectedExists = selectedItems.some(it => it === item)
        if (!selectedExists) setSelectedItems([...selectedItems, item]);
        setDropdown(false);
    };
    // removes item from multiselect
    const removeTag = (item) => {
        const filtered = selectedItems.filter((e) => e !== item);
        setSelectedItems(filtered);
        setShowItems(filtered)
    }

    return (<div className="autcomplete-wrapper w-full relative">
        {openViewList && <div className='absolute  h-52 w-52 rounded-lg dark:bg-gray-700 shadow-md dark:shadow-gray-400 top-full left-0 z-50 bg-gray-300 overflow-hidden py-2'>
            <div className='w-full h-8 flex justify-between items-center px-2'>
                <h1 className='uppercase text-xs font-bold text-gray-600 dark:text-gray-300 '>Items selecionados</h1>
                <button onClick={() => {
                    setOpenViewList(false)
                    setIconView(iconView === icon ? 'eye' : icon)
                }}>
                    <i className='far fa-times'></i>
                </button>
            </div>
            <div className='overflow-auto h-full pb-6'>
                {selectedItems.map(item =>
                (
                    <li key={item.id} className="px-2 list-none w-11/12 my-2 rounded-full h-8 flex justify-between items-center mx-auto" style={{ background: item.color }}>
                        <div>
                            <i className={`far fa-${item.icon} mr-2`}></i>

                            <span className='text-xs uppercase'>{item.label}</span>
                        </div>
                        <div onClick={() => removeTag(item)}>
                            <i className='far fa-times ml-2'></i>
                        </div>
                    </li>
                )
                )
                }
            </div>
        </div>}
        <div className="autcomplete w-full">

            <div className="w-full flex flex-col items-center mx-auto">
                <div className="w-full relative">
                    <div className="flex flex-col items-center relative">
                        <div className="w-full ">
                            <div className="my-2 h-10 flex justify-start border cursor-pointer border-gray-200 bg-white rounded dark:bg-gray-600 dark:border-gray-700 w-full"  >
                                <div
                                    className='h-full px-2 cursor-pointer flex justify-center items-center '
                                    onClick={() => {
                                        setOpenViewList(openViewList ? false : true)
                                        setIconView(iconView === icon ? 'eye' : icon)
                                    }}
                                >

                                    <i className={`far fa-${iconView} text-gray-600 dark:text-gray-300 text-lg`}></i>
                                </div>
                                <div onClick={toogleDropdown} className="flex w-full  justify-start" ref={inputRef}>
                                    <div className="flex flex-nowrap h-full w-auto " ref={itemsRef}>
                                        {
                                            showItems.map((tag, index) => {
                                                return (
                                                    <div key={index} className="flex shrink-0 justify-center items-center m-1 uppercase font-medium py-1 text-xs px-2 dark:bg-gray-600 rounded-full text-gray-200" style={{ background: tag.color }}>
                                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                                            <i className={`far fa-${tag.icon}`}></i>
                                                            <span className='ml-2'>{tag.label}</span>
                                                        </div>
                                                        <div className="flex flex-auto flex-row-reverse">
                                                            <div onClick={() => removeTag(tag)}>
                                                                <i className='far fa-times ml-2'></i>
                                                            </div>
                                                        </div>
                                                    </div>)
                                            })
                                        }
                                        {showCount && (
                                            <div className="flex shrink-0 justify-center items-center m-1 uppercase font-medium py-1 px-4 dark:bg-gray-900 rounded-full text-gray-200" >
                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                                    <i className={`far fa-plus`}></i>
                                                    <span className='ml-2'>{count}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div onClick={toogleDropdown} className="text-gray-300 w-8 cursor-pointer py-1 pl-2 pr-1 border-l flex items-center border-gray-200 absolute right-0 top-1/2 -translate-y-1/2" >
                                    <button className="cursor-pointer w-6 h-6 text-gray-600 dark:text-gray-300 outline-none focus:outline-none">
                                        <i className='far fa-caret-down'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {dropdown ? <Dropdown restoreList={restoreList} selecteds={selectedItems} findItem={findItem} placheholder={placeholder} list={items} addItem={addTag}></Dropdown> : null}
                </div>
            </div>
        </div>
    </div>
    )
};

export default Multiselect;