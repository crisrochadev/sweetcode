import PostSkeleton from "@components/basic/PostSkeleton";
import Posts from "@lib/controllers/Posts"
import parse from 'html-react-parser';
import Moment from 'react-moment';
import Link from "next/link";

export default function Post({ post }) {

    // console.log(post)
    return (
        <div className="w-11/12 mx-auto">
            {post === null ? <PostSkeleton /> : <section className="pb-6">
                <header>
                    <div className='flex'>
                        <p className='text-[10px] h-4 flex items-center px-2'><i className="far fa-calendar mr-2 text-pink-500"></i><Moment date={post.date} format="DD/MM/YY HH:mm" /></p>
                        <p className='text-[10px] h-4 flex items-center px-2'><i className="far fa-user mr-2 text-pink-500"></i>{post.author}</p>
                    </div>
                    <h1 className='text-xl font-bold mt-2 uppercase my-4 text-center border-b pb-2 dark:border-gray-600'>{post.title}</h1>
                </header>
                <article>
                    {parse(post.content)}
                    <div className='w-full flex justify-between items-center h-6 mt-4'>
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
                </article>
            </section>}
        </div>
    )
}
export async function getServerSideProps(ctx) {
    const slug = ctx.params.post_slug
    const data = Posts.getPostBySlug(slug)
    const post = (await data).result.post
    return {
        props: {
            post: post
        }
    }
}