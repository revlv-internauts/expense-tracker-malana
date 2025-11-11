import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { User, Paginated} from '@/types/usertypes';
import gallery from '@/routes/gallery';
import AddGallery from './form/addGallery';
import EditGallery from './form/editGallery';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: gallery.index.url(), // this expects a string '/index' 
    },
];

/* ==============================================
TYPES are separated for more cleaner and readable
code
============================================== */

export type Image = {
    id: number,
    image: string,
    image_name: string
}
 type ImageProps = {
    photos: Image[];
 }

const columns = ['Id','Image', 'Image Name']; 

export default function GalleryPage({photos}: ImageProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [iseditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Image | null>(null)

    const handleEditButton = (photo: Image) => {
        console.log(photo);
        setSelectedItem(photo)
        setIsEditFormOpen(true);
    }

    const handleDeletePhoto = (photo: Image) => {
        router.delete(gallery.destroy.url({id: photo.id}))
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory"/>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900">{breadcrumbs[0].title}</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all your image.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add {breadcrumbs[0].title}
                        </button>

                        {/* ==================== 
                            FORM 
                        ==================== */}
                        {isAddOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}>
                                <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>
                                    <div className='flex text-2xl'>Add new image</div>
                                    <button 
                                        onClick={() => setIsAddOpen(false)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                        x
                                    </button>
                                    <AddGallery setIsAddOpen={setIsAddOpen}/>
                                </div>
                            </div>
                        )} 
                        
                        {/* ====================
                            END FORM 
                        ==================== */}
                    </div>
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="relative min-w-full  divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        {columns.map((column, index) => (
                                            <th key={index}>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {photos.map((photo) => (
                                         <tr key={photo.id}>
                                            <td>{photo.id}</td>
                                            <td className="py-4 pr-4 pl-3 space-x-7 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                               <img src={`/storage/${photo.image}`} alt={photo.image_name} className="h-20 w-20 object-cover rounded"/>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {photo.image_name}
                                            </td>
                                            <td className="py-4 pr-4 pl-3 space-x-7 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                
                                                <button onClick={() => handleEditButton(photo)} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </button>

                                                <button onClick={() => handleDeletePhoto(photo)}  className="text-red-600 hover:text-red-900">
                                                    Delete 
                                                </button>
                                            </td>

                                        </tr>
                                    ) )}                
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <nav
                                aria-label="Pagination"
                                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                            >
                                {/* <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{users.current_page ?? 0}</span> to {' '} <span className="font-medium">{users.last_page ?? 0}</span> of{' '}
                                        <span className="font-medium">{users.total ?? 0}</span> results
                                    </p>
                                </div> */}

                                <div className="flex flex-1 justify-between sm:justify-end">

                                    {/* {users.links.map((link, index) => (
                                        <Link 
                                            key={index}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{__html: link.label}}
                                            className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold 
                                                ${link.active 
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
                                                }`}>
                                        </Link>
                                    ))} */}
                                </div>
                            </nav> 

                            {/* ====================
                                Edit Form 
                            ==================== */}
                            {iseditFormOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={() => setIsEditFormOpen(false)}>
                                    <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => setIsEditFormOpen(false)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                            x
                                        </button>
                                        {/* passing of props */}
                                        <EditGallery selectedItem={selectedItem} setIsEditFormOpen={setIsEditFormOpen} />
                                    </div>
                                </div>
                            )}
                            
                            {/* ==================== 
                            END EDIT FORM 
                            ==================== */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
