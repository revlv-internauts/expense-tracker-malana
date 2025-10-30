import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import users from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AddUser from './forms/addUser';
import EditUser from './forms/editUser';
import { User, Paginated} from '@/types/usertypes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: users.index.url(), // this expects a strin '/index' 
    },
];

/* ==============================================
TYPES are separated for more cleaner and readable
code
============================================== */

type Props = {
    user: Paginated<User>;
};

const columns: (keyof User)[] = ['id', 'name', 'email'];

export default function UsersPage({ user }: Props) {

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<User | null>(null);

    const handleCloseAddForm = () => {
        setIsAddOpen(false)
    }
    const handleCloseEditForm = () => {
        setIsEditOpen(false)
    }

    const handleDeleteUser = (user: User) => {
        // href={`/users/${user.id}`}
        if (confirm(`Delete ${user.name}?`)){
            router.delete(users.destroy.url({id: user.id}))
        }
    } 

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory"/>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900">{breadcrumbs[0].title}</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, email 
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add User
                        </button>

                        {/* ==================== 
                            FORM 
                        ==================== */}
                        {isAddOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseAddForm}>
                                <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>

                                    <button
                                        onClick={handleCloseAddForm}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                        x
                                    </button>
                                    {/* =======================================
                                    renderin and passing of props to its child
                                    =========================================== */}
                                    <AddUser setIsAddOpen={setIsAddOpen}/>
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

                                        {columns.map((col) => (
                                            <th key={col} scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 capitalize">
                                                {col === col ? col.replace(/_/g, " ") : col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {user.data.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 capitalize">
                                                {user.name}
                                            </td>

                                            {columns.slice(2).map((col) => (
                                                <td key={col} className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {user[col]}
                                                </td>
                                            ))}
                                            <td className="py-4 pr-4 pl-3 space-x-7 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                
                                                <button onClick={() => { setIsEditOpen(true); setSelectedItem(user) }} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </button>

                                                <button onClick={() => handleDeleteUser(user)}  className="text-red-600 hover:text-red-900">
                                                    Delete 
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                           

                            {/* ====================
                                Edit Form 
                            ==================== */}
                            {isEditOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseEditForm}>
                                    <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={handleCloseEditForm}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                            x
                                        </button>
                                        {/* passing of props */}
                                        <EditUser selectedItem={selectedItem} setIsEditOpen={setIsEditOpen} />
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
