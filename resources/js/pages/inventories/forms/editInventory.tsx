import { useForm } from "@inertiajs/react";
import { Inventory } from "..";
import React from "react";
import inventories from "@/routes/inventories";

interface EditInventoryProps {
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem: Inventory | null;
}

const EditInventory = ({setIsEditOpen, selectedItem}: EditInventoryProps) => {

    const {data, setData, put, processing, errors} = useForm({
        item_name: selectedItem?.item_name || "",
        serial_code: selectedItem?.serial_code || "",
        item_code: selectedItem?.item_code || "",
        date_of_purchase: selectedItem?.date_of_purchase || ""

    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedItem?.id) return;

        put(inventories.update.url({id: selectedItem?.id}), {
            onSuccess: () => setIsEditOpen(false)
        })

    }

    return(
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="item_name" className="block text-sm/6 font-medium text-gray-900">
                            Item Name
                        </label>
                        <div className="mt-2">
                            <input 
                            type="text"
                            name="item_name"
                            id="item_name"
                            value={data.item_name}
                            onChange={(e) => setData('item_name', e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="serial_code" className="block text-sm/6 font-medium text-gray-900">
                            Serial code
                        </label>
                        <div className="mt-2">
                            <input 
                            type="text"
                            name="serial_code"
                            id="serial_code"
                            value={data.serial_code}
                            onChange={(e) => setData('serial_code', e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="item_code" className="block text-sm/6 font-medium text-gray-900">
                            Item code
                        </label>
                        <div className="mt-2">
                            <input 
                            type="text"
                            name="item_code"
                            id="item_code"
                            value={data.item_code}
                            onChange={(e) => setData('item_code', e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="date_of_purchase" className="block text-sm/6 font-medium text-gray-900">
                            Date of Purchase
                        </label>
                        <div className="mt-2">
                            <input 
                            type="datetime-local"
                            name="date_of_purchase"
                            id="date_of_purchase"
                            value={data.date_of_purchase}
                            onChange={(e) => setData('date_of_purchase', e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        </div>

                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={() => setIsEditOpen(false)}>
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
        </div>
    )
}

export default EditInventory;