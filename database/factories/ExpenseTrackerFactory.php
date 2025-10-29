<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseTracker>
 */
class ExpenseTrackerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['food', 'utilities', 'transportation'];

        return [

            'user_id' => User::factory(),
            'account_id' => Account::inRandomOrder()->first()->id, // pick a random account
            'category' => fake()->randomElement($categories),
            'amount' => fake()->numberBetween(1000, 3000),
            'notes'=> fake()->word(),
            'order_at' => fake()->dateTimeThisMonth('now', 'Asia/Manila'),
            // 'user_id' => \App\Models\User::factory(),

        ];
    }
}
