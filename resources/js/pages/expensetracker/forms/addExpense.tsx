import { Form, router } from "@inertiajs/react";
import React, { use, useState } from "react";
import { NumericFormat } from "react-number-format";

interface AddExpenseProps {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpense: React.FC<AddExpenseProps> = ({ setIsAddOpen }) => {

    const acctOptions = ['cash', 'credit card', 'loan']
    const categories = ['food', 'utilities', 'transportation']

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                <Form action="/expensetracker" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="account" className="block text-sm/6 font-medium text-gray-900">
                            Account
                        </label>
                        <div className="mt-2">
                            <select name="account" id="account">
                                {acctOptions.map((account) => (
                                    <option key={account} value={account}>{account}</option>
                                ) )}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <select name="category" id="category">
                                {categories.map((category) => (
                                    <option key={category} value={category}> {category}</option>
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
                </Form>
            </div>
        </div>
    )
}

export default AddExpense;