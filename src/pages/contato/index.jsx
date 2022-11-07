import PostSkeleton from "@components/basic/PostSkeleton"
import Pages from "@lib/controllers/Pages"

export default function Contact({page}){
    return(
        <div>
            {page == undefined 
                ? <PostSkeleton/>
                : (
                    <section className="w-11/12 mx-auto">
                        <header className="w-full border-b dark:border-gray-600 py-4 uppercase font-bold">
                            <h1>{page.title}</h1>
                        </header>
                        <article>
                            {page.content}
                        </article>
                    </section>
                )
            }
        </div>
    )
}

export async function getServerSideProps(ctx){
    const slug = ctx.resolvedUrl.replace('/','')
    const data = await Pages.getPageBySlug(slug)
    return{
        props:{
            page:data.result.page
        }
    }
}