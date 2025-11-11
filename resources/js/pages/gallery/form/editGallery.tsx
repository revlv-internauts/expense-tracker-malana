import React, { Dispatch, SetStateAction } from "react";
import { Image } from ".."
import { useForm } from "@inertiajs/react";
import gallery from "@/routes/gallery";
import { error } from "console";
import { Divide } from "lucide-react";

interface EditFormProps {
    selectedItem: Image | null;
    setIsEditFormOpen: Dispatch<SetStateAction<boolean>>;

}

const EditGallery = ({selectedItem, setIsEditFormOpen}: EditFormProps) => {

    const {data, setData, put, processing, errors} = useForm({
        image_name: selectedItem?.image_name ?? "",
        image: null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedItem?.id) return;

        put(gallery.update.url({id: selectedItem?.id}), {
            forceFormData: true,
            onSuccess: () => setIsEditFormOpen(false)

        })


    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image_name"> Image Title</label>
                <div>
                    <input 
                    type="text" 
                    name="image_name" 
                    id="image_name" 
                    value={data.image_name}
                    onChange={(e) => setData('image_name', e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> 
                </div>


                <label htmlFor="image"> Image</label>
                <div>
                    <input type="file"
                    name="image"
                    id="image"
                    // value={data.image}
                    onChange={(e) => e.target.files && setData('image', e.target.files[0])} />
                </div>


                <button type="submit"> Submit</button>

            </form>

        </div>
    ) 
}

export default EditGallery;