export type Account = {
    id: number;
    accountname: string;
}

export type ExpenseTracker = {
    id: number,
    account_id: string,
    account: Account;
    category: string,
    amount: number,
    notes: string
    order_at: string,
};