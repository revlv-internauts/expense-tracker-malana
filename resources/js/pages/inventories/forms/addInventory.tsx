import inventories from "@/routes/inventories";
import { useForm } from "@inertiajs/react";
import React from "react";

// if you are passing a prop you have to list all the props
// nameOfProp: typeOfProp 
// prop interface
interface AddInventoryProps {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddInventory = ({setIsAddOpen} : AddInventoryProps) => {

    // create a useForm for your forms
    const { data, setData, post, processing, errors} = useForm({
        item_name: "",
        serial_code: "",
        item_code: "",
        date_of_purchase: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('adding inventory:', data);

        post(inventories.store.url(), {
            onSuccess: () => setIsAddOpen(false)
        })

    }

    return(
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] px-6 py-12">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="item_name">
                        Item Name
                    </label>
                    <div className="mt-2">
                        <input 
                        type="text"
                        id="item_name"
                        name="item_name"
                        value={data.item_name}
                        onChange={(e) => setData('item_name', e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.item_name && <div className="text-red-500">{errors.item_name}</div>}
                </div>
                <div>
                    <label htmlFor="serial_code">
                        Serial Code
                    </label>
                    <div className="mt-2">
                        <input 
                        type="text"
                        id="serial_code"
                        name="serial_code"
                        value={data.serial_code}
                        onChange={(e) => setData('serial_code', e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.serial_code && <div className="text-red-500">{errors.serial_code}</div>}
                </div>
                <div>
                    <label htmlFor="item_code">
                        Item Code
                    </label>
                    <div className="mt-2">
                        <input 
                        type="text"
                        id="item_code"
                        name="item_code"
                        value={data.item_code}
                        onChange={(e) => setData('item_code', e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.item_code && <div className="text-red-500">{errors.item_code}</div>}
                </div>
                <div>
                    <label htmlFor="date_of_purchase">
                        Date
                    </label>
                    <div className="mt-2">
                        <input 
                        type="datetime-local"
                        id="date_of_purchase"
                        name="date_of_purchase"
                        value={data.date_of_purchase}
                        onChange={(e) => setData('date_of_purchase', e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.date_of_purchase && <div className="text-red-500">{errors.date_of_purchase}</div>}
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={() => setIsAddOpen(false)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddInventory;