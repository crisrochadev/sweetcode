import Spinner from "@components/Spinner"
import axios from "axios"
import { useState } from "react"

export default function ModalSave({ data, title, text, setHide,changePost }) {
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [message, setMessage] = useState('')
    async function handleSavePost() {
        const response = await axios.post('/api/posts', data).then(res => res.data)
        if (response.id !== null) {
            return response
        }
    }
    function closeFunction(){
        changePost(data);
    }
    async function savePost() {
        setLoading(true)
        setIsloading(true)
        await handleSavePost();
        // console.log(data)
        setMessage('Postagem salva com sucesso!')
        setIsloading(false)
        setTimeout(() => {
            setLoading(false)
            setHide();
        }, 2000)
        closeFunction()

    }
    async function publishPost() {
        if (data.id) {
                data['is_public'] = true
        }
        setLoading(true)
        setIsloading(true)
        const res = await handleSavePost();
        if (!data.id) {
            const id = res.id
            const response = await axios.put('/api/posts?post_id=' + id, { is_public: true }).then(res => res.data)
        }

        setMessage('Postagem publicada com sucesso!')
        setIsloading(false)
        setTimeout(() => {
            setLoading(false)
            setHide();
        }, 2000)
        closeFunction()
    }
    return (
        <div className=" w-11/12 p-4 bg-gray-100 dark:bg-gray-600 z-50 shadow-md">
            <div className="w-full border-b dark:border-gray-600 pb-2 flex justify-between items-center">
                <h2>{title}</h2>
                <button onClick={setHide}><i className="far fa-times"></i></button>
            </div>
            <p className="py-2 my-2">{text}</p>
            <div className="flex justify-end items-center py-2 mt-2">
                <button
                    onClick={savePost}
                    className="bg-fuchsia-500 hover:bg-fuchsia-700 text-gray-100 uppercase text-xs py-2 px-4 mx-2"><i className="far fa-save"></i> Apenas Salvar</button>
                <button
                    onClick={publishPost}
                    className="bg-pink-500 hover:bg-pink-700 text-gray-100 uppercase text-xs py-2 px-4 mx-2"><i className="far fa-upload"></i> Publicar</button>
            </div>
            {loading && <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center" style={{ background: 'rgba(0,0,0,.35)' }}>
                {isLoading
                    ? <Spinner />
                    : (<div className="w-60 h-24 bg-gray-100 p-2 uppercase text-green-500 dark:bg-gray-600 shadow-lg flex flex-col justify-center items-center">
                        <p><i className="far fa-check mr-2"></i>{message}</p>
                        <div style={{ width: '100%' }} className="absolute top-0 h-4 rounded shim-green"></div>
                    </div>)
                }
            </div>}
        </div>
    )
}