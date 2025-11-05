<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // creates a user
            'item_name' => fake()->name(),
            'serial_code' => fake()->unique()->uuid(),
            'item_code' => "SL-". fake()->unique()->numberBetween(1000, 3000),
            'date_of_purchase'=> fake()->date(),
        ];
    }
}
