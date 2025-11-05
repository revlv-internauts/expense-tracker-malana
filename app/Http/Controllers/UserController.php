<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'string|required',
            'email' => 'email|required|unique:users,email',
            'password' => 'string|required|min:8'
        ]);
        User::create($validated);
        
        return to_route('users.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render(`users/edit`, [
            'user' => $user
        ]);
    }

  
    public function update(Request $request, User $user)
    {
         $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8'
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']); // Don't overwrite if empty
        }   



        $user->update($validated);
        return to_route('users.index')->with('success', 'User updated successfully');
    }


    public function destroy(User $user)
    {
        $user->delete();
        return to_route('users.index')->with('success','User deleted successfully');
    }
}
