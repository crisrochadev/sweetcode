import AsideMenu from "@components/admin/AsideMenu"
import HeaderAdmin from "@components/admin/HeaderAdmin"
import PostSkeleton from "@components/basic/PostSkeleton"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import AdminProvider from "src/contexts/AdminProvider"
import { AuthContext } from "src/contexts/AuthProvider"

export default function AdminLayout({ children }) {
    const [openMenu, setOpenMenu] = useState(false)
    const router = useRouter()
    const { user } = useContext(AuthContext)
    return (
        <AdminProvider>
            {user === null ? <PostSkeleton /> : (
                <section className="md:flex block">
                    {router.pathname.includes('entrar') ? '' : (
                        <AsideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} user={user} />
                    )}
                    <main className={`${openMenu ? 'md:ml-44' : 'md:ml-10 mx-auto'} w-full overflow-auto`} style={{ transition: 'margin .300s ease-in-out ',height:'calc(100vh - 40px)' }}>
                        {user === null ? 'iniciando...' : <HeaderAdmin/>}
                        {children}
                    </main>

                </section>
            )}
        </AdminProvider>
    )
}