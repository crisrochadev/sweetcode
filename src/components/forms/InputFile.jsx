import Image from "next/image"
import { useState } from "react"

export default function InputFile({ file, setFile }) {
    const [displayFile, setDisplayFile] = useState(false)
    const [element, setElement] = useState(null)
    function changeImage(e) {
        const file = e.target.files[0]
        if(file){
            setDisplayFile(true)
            const reader = new FileReader()
            reader.readAsDataURL(file)
    
            reader.onload = function (event) {
                setFile(event.currentTarget.result)
                setElement(<Image
                    src={event.currentTarget.result}
                    width="90"
                    height="90"
                    style={{ objectFit: 'cover',width: '100%', height: 'auto'  }}
                    alt={file.name}
                    sizes="100vw"
                />)
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

