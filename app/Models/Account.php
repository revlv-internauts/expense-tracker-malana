<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    /* ===================
    Account is -- 
    [cash, credit card, gcash]
     
    ====================== */
    protected $fillable = [
        'accountname'
    ];
}
