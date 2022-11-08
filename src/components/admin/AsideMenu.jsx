import Image from "next/image"
import Link from "next/link"

export default function AsideMenu({ openMenu, setOpenMenu,user }) {
    const menu = [
        { id: 1, label: 'Painel', icon: 'chart-line', url: `/admin/${user.id}/dashboard` },
        { id: 2, label: 'Postagens', icon: 'newspaper', url: `/admin/${user.id}/postagens` },
        { id: 3, label: 'Categorias', icon: 'folders', url: `/admin/${user.id}/categorias` },
        { id: 4, label: 'Marcadores', icon: 'tags', url: `/admin/${user.id}/marcadores` },
        { id: 5, label: 'Configurações', icon: 'cogs', url: `/admin/${user.id}/configuracoes` },
    ]
    return (
        <div
            className={`${openMenu ? 'md:w-44 w-screen' : 'md:w-10 w-screen'}  md:border-r  fixed dark:border-gray-600 left-0 bottom-0 height-menu-admin  flex md:flex-col md:justify-start  items-center`}
            style={{transition:'width .300s ease-in-out'}}
        >
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="h-10 my-2 hover:text-purple-800 text-pink-700 dark:text-pink-400 dark:hover:text-purple-400 w-full justify-end pr-4 items-center hidden md:flex"
            >
                        <i className={`far fa-${openMenu ? 'chevron-left' : 'chevron-right'} hidden md:block`}></i>
            </button>
            {menu.map(item => (
                <div
                key={item.id}
className="h-10 my-2 w-full"
                >
                    <Link href={item.url} className="hover:text-purple-800 text-pink-700 dark:text-pink-400 dark:hover:text-purple-400  md:w-full h-full flex justify-center  md:justify-start items-center px-2 transition-colors duration-200">
                
                                <button className="">
                                    <i className={`far fa-${item.icon} mr-2`}></i>
                                    <span className={`hidden md:inline-block ${openMenu ? 'visible opacity-100 w-auto' : 'invisible opacity-0 w-0'}`} style={{transition:'width .300s ease-in-out'}}>{item.label}</span>
                                </button>
                    </Link>
                </div>
            ))}
        </div>
    )
}