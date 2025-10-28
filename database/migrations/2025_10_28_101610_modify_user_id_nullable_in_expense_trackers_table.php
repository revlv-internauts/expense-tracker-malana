<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('expense_trackers', function (Blueprint $table) {
            // Make the column nullable
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('expense_trackers', function (Blueprint $table) {
            // Make it NOT NULL again
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
