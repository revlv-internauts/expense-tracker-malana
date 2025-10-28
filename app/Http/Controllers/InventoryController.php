<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    
    public function index()
    {
        return Inertia::render('inventories/index', [
            'inventories' => Inventory::all()
        ]);
    }

  
    public function create()
    {
        return Inertia::render('inventories/create');
    }

   
    public function store(Request $request)
    {
        $validated = $request->validate([
        'item_name' => 'required|string',
        'serial_code' => 'string|required|unique:inventories,serial_code',
        'item_code' => 'string|required|unique:inventories,item_code',
        'date_of_purchase' => 'string|required'
        ]);

        //get the users id
        $validated['user_id'] = $request->user()->getKey();

        Inventory::create($validated);

        return to_route('inventories.index');

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
            'serial_code' => 'string|required|unique:inventories,serial_code',
            'item_code' => 'string|required|unique:inventories,item_code',
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
