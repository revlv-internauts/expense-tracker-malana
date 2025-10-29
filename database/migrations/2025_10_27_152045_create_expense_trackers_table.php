<?php

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expense_trackers', function (Blueprint $table) {
        // $accounts = ['cash', 'credit_card', 'loan', 'gcash'];
        $categories = ['food', 'utilities', 'transportation'];
            $table->id();
            $table->foreignIdFor(Account::class); // automatically creates a account_id
            $table->foreignIdFor(User::class);
            // $table->enum('account', $accounts);
            $table->enum('category', $categories);
            $table->decimal('amount');
            $table->string('notes');
            $table->timestamp('order_at');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_trackers');
    }
};
