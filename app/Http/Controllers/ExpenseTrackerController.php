<?php

namespace App\Http\Controllers;

use App\Models\ExpenseTracker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseTrackerController extends Controller
{
    
    public function index()
    {
        return Inertia::render('expensetracker/index', [
            'expenses' => ExpenseTracker::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('expensetracker/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'account' => 'bail|string|required',
            'category' => 'bail|string|required',
            'amount' => 'bail|numeric|required',
            'notes'=> 'bail|string|required',
            'order_at'  => 'date|required|after:today'
        ]);

        ExpenseTracker::create($validated);

        return to_route('expensetracker.index');
    }

    
    public function show(ExpenseTracker $expenseTracker)
    {
        return Inertia::render('expensetracker/show', [
            'expense' => $expenseTracker
        ]);
    }

   
    public function edit(ExpenseTracker $expenseTracker)
    {
        return Inertia::render('expensetracker/edit', [
            'expense' => $expenseTracker
        ]);
    }

   
    public function update(Request $request, ExpenseTracker $expenseTracker)
    {
        $validated = $request->validate([
            'account' => 'bail|string',
            'category' => 'bail|string',
            'amount' => 'bail|numeric',
            'notes'=> 'bail|string',
            'order_at'  => 'date|after:today'
        ]);

        $validated['user_id'] = $request->user()->getKey();
        $expenseTracker->update($validated);
        return to_route('expensetracker.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpenseTracker $expenseTracker)
    {
        $expenseTracker->delete();
        return to_route('expensetracker.index');
    }
}
