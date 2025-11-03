import AppLayout from '@/layouts/app-layout';
import expensetracker from '@/routes/expensetracker';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format'
import AddExpense from './forms/addExpense';
import EditExpense from './forms/editExpense';
import { ExpenseTracker } from '@/types/expensetypes';
import { FormatDate } from '@/lib/utils';
import { Account } from '@/types/expensetypes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expense Tracker',
        href: expensetracker.index.url(), // this expects a strin '/index' 
    },
];

type Props = {
    expenses: ExpenseTracker[];
};

const columns: (keyof ExpenseTracker)[] = ['id', 'account_id', 'category', 'amount', 'notes', 'order_at'];


export default function ExpenseTrackerPage({ expenses }: Props) {

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ExpenseTracker | null>(null);

    const handleCloseAddForm = () => {
        setIsAddOpen(false)
    }
    const handleCloseEditForm = () => {
        setIsEditOpen(false)
    }

    const handleDelete = (expenses: ExpenseTracker) => {
        console.log('handleDelete triggered', expenses);
        if (confirm(`Delete ${expenses.category} with amount of P ${expenses.amount}?`)) {
            /* =================================================
                ** Using Wayfinder **
                - php artisan wayfinde:rgenerate - 
                this automatically generates directories
                resources/js/actions/App/HTTP/Controllers and 
                resources/js/routes/foldernameroutename

                ✔ expensetracker.destroy.url({ id: expenses.id}) 
                ✖ replaces ('/expensetracker/${expenses.id})
            ================================================= */
            router.delete(expensetracker.destroy.url({ id: expenses.id}))
        };
    }

    const totalAmount = expenses.reduce((prev, curr) => prev + Number(curr.amount), 0);

    const acctOptions: Account[] = [
        {id: 1, accountname: 'cash'},
        {id: 2, accountname: 'credit_card'},
        {id: 3, accountname: 'loan'},
        {id: 4, accountname: 'gcash'},
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900">{breadcrumbs[0].title}</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the expense
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Exepense
                        </button>

                        {/* 
                        ====================
                            FORM
                        ====================
                         */}
                        {isAddOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseAddForm}>
                                <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>

                                    <button
                                        onClick={handleCloseAddForm}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                        x
                                    </button>
                                    {/* passing of props */}
                                    <AddExpense setIsAddOpen={setIsAddOpen} acctOptions={acctOptions} />
                                </div>
                            </div>
                        )}
                        {/*
                        ====================
                            END FORM 
                        ====================
                        */}
                    </div>
                </div>

                <div className='pt-7'> Total: <NumericFormat value={totalAmount} allowNegative={false} thousandSeparator decimalScale={2} fixedDecimalScale prefix='P ' /> </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="relative min-w-full capitalize divide-y divide-gray-300">
                                <thead>
                                    <tr>

                                        {columns.map((col) => (
                                            <th key={col} scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                {col === col ? col.replace(/_/g, " ") : col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {expenses.map((expense, index) => (
                                        <tr key={expense.id}>
                                            <td>{index + 1}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                {expense.account.accountname}
                                            </td>

                                            {columns.slice(2).map((col) => (
                                                <td key={col} className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    
                                                    {col === "account_id" 
                                                        ? expense.account?.accountname 
                                                        : col === 'amount' 
                                                        ? <NumericFormat 
                                                            displayType='text'
                                                            thousandSeparator
                                                            value={expense.amount}
                                                            decimalScale={2}
                                                            fixedDecimalScale={true}
                                                            prefix='P '
                                                            /> 
                                                        : col === 'order_at' ? FormatDate(expense[col] as string) 
                                                        : expense[col] as string | number
                                                    }

                                                </td>
                                            ))}
                                            <td className="py-4 pr-4 pl-3 space-x-7 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                <button onClick={() => { setIsEditOpen(true); setSelectedItem(expense) }} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </button>

                                                <button onClick={() => handleDelete(expense)} className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* ====================
                            TODO: PAGINATION
                            ==================== */}

                            {/*
                            ====================
                                Edit Form
                            ==================== 
                            */}
                            {isEditOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={handleCloseEditForm}>
                                    <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={handleCloseEditForm}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold mouse-pointer">
                                            x
                                        </button>
                                        {/* passing of props */}
                                        <EditExpense selectedItem={selectedItem} setIsEditOpen={setIsEditOpen} acctOptions={acctOptions}/>
                                    </div>
                                </div>
                            )}
                            {/*
                            ====================
                            END EDIT FORM 
                            ====================
                            */}

                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
