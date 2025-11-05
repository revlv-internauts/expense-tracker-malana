import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import inventories from '@/routes/inventories';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AddInventory from './forms/addInventory';
import EditInventory from './forms/editInventory';
import { Inventory, Paginated } from '@/types/inventorytypes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: inventories.index.url(), // this expects a strin '/index' 
    },
];

type Props = {
  inventories: Paginated<Inventory>;
};

const columns: (keyof Inventory)[] = ['id', 'item_name', 'serial_code', 'item_code', 'date_of_purchase'];

function FormatDate(dateString: string){
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US',{
        month: 'long', day: 'numeric', year: 'numeric', hour:'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h24'
    })
}



export default function InventoriesPage({inventories}: Props) {

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
    // const [count, setCount]=useState();

    const handleCloseAddForm = () => {
        setIsAddOpen(false)
    }
     const handleCloseEditForm = () => {
        setIsEditOpen(false)
    }
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">{breadcrumbs[0].title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

        <button
            onClick={() => setIsAddOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Add Inventory
        </button>

{/* FORM */}
        {isAddOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseAddForm}>
                <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>

                  <button
                    onClick={handleCloseAddForm}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                    x 
                  </button>
                  {/* passing of props */}
                  <AddInventory setIsAddOpen={setIsAddOpen}/>
                </div>
              </div>
            )} 
{/* END FORM */}
        </div>
      </div>
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full capitalize divide-y divide-gray-300">
              <thead>
                <tr>
                    
                    {columns.map((col) => (
                        <th key={col} scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            {col === col ? col.replace(/_/g, " ") : col }
                        </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inventories.data.map((inventory, index) => (
                  <tr key={inventory.id}>
                    <td>{index + 1}</td>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {inventory.item_name}
                    </td>

                    {columns.slice(2).map((col) => (
                        <td key={col} className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {/* {food[col]} */}
                            {col === 'date_of_purchase' ? FormatDate(inventory[col]) : inventory[col]}
                        </td>
                    ))}
                        <td className="py-4 pr-4 pl-3 space-x-7 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                            <button onClick={() => {setIsEditOpen(true); setSelectedItem(inventory)}} className="text-indigo-600 hover:text-indigo-900">
                                Edit
                            </button>

                      <Link href={`/inventories/${inventory.id}`} method='delete' className="text-red-600 hover:text-red-900">
                        Delete <span className="sr-only">, {inventory.id}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* =========
              Pagination
            ========== */}
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{inventories.current_page ?? 0}</span> to {' '} <span className="font-medium">{inventories.last_page ?? 0}</span> of{' '}
                      <span className="font-medium">{inventories.total ?? 0}</span> results
                    </p>
                  </div>

                  <div className="flex flex-1 justify-between sm:justify-end">

                    {inventories.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url || '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold 
                                                ${link.active
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
                          }`}>
                      </Link>
                    ))}
                  </div>
                </nav>

            {/* Edit Form */}
            {/* selectedItem */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseEditForm}>
                     <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleCloseEditForm}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                            x
                        </button>
                        {/* passing of props */}
                        <EditInventory selectedItem={selectedItem} setIsEditOpen={setIsEditOpen} />
                    </div>
                </div>
            )} 
            {/* END EDIT FORM */}

          </div>
        </div>
      </div>
    </div>
            
        </AppLayout>
    );
}
