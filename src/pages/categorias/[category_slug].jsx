import PostSkeleton from '@components/basic/PostSkeleton';
import Posts from '@lib/controllers/Posts'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';
import Moment from 'react-moment';

export default function Home({ posts,category }) {
    return (
        <div className='w-[90%] mx-auto'>
            <h2 className='w-full flex justify-center items-center uppercase text-xs'>
                <p>Todas as postagens com a categoria </p> 
                <p style={{color:category.color, background:category.bg}} className="py-1 px-2 text-[10px] ml-2">
                    <i className={`far fa-${category.icon} mr-2`}></i>
                    <span>{category.name}</span>
                </p></h2>
            {posts === null
                ? <PostSkeleton />
                : <section
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
                </section>
            }
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { category_slug } = ctx.params
    const data = await Posts.getPostsByCategory(category_slug)
    return {
        props: {
            posts:data.result.posts,
            category:data.result.category
        }
    }
}