import { createContext, useState } from "react";

export const AdminContext = createContext({})

export default function AdminProvider({children}){
    const [menu,setMenu] = useState([])
    const [currentPosts,setCurrentPosts] = useState([])
    return (
        <AdminContext.Provider value={{menu,setMenu,currentPosts,setCurrentPosts}}>
            {children}
        </AdminContext.Provider>
    )
}