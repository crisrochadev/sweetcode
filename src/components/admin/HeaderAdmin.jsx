import MenuBar from "@components/geral/MenuBar"
import { useContext } from "react"
import { AdminContext } from "src/contexts/AdminProvider"

export default function HeaderAdmin(){
    const { menu } = useContext(AdminContext)
    return(
        <header className="w-full">
            <MenuBar menu={menu} />
        </header>
    )
}