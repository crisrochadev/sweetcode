import { useContext, useEffect, useState } from "react"
import { AdminContext } from "src/contexts/AdminProvider"
import { AuthContext } from "src/contexts/AuthProvider"
import Posts from '@lib/controllers/Posts';
import PostSkeleton from "@components/basic/PostSkeleton";
import Users from "@lib/controllers/Users";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import ModalEditPost from "@components/admin/posts/ModalEditPost";
import axios from "axios";
import Spinner from "@components/Spinner";
import Modal from "@components/geral/Modal";

export default function GetPosts({ posts }) {
    const { setMenu } = useContext(AdminContext)
    const [path,setPath] = useState('')
    const [openModalEdit, setOpenModalEdit] = useState(null)
    const [postEdit, setPostEdit] = useState(null)
    const [loading, setLoading] = useState(null)
    const [alert, setAlert] = useState(null)
    const [title, setTitle] = useState(null)
    const [currentPosts, setCurrentPosts] = useState(posts)
    const { user } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        setMenu([
            { id: 1, icon: 'plus', label: 'Nova Postagem', url: '/admin/' + user.id + '/postagens/nova' },
            { id: 2, icon: 'list-alt', label: 'Todas as Postagens', url: '/admin/' + user.id + '/postagens' },
        ])
        if(typeof window !== undefined) {
            setPath(window.location.host)
            console.log(window.location.protocol + "//" + window.location.host)
        }
    }, [])
    async function editPost(post){
        setOpenModalEdit(post.id)
        setPostEdit(post)
    }
    async function publishPost(id,arg) {
        const isPublic = arg === 'add' ? true : false
        setLoading(id)
        const response = await axios.put('/api/posts?post_id=' + id, { is_public: isPublic }).then(res => res.data)
        const newPosts = currentPosts.map(item => {
            const p = item
            if (item.id === response) p['is_public'] = isPublic
            return p
        })
        setCurrentPosts(newPosts)
        setLoading(null)
    }
    async function changePost(newPost){
        const newPosts = currentPosts.map(item => {
            const p = item
            if (item.id === openModalEdit) {
                Object.keys(item).forEach(key => {
                    item[key] = newPost[key]
                })
            }
            return p
        })
        setCurrentPosts(newPosts)
        setOpenModalEdit(null)
    }
    async function deletePost(id) {
        setLoading(id)
        const response = await axios.delete('/api/posts?post_id=' + id).then(res => res.data)
        const newPosts = currentPosts.filter(item => item.id !== id)
        setCurrentPosts(newPosts)
        setLoading(null)
    }
    return (
        <section className="p-4">
            {posts === null ? <PostSkeleton /> : (
                <div className="w-full flex flex-wrap justify-center items-between gap-4">
                    {currentPosts.map((post) => (
                        <div key={post.id}
                            className="w-[250px] h-[250px] shadow-md flex flex-col justify-around items-center gap-2 relative"
                        >
                            <div className="w-full h-[180px] relative">
                                <Image
                                    fill={true}
                                    style={{ objectFit: "cover" }}
                                    alt={post.title}
                                    src={post.thumbnail ? post.thumbnail : '/images/image-default.png'}
                                />
                            </div>
                            <div className="w-[95%] mx-auto">
                                <h2 className={`${post.is_public ? 'text-gray-700 dark:text-gray-100' : 'text-gray-400 dark:text-gray-400'} uppercase font-bold w-full text-xs my-2`}>{post.title}</h2>
                                <p>{post.is_public}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        {!post.is_public && <p className="text-[12px] text-gray-400">Postagem não publicada...</p>}
                                    </div>
                                    <div className="flex justify-end items-center gap-4 my-2 ">

                                        {post.is_public && <button onClick={() => publishPost(post.id, 'remover')} className="relative group hover:text-pink-600">
                                            <p className="text-[10px]  invisible group-hover:visible uppercase py-1 px-2 absolute bottom-full dark:bg-gray-600 bg-gray-100 shadow-sm -left-4">Remover publicação</p>
                                            <i className="far fa-download"></i>
                                        </button>}
                                        {!post.is_public && <button onClick={() => publishPost(post.id, 'add')} className="relative group hover:text-pink-600">
                                            <p className="text-[10px]  invisible group-hover:visible uppercase py-1 px-2 absolute bottom-full dark:bg-gray-600 bg-gray-100 shadow-sm -left-4">Publicar</p>
                                            <i className="far fa-upload"></i>
                                        </button>}
                                        <a href={`${path}/postagens/${post.slug}`} target="_blank" className="relative group hover:text-pink-600 ">
                                            <p className="text-[10px]  invisible group-hover:visible uppercase py-1 px-2 absolute bottom-full dark:bg-gray-600 bg-gray-100 shadow-sm -left-4">Visualizar</p>
                                            <i className="far fa-eye"></i>
                                        </a>
                                        <button
                                            onClick={() => editPost(post)}
                                            className="relative group hover:text-pink-600">
                                            <p className="text-[10px]  invisible group-hover:visible uppercase py-1 px-2 absolute bottom-full dark:bg-gray-600 bg-gray-100 shadow-sm -left-4">Editar</p>
                                            <i className="far fa-pen"></i>
                                        </button>
                                        <button 
                                        onClick={() => {
                                            setTitle(post.title)
                                            setAlert(post.id)
                                        }}
                                        className="relative group hover:text-pink-600">
                                            <p className="text-[10px]  invisible group-hover:visible uppercase py-1 px-2 absolute bottom-full dark:bg-gray-600 bg-gray-100 shadow-sm -left-4">Excluir</p>
                                            <i className="far fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {openModalEdit === post.id && <ModalEditPost changePost={(arg) => changePost(arg)} setOpenModalEdit={setOpenModalEdit} post={postEdit} />}
                            {loading === post.id && <div className="absolute z-50 w-full h-full flex justify-center items-center bg-red-50 bg-opacity-25">
                                <Spinner />
                            </div>}
                            {alert === post.id && <Modal title={title} setAlert={setAlert} confirm={() => deletePost(alert)} />}
                        </div>
                    ))}
                </div>
            )}
        </section>
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

    const res = await Users.getIdUseers();
    // console.log(res)
    const users = res.result.ids
    // console.log(slugs)

    //   console.log(slugs)
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = users.map((user) => ({
        params: { user_id: user },
    }))

    // { fallback: false } means other routes should 404
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps() {
    const data = await Posts.getPostsAdmin()
    const posts = data.result.posts ? data.result.posts.reverse() : null
    return {
        props: {
            posts: posts
        }
    }
}
