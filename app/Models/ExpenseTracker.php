<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class ExpenseTracker extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseTrackerFactory> */
    use HasFactory;

    protected $table = "expense_trackers";

    protected $fillable = [
        "account",
        "category",
        "amount",
        "notes" ,
        "order_at",
    ];

}
