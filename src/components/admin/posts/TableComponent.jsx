import Image from "next/image"
import Spinner from "@components/Spinner"
import { useState } from "react"
import Link from "next/link"
const f = [
    { id: 1, label: 'Não Publicados', icon: 'download' },
    { id: 2, label: 'Publicados', icon: 'upload' },
    { id: 3, label: 'Visualizações', icon: 'eyes' },
]
const title = "Postagens"
const menu = [
    { id: 1, label: 'Não Publicados', icon: 'download' },
    { id: 2, label: 'Publicados', icon: 'upload' },
    { id: 3, label: 'Visualizações', icon: 'eyes' },
]
const buttonAction = {
    label: 'Nova',
    icon: 'plus',
    action: () => { alert('Nova') }
}
export default function TableComponent({
    data,
    handleClick,
    loading,
    id
}) {
    const [filtered, setFiltered] = useState(f[0])
    const [filters, setFilters] = useState(f)
    const [openFilters, setOpenFilters] = useState(false)
    const cols_length = data.length > 0 ?  (Object.keys(data[0]).length - 1) + Object.keys(data[0].actions).length : 0



    return (
        <>
            <div className="sm:px-6 w-full">
                {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p
                            tabIndex={0}
                            className="uppercase focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-pink-700"
                        >
                            {title}
                        </p>
                        {/* Filtro */}
                        <div
                            onClick={() => setOpenFilters(!openFilters)}
                            className="group py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-300 cursor-pointer rounded relative">
                            <p>Filtrar por:</p>
                            <p className="ml-2">{filtered.label}</p>
                            {openFilters && <div
                                aria-label="select"
                                className={` focus:text-indigo-600 focus:outline-none bg-gray-100 dark:bg-gray-600 z-50 w-full -left-1 ml-1 absolute top-full`}
                            >
                                {filters.map(filter => (
                                    <p
                                        onClick={() => {
                                            setFiltered(filter)
                                            setOpenFilters(false)
                                        }}
                                        key={filter.id}
                                        className="text-sm text-pink-800 dark:text-pink-200 dark:hover:bg-gray-700 p-2 hover:bg-gray-300 ">{filter.label}</p>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-600 py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex md:items-center md:flex-row flex-col">
                            {menu.map((item, index) => (
                                <button
                                    key={index}
                                    className="md:my-0 my-2  focus:outline-none focus:ring-2 mx-1 focus:bg-indigo-50 focus:ring-pink-800"
                                >
                                    <div className="py-2 px-8 bg-pink-100 dark:bg-pink-600 text-pink-700 dark:text-pink-100 ">
                                        <p>{item.label}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <Link
                            href={`/admin/${id}/postagens/nova`}
                            // onclick="popuphandler(true)"
                            className="focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 mt-4 sm:mt-0 flex md:inline-flex items-start md:justify-start justify-center px-6 py-3 bg-pink-700 hover:bg-pink-600 focus:outline-none"
                        >
                            <p className="text-sm font-medium leading-none text-white">
                                <i className={`far fa-${buttonAction.icon} mr-2`}></i>
                                <span>{buttonAction.label}</span>
                            </p>
                        </Link>
                    </div>
                    <div className="mt-7 overflow-x-auto">
                        <div className="w-full whitespace-nowrap">
                            {data.length > 0 ? (
                                <div className="border-gray-400 border">
                                    {data.map((row, index) => (
                                        <div
                                            key={index}
                                            data-row
                                            className={`flex justify-between items-center border-b border-gray-400 px-2 py-1 h-10`}
                                        >
                                            {loading === row.id && <div className="absolute z-50 w-full h-full flex justify-center items-center bg-red-50 bg-opacity-25">
                                                <Spinner />
                                            </div>}
                                            <div data-col className="">
                                                <input type="checkbox" />
                                            </div>
                                            {row.image && (
                                                <div
                                                    data-col
                                                    className="flex justify-center items-center"
                                                >
                                                    <div className="w-[20px] h-[20px] relative">
                                                        <Image
                                                            src={row.image}
                                                            alt={row.title}
                                                            fill={true}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {Object.keys(row).map((column, i) => (
                                                column !== 'actions' ? (
                                                    (column !== 'id' && column !== 'image') && (
                                                        <div
                                                            data-col
                                                            key={i}
                                                            className="flex-1"
                                                        >
                                                            {row[column]}
                                                        </div>
                                                    )
                                                ) : (
                                                    row[column].map(action => (
                                                        <div
                                                            key={action.id}
                                                            data-col
                                                        >
                                                            {action.icon ? (
                                                                <button
                                                                    onClick={() => handleClick(action.title, row)}
                                                                >
                                                                    <i className={`far fa-${action.icon}`}></i>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleClick(action.title, row)}
                                                                >
                                                                    <p>{action.title}</p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))
                                                )
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )
                        :(
                            <div className="px-2 flex flex-col justify-center items-center">
                                <p>Ooops, nada aqui ainda...</p>
                                <Link href={`/admin/${id}/postagens/nova`} className="bg-pink-700 mt-4 hover:bg-pink-800 justify-center h-8 uppercase text-[12px] text-gray-100 flex items-center w-40">Comece a escrever</Link>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: ".checkbox:checked + .check-icon {\n  display: flex;\n}\n"
                }}
            />
        </>

    )
}