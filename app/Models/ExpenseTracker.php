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
        "account_id", // this will be automatically created since in our migration we declare a fk or relationship 
        "user_id", //$table->foreignIdFor(User::class);
        "category",
        "amount",
        "notes" ,
        "order_at",
    ];

    public function user()
    {
        return $this->belongsTo(User::class); // this belongs to 1 user only.
        // each expense tracker created only belongs to 1 user
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }


}
