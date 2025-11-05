<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InventoryController extends Controller
{
    
    public function index()
    {
        $user = Auth::user();

        $query = Inventory::where("user_id", $user->id);

        $inventory = $query->orderBy('id', 'desc')->paginate(20);
        return Inertia::render('inventories/index', [
            'inventories' => $inventory
        ]);
    }

  
    public function create()
    {
        return Inertia::render('inventories/create');
    }

   
    public function store(Request $request)
    {

        $user = Auth::user();
        $validated = $request->validate([
            'item_name' => 'required|string',
            'serial_code' => 'string|required|unique:inventories,serial_code',
            'item_code' => 'string|required|unique:inventories,item_code',
            'date_of_purchase' => 'string|required',
            ]);

        try {
            //get the users id
            $validated['user_id'] = $request->user()->getKey();

            Inventory::create(
                [
                    'user_id' => Auth::id(),
                    ...$validated
                ]);

            return to_route('inventories.index')->withSuccess('success', 'inventory item added successfully!');

        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'failed to add inventory Item' . $e->getMessage(),
            ])->withInput();
        }
        

    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        return Inertia::render('inventories/show', [
            'inventory' => $inventory
        ]);
    }

    
    public function edit(Inventory $inventory)
    {
        return Inertia::render('/inventories/edit', [
            'inventory' => $inventory,
        ]);
    }

   
    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'item_name' => 'required|string',
            'serial_code' => 'string|required',
            'item_code' => 'string|required',
            'date_of_purchase' => 'date|required'

        ]);

        $validated['user_id'] = $request->user()->getKey();
        $inventory->update($validated);
        return to_route('inventories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete(); 
        return to_route('inventories.index');
    }

}
