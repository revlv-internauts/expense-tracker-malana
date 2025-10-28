<?php

namespace App\Http\Controllers;

use App\Models\ExpenseTracker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseTrackerController extends Controller
{
    
    public function index()
    {
        return Inertia::render('expensetracker/index', [
            'expenses' => ExpenseTracker::orderBy('id', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('expensetracker/create');
    }

    public function store(Request $request)
    {
        // dd(Auth::check() ::user(), Auth::id());

        $validated = $request->validate([
            'account' => 'bail|string|required',
            'category' => 'bail|string|required',
            'amount' => 'bail|string|required',
            'notes'=> 'bail|string|required',
            'order_at'  => 'date|required'
        ]);


        $validated['amount'] = str_replace(',', '', $validated['amount']);
        
        // $validated['user_id'] = Auth::id();
        // dd($striped_amount);
        // $validated['amount'] = (float) $validated['amount'];

        ExpenseTracker::create($validated);


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
            'account' => 'bail|string',
            'category' => 'bail|string',
            'amount' => 'bail|string',
            'notes'=> 'bail|string',
            'order_at'  => 'date'
        ]);

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
