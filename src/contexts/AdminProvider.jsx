import { createContext, useState } from "react";

export const AdminContext = createContext({})

export default function AdminProvider({children}){
    const [menu,setMenu] = useState([])
    return (
        <AdminContext.Provider value={{menu,setMenu}}>
            {children}
        </AdminContext.Provider>
    )
}