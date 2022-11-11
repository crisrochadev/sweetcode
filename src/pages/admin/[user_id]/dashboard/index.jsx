import { useContext, useEffect } from "react"
import { AdminContext } from "src/contexts/AdminProvider"
import { AuthContext } from "src/contexts/AuthProvider"
export default function Dashboard() {
    const { setMenu } = useContext(AdminContext)
    const { user } = useContext(AuthContext)
    useEffect(() => setMenu([
        { id: 1, icon: 'tachometer-alt-slow', label: 'Dashboard', url: '/admin/' + user.id + '/dashboard' },
        { id: 2, icon: 'eye', label: 'Visualizações', url: '/admin/' + user.id + '/dashboard/visualizacoes' },
        { id: 3, icon: 'comments', label: 'Comentários', url: '/admin/' + user.id + '/dashboard/comentarios' },
    ]),[])
    return (
        <section className="p-4">
            Esta página ainda não foi implementada
        </section>
    )
}