import expensetracker from "@/routes/expensetracker";
import { Form, router, useForm } from "@inertiajs/react";
import { log } from "console";
import React, { use, useState } from "react";
import { NumericFormat } from "react-number-format";

interface AddExpenseProps {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpense: React.FC<AddExpenseProps> = ({ setIsAddOpen }) => {

    const { data, setData, post, processing, errors } = useForm({
        account: "cash",
        category: "food",
        amount: "",
        notes: "",
        order_at: ""
    });

    const acctOptions = ['cash', 'credit_card', 'loan']
    const categories = ['food', 'utilities', 'transportation']

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitting data:', data)
                //wayfinder
        post(expensetracker.store.url(), {
            onSuccess: () => setIsAddOpen(false)
        });
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                <form onSubmit={handleAddExpense} className="space-y-6">
                    <div>
                        <label htmlFor="account" className="block text-sm/6 font-medium text-gray-900">
                            Account
                        </label>
                        <div className="mt-2">
                            <select name="account" id="account" value={data.account}
                                onChange={(e) => setData('account', e.target.value)}>
                                {acctOptions.map((account) => (
                                    <option key={account} value={account}>{account}</option>
                                ))}
                            </select>
                        </div>
                        {errors.account && <div className="text-red-500">{errors.account}</div>}

                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <select name="category" id="category" value={data.category}
                                onChange={(e) => setData('category', e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category} value={category}> {category}</option>
                                ))}
                            </select>
                        </div>
                        {errors.account && <div className="text-red-500">{errors.account}</div>}

                        <div>
                            <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                Amount
                            </label>
                            <div className="mt-2">
                                <NumericFormat
                                    id="amount"
                                    name="amount"
                                    thousandSeparator
                                    value={data.amount}
                                    onValueChange={(values) => setData('amount', values.value)}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowLeadingZeros={false}
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
                                    type="string"
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
                                    type="date"
                                    value={data.order_at}
                                    onChange={(e) => setData('order_at', e.target.value)}
                                    required
                                    // autoComplete="current-quantity"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
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
        </div>
    )
}

export default AddExpense;