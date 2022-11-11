import { useContext, useEffect, useState } from "react"
import { AdminContext } from "src/contexts/AdminProvider"
import { AuthContext } from "src/contexts/AuthProvider"
import Posts from '@lib/controllers/Posts';
import Router, { useRouter } from "next/router";
import ModalEditPost from "@components/admin/posts/ModalEditPost";
import Modal from "@components/geral/Modal";
import TableComponent from "@components/admin/posts/TableComponent";
import Toast from "@components/geral/Toast";
import axios from "axios";

export default function GetPosts({ posts }) {
    const newPosts = posts.map(post => ({
        id:post.id,
        image:post.thumbnail,
        title:post.title,
        actions: post.is_public ?  [
            { id: 1, title: 'editar', icon: 'pen', },
            { id: 3, title: 'remover publicação', icon: 'download', },
            { id: 4, title: 'deletar', icon: 'trash' },
        ] :  [
            { id: 1, title: 'editar', icon: 'pen', },
            { id: 2, title: 'publicar', icon: 'upload', },
            { id: 4, title: 'deletar', icon: 'trash' },
        ]
    }))

    const { setMenu , currentPosts,setCurrentPosts} = useContext(AdminContext)
    const [path, setPath] = useState('')
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
    const [text,setText] = useState(false)
    const [icon,setIcon] = useState(false)
    const [theme,setTheme] = useState(false)
    const [postEdit, setPostEdit] = useState(null)
    const [loading, setLoading] = useState(null)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState(null)
    const [id, setId] = useState(null)
    const { user } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if(currentPosts.length === 0 ) setCurrentPosts(newPosts)
        setMenu([
            { id: 1, icon: 'plus', label: 'Nova Postagem', url: '/admin/' + user.id + '/postagens/nova' },
            { id: 2, icon: 'list-alt', label: 'Todas as Postagens', url: '/admin/' + user.id + '/postagens' },
        ])
        if (typeof window !== undefined) {
            setPath(window.location.host)
            console.log(window.location.protocol + "//" + window.location.host)
        }
    }, [])
    async function editPost(post) {
        setOpenModalEdit(true)
        setPostEdit(post)
    }
    async function publishPost(id, arg) {
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
    async function changePost(newPost) {
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
    function openAlert(row){
        setTitle(row.title)
        setId(row.id)
        setAlert(true)
        
    }
    async function deletePost(id) {
        setAlert(null)
        setLoading(id)
        const response = await axios.delete('/api/posts?post_id=' + id).then(res => res.data)
        const newPosts = currentPosts.filter(item => item.id !== id)
        setCurrentPosts(newPosts)
        setLoading(null)
        setText('Postagem deletada!')
        setIcon('check')
        setTheme('success')
        setIsVisible(true)
    }


    function handleClick(action,row){
        console.log(action)
        switch(action){
            case 'editar':
                console.log('clicked')
                editPost(row)
            break;
            case 'publicar':
                publishPost(row.id,'add')
            break;
            case 'remover publicação':
                publishPost(row.id,'remove')
            break;
            case 'deletar':
                openAlert(row)
            break;
        }
    }


    return (
        <section className="p-4">
            <TableComponent
                data={currentPosts}
                changePost={changePost}
                handleClick={(action,row) => handleClick(action,row)}
                loading={loading}
                id={user.id}
            />
            {openModalEdit && <ModalEditPost changePost={(arg) => changePost(arg)} setOpenModalEdit={setOpenModalEdit} post={postEdit} />}
            {/* {loading === post.id && <div className="absolute z-50 w-full h-full flex justify-center items-center bg-red-50 bg-opacity-25">
                <Spinner />
            </div>}*/}
            {alert  && <Modal title={title} setAlert={setAlert} confirm={() => deletePost(id)} />} 
            <Toast theme={theme} icon={icon} text={text} isVisible={isVisible} setIsVisible={setIsVisible} />
        </section>
    )
}

export async function getServerSideProps(ctx) {
    const data = Posts.getPostsAdmin()
    const posts = (await data).result.posts
    return {
        props: {
            posts: posts
        }
    }
}