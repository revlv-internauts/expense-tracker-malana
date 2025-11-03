<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\ExpenseTracker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseTrackerController extends Controller
{
    
    public function index(Request $request)
    {
        $user = Auth::user(); // authenticating user

        $query = ExpenseTracker::where('user_id' , $user->id)
        ->with('account'); // this only shows the data that has relation with

        $expense = $query->orderBy('id', 'desc')->get();
        return Inertia::render('expensetracker/index', [
            'expenses' => $expense,
        ]);
    }

    public function create()
    {
        return Inertia::render('expensetracker/create');
    }

    public function store(Request $request)
    {
        // dd(Auth::check() ::user(), Auth::id());


        $account = Account::where('accountname', $request->account)->firstOrFail();

        $validated = $request->validate([
            'category' => 'bail|string|required',
            'amount' => 'bail|string|required',
            'notes'=> 'bail|string|required',
            'order_at'  => 'date|required'
        ]);


        $validated['amount'] = str_replace(',', '', $validated['amount']);

        ExpenseTracker::create(
            [
                'user_id' => Auth::id(), 
                'account_id' => $account->id,
                ...$validated
            ]);

        return to_route('expensetracker.index');
    }

    
    public function show(ExpenseTracker $expensetracker)
    {
        return Inertia::render('expensetracker/show', [
            'expense' => $expensetracker
        ]);
    }

   
    public function edit(ExpenseTracker $expensetracker)
    {
        return Inertia::render('expensetracker/edit', [
            'expense' => $expensetracker
        ]);
    }

   
    public function update(Request $request, ExpenseTracker $expensetracker)
    {
        $validated = $request->validate([
            'account_id' => 'bail|exists:accounts,id',
            'category' => 'bail|string',
            'amount' => 'bail|string',
            'notes'=> 'bail|string',
            'order_at'  => 'date'
        ]);

        // replacing the comma when submitting
        $validated['amount'] = str_replace(',', '', $validated['amount']);
        // dd($validated);

        // $validated['user_id'] = Auth::id();

        // $validated['user_id'] = $request->user()->getKey();
        $expensetracker->update($validated);
        return to_route('expensetracker.index');
    }


    //naming the parameter
    public function destroy(ExpenseTracker $expensetracker)
    {
        $expensetracker->delete();
        return to_route('expensetracker.index');
    }
}
