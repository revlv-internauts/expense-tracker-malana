<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ["category"];

    public function expense()
    {
        return $this->hasMany(ExpenseTracker::class); 
    }

    public function user() 
    { 
        return $this->belongsTo(User::class);
    }
}
