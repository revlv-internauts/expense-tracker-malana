import gallery from "@/routes/gallery";
import { useForm } from "@inertiajs/react";
import React from "react";

interface AddFormProps {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const AddGallery = ({setIsAddOpen}: AddFormProps) => {
    const {data, setData, post, processing, errors} = useForm({
        image_name: "",
        image: null as File | null,
    })
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data)
        console.log(data.image)
        post(gallery.store.url(), {
            onSuccess: () => setIsAddOpen(false)
        })

    }

    return(
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] px-6 py-12">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                <label htmlFor="image_name">
                    Image Title:
                </label>
                <div className="mt-2">
                    <input 
                    type="text" 
                    name="image_name" 
                    id="image_name"
                    // value={data.image_name}
                    onChange={(e) => setData('image_name', e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <label htmlFor="image">
                    Image
                </label>
                    <input 
                    type="file" 
                    name="image" 
                    id="image" 
                    // value={data.image}
                    onChange={(e) => e.target.files && setData('image', e.target.files[0])}
                    accept="image/*"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>

                    </div>
                
            </form>
        </div>
    )
}

export default AddGallery;