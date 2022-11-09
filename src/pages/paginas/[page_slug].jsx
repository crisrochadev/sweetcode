import PostSkeleton from "@components/basic/PostSkeleton"
import { useRouter } from "next/router";
import { useEffect } from "react"

export default function Contact({page}){
    const router = useRouter();
    useEffect(() => {
        if(page === null) router.push('/pesquisar?search='+router.query.page_slug)
    },[])
    return(
        <div>
            {page == null 
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

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Call an external API endpoint to get posts
  
  const res = await fetch('https://sweetcode.com.br/api/pages?arg=slug').then(res => res.json())
  // const slugs = await res.json()
  const slugs = res.slugs
//   console.log(slugs)
  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = slugs.map((slug) => ({
    params: { page_slug: slug },
  }))

// { fallback: false } means other routes should 404
  return { paths, fallback: 'blocking' }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) {
    // console.log(params.page_slug)
    const res = await fetch('https://sweetcode.com.br/api/pages/'+params.page_slug,{method:'GET'}).then(res => res.json())
    const page = res.page ? res.page : null
  
    return {
      // Passed to the page component as props
      props: { page: page },
      revalidate:10
    }
  }