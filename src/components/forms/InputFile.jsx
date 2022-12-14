import axios from "axios"
import Image from "next/image"
import { useState } from "react"

export default function InputFile({ file, setFile,type }) {
    const [displayFile, setDisplayFile] = useState(file !== '')
    const [element, setElement] = useState(<Image src={file} fill={true} style={{ objectFit: 'cover' }} alt="image-default" />)
    function changeImage(e) {
        const file = e.target.files[0]
        if (file) {
            setDisplayFile(true)
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = function (event) {
                setFile(event.currentTarget.result)
                axios.post('/api/files/'+type, { image: event.currentTarget.result })
                    .then(res => {
                        setFile(res.data.baseurl)
                        setElement(<Image
                            src={res.data.baseurl}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            alt={file.name}
                            sizes="100vw"
                        />)
                    })
                    .catch(err => console.log(err))
            }

        }
    }
    return (
        <div className="w-full md:w-auto border-2 border-gray-400">
            <div className="md:w-[100px] w-full flex justify-center items-center h-[100px] border-2 border-gray-400 border-dashed">
                <div className="text-xs justify-center  w-full  h-full flex items-center uppercase cursor-pointer">
                    <label htmlFor="image_thumb" className="cursor-pointer">
                        {displayFile
                            ? (<div className="relative w-[100px] h-[100px]  flex justify-center items-center">
                                {element}
                            </div>)
                            : (<i className="far fa-image-polaroid text-5xl"></i>)
                        }
                    </label>
                    <input
                        type="file"
                        name="thumb"
                        accept="image/jpg, image/png, image/svg. image/jpeg, image/gif, image/bmp, image/tiff, image/webp"
                        id="image_thumb"
                        className="hidden"
                        onChange={(e) => changeImage(e)}
                    />
                </div>
            </div>
        </div>

    )
}

