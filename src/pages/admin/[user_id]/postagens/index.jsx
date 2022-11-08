import { useContext, useEffect } from "react"
import { AdminContext } from "src/contexts/AdminProvider"
import { AuthContext } from "src/contexts/AuthProvider"

export default function Posts() {
    const { setMenu } = useContext(AdminContext)
    const { user } = useContext(AuthContext)
   useEffect(() =>  setMenu([
    { id: 1, icon: 'plus', label: 'Nova Postagem', url: '/admin/' + user.id + '/postagens/nova' },
    { id: 2, icon: 'list-alt', label: 'Todas as Postagens', url: '/admin/' + user.id + '/postagens' },
]),[])
    return (
        <section className="p-4">
            Esta página ainda não foi implementada
        </section>
    )
}