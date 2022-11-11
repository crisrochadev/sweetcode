import NewPostComponent from "@components/admin/posts/NewPost";
import { useContext } from "react";
import { AdminContext } from "src/contexts/AdminProvider";
export default function NewPost() {
    const { setCurrentPosts, currentPosts } = useContext(AdminContext)
    function changePost(post) {
        setCurrentPosts([...currentPosts, {
            id: post.id,
            image: post.thumbnail,
            title: post.title,
            actions: post.is_public ?  [
                { id: 1, title: 'editar', icon: 'pen', },
                { id: 3, title: 'remover publicação', icon: 'download', },
                { id: 4, title: 'deletar', icon: 'trash' },
            ] :  [
                { id: 1, title: 'editar', icon: 'pen', },
                { id: 2, title: 'publicar', icon: 'upload', },
                { id: 4, title: 'deletar', icon: 'trash' },
            ]
        }])
    }
    return (
        <section className="p-2 h-full">
            <NewPostComponent changePost={(arg) => changePost(arg)} />
        </section>
    )
}