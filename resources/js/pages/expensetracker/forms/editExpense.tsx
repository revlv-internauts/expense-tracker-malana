import { Form, router, useForm } from "@inertiajs/react";
import React, { use, useState } from "react";
import { NumericFormat } from "react-number-format";
import { ExpenseTracker } from "@/types/expensetypes";
import { Account } from "@/types/expensetypes";
import expensetracker from "@/routes/expensetracker";
interface EditExpenseProps {
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedItem: ExpenseTracker | null;
    acctOptions: Account[];
}

const EditExpense = ({ setIsEditOpen, selectedItem, acctOptions }: EditExpenseProps) => {

    const {data, setData, put, processing, errors} = useForm({
            account_id: selectedItem?.account.id || "" ,
            category: selectedItem?.category || "" ,
            amount: selectedItem?.amount.toString() || "",
            notes: selectedItem?.notes || "",
            order_at: selectedItem?.order_at || "",
        });
    
    const categories = ['food', 'utilities', 'transportation']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem?.id) return;


        put(expensetracker.update.url({id: selectedItem?.id }), {
            onSuccess:() => setIsEditOpen(false)

        })

    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="account" className="block text-sm/6 font-medium text-gray-900">
                            Account
                        </label>
                        <div className="mt-2">
                            <select name="account_id" id="account" value={data.account_id} onChange={(e) => setData('account_id', e.target.value)} >
                                {acctOptions.map((account) => (
                                    <option key={account.id} value={account.id}>{account.accountname}</option>
                                ) )}
                            </select>

                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <select name="category" id="category" value={data.category} onChange={(e) => setData('category', e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                Amount
                            </label>
                            <div className="mt-2">
                                <NumericFormat
                                    id="amount"
                                    name="amount"
                                    thousandSeparator
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowLeadingZeros={false}
                                    value={data.amount}
                                    onValueChange={((values) => setData('amount', values.value))}
                                    placeholder="Enter Amount"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm/6 font-medium text-gray-900">
                                Note
                            </label>
                            <div className="mt-2">
                                <input
                                    id="notes"
                                    name="notes"
                                    type="text"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    required
                                    // autoComplete="current-quantity"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="order_at" className="block text-sm/6 font-medium text-gray-900">
                                Order Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="order_at"
                                    name="order_at"
                                    type="datetime-local"
                                    value={data.order_at}
                                    onChange={(e) => setData('order_at', e.target.value)}
                                    // defaultValue={selectedItem?.order_at?.split(' ')[0]}
                                    required
                                    // autoComplete="current-quantity"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
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

export default EditExpense;