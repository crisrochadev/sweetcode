import AsideMenu from "@components/basic/admin/AsideMenu"
import PostSkeleton from "@components/basic/PostSkeleton"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { AuthContext } from "src/contexts/AuthProvider"

export default function AdminLayout({ children }) {
    const [openMenu, setOpenMenu] = useState(false)
    const router = useRouter()
    const { user } = useContext(AuthContext)
    return (
        <>
            {user === null ? <PostSkeleton /> : (
                <section className="md:flex block">
                    {router.pathname.includes('entrar') ? '' : (
                        <AsideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} user={user} />
                    )}
                    <main className={`${openMenu ? 'md:ml-44' : 'md:ml-10 mx-auto'}`} style={{ transition: 'margin .300s ease-in-out' }}>
                        {children}
                    </main>

                </section>
            )}
        </>
    )
}