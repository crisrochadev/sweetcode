import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { AuthContext } from 'src/contexts/AuthProvider'
import ModalAddElements from './editor/ModalAddElements'
import ModalSave from './editor/ModalSave'

const EditorComponent = dynamic(() => import('@components/admin/posts/editor/EditorComponent'), { ssr: false })
export default function NewPostComponent({post,changePost}) {
    const getPost = {
        title: post && post.title ? post.title : '',
        content: post && post.content ? post.content : '',
        thumbnail: post && post.thumbnail ? post.thumbnail : '',
        category:post && post.category ? {
            ...post.category,
            label:post.category.name
        }: {},
        tags: post && post.tags ? post.tags.map(tag => ({
            ...tag,
            label:tag.name
        })) : [],
        date:post && post.date ? post.date : '',
        excerpt:post && post.excerpt ? post.excerpt : '',

    }
    const [editorContent, setEditorContent] = useState(getPost.content)
    const [title, setTitle] = useState(getPost.title)
    const [data, setData] = useState(getPost.date)
    const [outline, setOutline] = useState(null)
    const [openModalSave, setOpenModalSave] = useState(false)
    const [openModalMoreElements, setOpenModalMoreElements] = useState(false)
    const [image, setImage] = useState(getPost.thumbnail);
    const { user } = useContext(AuthContext)

    const [selected, setSelected] = useState(getPost.category)
    const [selectedItems, setSelectedItems] = useState(getPost.tags);
    const [excerpt, setExcerpt] = useState(getPost.excerpt)
    const tags = [
        { icon: 'code', label: 'Códigos', slug: 'codigos', id: '1', color: "#424242" },
        { icon: 'user', label: 'Pessoal', slug: 'pessoal', id: '2', color: "#0c50af" },
        { icon: 'flower', label: 'Flores', slug: 'flores', id: '3', color: "#e01879" },
        { icon: 'star', label: 'Estrelas', slug: 'estrelas', id: '4', color: "#e04d18" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '6', color: "#2c7c13" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '7', color: "#2c7c13" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '8', color: "#2c7c13" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '9', color: "#2c7c13" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '10', color: "#2c7c13" },
        { icon: 'popcorn', label: 'Pipoca Doce', slug: 'pipoca-doce', id: '11', color: "#2c7c13" },
    ]
    const changeContent = (content) => {
        setEditorContent(content)
    }
    const savePost = () => {
        if (title === '') {
            setOutline('title')
            return
        }
        setOutline(null)

        const newData = {
            title: title,
            content: editorContent,
            excerpt: excerpt,
            thumbnail: image,
            tags: selectedItems.map(select => select.id),
            category: selected.id ? selected.id : '',
            author: user.fullName !== undefined ? user.fullName : ''
        }
        if(post) newData['id'] = post.id

        setData(newData)
        setOpenModalSave(true)
    }
    return (
        <div>
            <div className=' font-bold w-full'>
                <div className='flex  items-center justify-end h-12 w-full relative'>
                    <button
                        onClick={() => setOpenModalMoreElements(!openModalMoreElements)}
                        className='w-24 mx-1 bg-fuchsia-600 hover:bg-fuchsia-800 h-12 text-gray-100  text-lg'>
                        <i className="far fa-chevron-circle-down"></i>
                    </button>
                    {openModalMoreElements && (
                        <ModalAddElements
                            setImage={setImage}
                            setSelected={setSelected}
                            setSelectedItems={setSelectedItems}
                            setExcerpt={setExcerpt}
                            image={image}
                            tags={tags}
                            selected={selected}
                            selectedItems={selectedItems}
                            excerpt={excerpt}
                            setHide={() => setOpenModalMoreElements(false)}
                        />
                    )}
                    <button
                        className='w-24 mx-1 bg-pink-600 hover:bg-pink-800 h-12 text-gray-100  text-lg'
                        onClick={savePost}
                    >
                        <i className="far fa-save"></i>
                    </button>
                    {openModalSave && <div className='w-full h-full fixed z-50  top-0 left-0 flex justify-center items-center' style={{ background: 'rgba(0,0,0,.25)' }}>
                        <ModalSave data={data}
                        changePost={(arg) => changePost(arg)}
                            setHide={() => setOpenModalSave(false)}
                            title="Salvar a Postagem"
                            text="Você deseja publicar essa postagem agora? Se preferir pode publicar depois no menu, todas as postagens."
                        />
                    </div>}
                </div>
                <input
                    type="text"
                    placeholder='Titulo'
                    onChange={(e) => {
                        setOutline(null)
                        setTitle(e.target.value)
                    }}
                    value={title}
                    className={`${outline === 'title' ? 'outline outline-red-700' : ''} border px-2 h-12 my-2 dark:border-text-600 w-full bg-transparent focus:outline-none`}
                />
            </div>
            <div className='pb-24'>
                <EditorComponent changeContent={changeContent} content={editorContent} />
            </div>
        </div>
    )
}