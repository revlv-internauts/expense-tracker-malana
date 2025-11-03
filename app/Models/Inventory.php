<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    /** @use HasFactory<\Database\Factories\InventoryFactory> */
    use HasFactory;

    protected $fillable = [
        'item_name',
        'user_id', 
        'serial_code',
        'item_code',
        'date_of_purchase',
    ];

    // Relationship
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function expense() {
        return $this->hasMany(ExpenseTracker::class);
    }
}
