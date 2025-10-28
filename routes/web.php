<?php

use App\Http\Controllers\ExpenseTrackerController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('/inventories' , controller: InventoryController::class);
    Route::resource('/users', UserController::class);
    Route::resource('/expensetracker', ExpenseTrackerController::class);


});

require __DIR__.'/settings.php';
