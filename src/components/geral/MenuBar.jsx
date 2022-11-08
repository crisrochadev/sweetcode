import { useRouter } from "next/router"
import Link from "next/link"
export default function MenuBar({menu}){
    const router = useRouter()
   const pathname = router.query.user_id ? router.pathname.replace('[user_id]',router.query.user_id) : router.pathname
   console.log(pathname)
    return(
        <ul className="flex justify-center items-center  border-b dark:border-gray-600">
        {menu.map((item,index) => (
            <li
                key={item.id}
                className={` h-full py-2 transition-colors dark:border-gray-600 duration-300 hover:text-pink-800 px-4 bg-gray-50 dark:bg-gray-700 -mb-[1px] ${pathname === item.url ? 'border-t border-r border-l text-pink-800' : 'border-b'}`}
                
            >
                <Link 
                    href={item.url}
                    className="h-full"
                >
                    <p
                        className="h-full flex items-center"
                    >
                        <i className={`far fa-${item.icon} mr-2`}></i>
                        <span className="md:flex hidden">{item.label}</span>
                    </p>
                </Link>
            </li>
        ))}
    </ul>
    )
}