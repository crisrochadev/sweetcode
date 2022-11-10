import NewPostComponent from "@components/admin/posts/NewPost";

export default function ModalEditPost({post,setOpenModalEdit,changePost}){
    return(
        <section className="p-2 flex justify-center items-center fixed left-0 top-0 z-50 w-full h-full" style={{background:'rgba(0,0,0,.25'}}>
            <div className="w-3/4 h-[90%] bg-gray-100 dark:bg-gray-600  overflow-hidden border-2 relative">
                <div className="w-full h-[40px] flex justify-between items-center px-2 border-b dark:border-gray-600 mb-2">
                    <h2 className="uppercase font-semibold">Editar Postagem</h2>
                    <button 
                    onClick={() => setOpenModalEdit(null)}
                    className="hover:text-pink-600 cursor-pointer text-2xl "><i className="far fa-times cursor-pointer "></i></button>
                </div>
                <div className="w-full overflow-auto" style={{height:'calc(100% - 40px'}}>
                <NewPostComponent post={post} changePost={(arg) => changePost(arg)}/>
                </div>
            </div>
        </section>
    )
}