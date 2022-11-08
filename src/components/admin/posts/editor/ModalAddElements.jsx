import InputFile from "@components/forms/InputFile";
import Multiselect from "@components/forms/MultiSelect";
import Select from "@components/forms/Select";
import Textarea from "@components/forms/Textarea";
import { useState } from "react";


export default function ModalAddElements({
    setImage,
    setSelected,
    setSelectedItems,
    setExcerpt,
    image,
    tags,
    selected,
    selectedItems,
    excerpt,
    title,
    setHide
}) {
    const [visible, setVisible] = useState(false)
    const [visibleToast, setVisibleToast] = useState(false)
    return (
        <div className="absolute w-11/12 right-3 p-2 bg-gray-100 z-50 top-14 shadow-md">
            <div className="w-full border-b dark:border-gray-600 pb-2 flex justify-between items-center">
                <h2>{title}</h2>
                <button onClick={setHide}><i className="far fa-times"></i></button>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap justify-between items-center md:h-[130px] h-[330px] mb-2 gap-2 '>
                <InputFile
                    file={image}
                    setFile={setImage}
                />
                <div className='w-full h-[50%] md:h-full flex flex-col justify-center'>
                    <div className='flex  flex-wrap md:flex-nowrap justify-between items-center md:h-12 h-26 mb-2 gap-2 w-full'>
                        <div className='mb-1 w-full md:w-auto'>
                            <Select
                                options={tags}
                                placeholder={selected.label}
                                icon={selected.icon}
                                selected={selected}
                                setSelected={setSelected}
                                defaultOption={{
                                    icon: 'tags',
                                    label: "Selecione a Categoria"
                                }}
                            />
                        </div>
                        <div className='w-full '>
                            <Multiselect
                                options={tags}
                                placehoder="Selecione os Marcadores"
                                icon="folders"
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                            />
                        </div>
                    </div>
                    <Textarea
                        value={excerpt}
                        setValue={setExcerpt}
                        placeholder="Defina um resumo..."
                    />
                </div>
            </div>
        </div>
    )
}