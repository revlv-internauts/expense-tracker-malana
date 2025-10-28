<?php

namespace Tests\Feature;

use App\Models\ExpenseTracker;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExpenseTrackerTest extends TestCase
{
   
    use RefreshDatabase;

     // tests 
    // get all
    // create  new expense
    // show 1 expense
    // edit and update 1 expense
    // delete expense
    public function test_can_get_all_expenses(): void
    {
        //create user 
        $user = User::factory()->create();
        //creaye iexpense tracker
        $response = ExpenseTracker::factory(10)->create([
            "user_id" => $user->id
        ]);

        $response = $this->actingAs($user)->get('/users');

        $response->assertStatus(200);
    }

    public function test_can_create_new_expense(): void 
    {
        //create user
        $user = User::factory()->create();

        //
        $response = ExpenseTracker::factory()->create([
            'account' => 'cash',
            'category' => 'food',
            'amount' => '1250',
            'notes'=> 'Jollibee',
            'order_at'  => '2025-10-03 06:58:00'
        ]);

        $response = $this->actingAs($user)->post('/expensetracker');
        $response->assertRedirect();
    }

    public function test_can_show_specific_expense(): void 
    {
        $user = User::factory()->create();

        $expense = ExpenseTracker::factory()->create([
            'account' => 'cash',
            'category' => 'food',
            'amount' => '1250',
            'notes' => 'Jollibee',
            'order_at' => '2025-10-03 06:58:00'
        ]);

        $response = $this->actingAs($user)->get("/expensetracker/{$expense->user_id}");
        $response->assertStatus(200);
    }

    public function test_can_update_expense(): void
    {
        $user = User::factory()->create();

        $expense = ExpenseTracker::factory()->create([
            'account' => 'cash',
            'category' => 'food',
            'amount' => '1250',
            'notes' => 'Jollibee',
            'order_at' => '2025-10-03 06:58:00'
        ]);

        $response = $this->actingAs($user)->put("/expensetracker/{$expense->user_id}", [
            'category' => 'transportation'
        ]);

        $response->assertStatus(302);

        $response->assertRedirect();


    }

    public function test_can_delete_expense(): void {
        $user = User::factory()->create();
        $expense = ExpenseTracker::factory()->create([
            'account' => 'cash',
            'category' => 'food',
            'amount' => '1250',
            'notes' => 'Jollibee',
            'order_at' => '2025-10-03 06:58:00',
            'user_id' => $user->id,
        ]);
        $response = $this->actingAs($user)->delete("/expensetracker/{$expense->id}");

        $response->assertStatus(302);

        
        $this->assertSoftDeleted('expense_trackers', [
            'id' => $expense->id
        ]);

                $response->assertRedirect();

    }

}
