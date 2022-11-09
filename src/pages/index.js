import PostSkeleton from '@components/basic/PostSkeleton';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';
import Moment from 'react-moment';

export default function Home({ posts }) {
  return (
    <div className='w-[90%] mx-auto'>
      {posts === null ? <PostSkeleton/> :
      (<section
        className='md:flex flex-wrap gap-4 my-4 block'
      >

        {posts.map(post => (
          <article
            className='w-[100%] shadow-md md:h-[300px] md:flex justify-between items-center p-1'
            key={post.id}
          >
            <div className='w-[280px] h-[280px] flex justify-center items-center relative  mx-auto'>
              <Image
                src={`${post.thumbnail !== '' ? post.thumbnail : '/images/image-default.png'}`}
                width="300"
                height="300"
                alt={post.title}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-2 flex flex-col justify-between items-start h-full excerpt-mode">
              <header className='w-full uppercase'>
                <div className='flex'>
                  <p className='text-[10px] h-4 flex items-center px-2'><i className="far fa-calendar mr-2 text-pink-500"></i><Moment date={post.date} format="DD/MM/YY HH:mm" /></p>
                  <p className='text-[10px] h-4 flex items-center px-2'><i className="far fa-user mr-2 text-pink-500"></i>{post.author}</p>
                </div>
                <h1 className='text-xl font-bold mt-2'>{post.title}</h1>
              </header>
              <div>
                <p>{post.excerpt}</p>
              </div>
              <div className='flex justify-end w-full my-2'>
                <Link href={`/postagens/${post.slug}`}><p className='uppercase text-md font-bold hover:underline'><span>Veja Mais</span><i className="far fa-long-arrow-right ml-2"></i></p></Link>
              </div>
              <div className='w-full flex justify-between items-center h-6'>
                {post.tags.length > 0 && (
                  <div className='flex text-[10px] h-full '>
                    <span className=' text-[10px] bg-pink-500 flex justify-center items-center w-6 h-6'><i className='far fa-tags'></i></span>
                    {post.tags.map(tag => (
                      <Link href={`/marcadores/${tag.slug}`} className='h-full flex items-center'>
                        <p style={{ color: tag.color, background: tag.bg }} className="mx-1 flex h-6 px-2 items-center"><i className={`far fa-${tag.icon} mr-1`}></i> <span>{tag.name}</span></p>
                      </Link>
                    ))}
                  </div>
                )}
                {post.category.name && (
                  <div className='flex text-[10px] h-full  items-center pr-2'>
                    <span className=' text-[10px] bg-pink-500 flex justify-center items-center w-6 h-6 mr-2'><i className='far fa-folders'></i></span>
                    <Link href={`/categorias/${post.category.slug}`}>
                      <p className='text-[10px] h-6 flex items-center px-2' style={{ color: post.category.color, background: post.category.bg }}><i className={`far fa-${post.category.icon} mr-1`}></i><span>{post.category.name}</span></p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>)}
    </div>
  )
}
// export async function getStaticPaths() {
//   // When this is true (in preview environments) don't
//   // prerender any static pages
//   // (faster builds, but slower initial page load)
//   if (process.env.SKIP_BUILD_STATIC_GENERATION) {
//     return {
//       paths: [],
//       fallback: 'blocking',
//     }
//   }

//   // Call an external API endpoint to get posts
  

//   // const slugs = await res.json()
//   const slugs = ['hahaha','tdskdjdhfkdsjf']
//   // Get the paths we want to prerender based on posts
//   // In production environments, prerender all pages
//   // (slower builds, but faster initial page load)
//   const paths = slugs.map((slug) => ({
//     params: { id: slug },
//   }))

// // { fallback: false } means other routes should 404
//   return { paths, fallback: false }
// }

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/posts').then(res => res.json())
  // console.log(res)
  const posts = res.posts ? res.posts.reverse()  : null;

  return {
    // Passed to the page component as props
    props: { posts: posts},
  }
}
