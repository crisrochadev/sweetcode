import Footer from "@components/basic/Footer"
import Header from "@components/basic/Header"
export default function PublicLayot({ children }) {

    return (
        <>
            <Header />
            <section className="w-full overflow-auto flex flex-col justify-between" style={{ height: 'calc(100% - 40px)' }}>
                <main className="w-full">
                    {children}
                </main>
                <Footer />
            </section>
        </>
    )
}