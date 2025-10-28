<?php

namespace Database\Factories;

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
        $accounts = ['cash', 'credit_card', 'loan', 'gcash'];
        $categories = ['food', 'utilities', 'transportation'];


        return [
            'account' => fake()->randomElement($accounts),
            'category' => fake()->randomElement($categories),
            'amount' => fake()->numberBetween(1000, 3000),
            'notes'=> fake()->word(),
            'order_at' => fake()->dateTimeThisMonth('now', 'Asia/Manila'),
            'user_id' => \App\Models\User::factory(),

        ];
    }
}
