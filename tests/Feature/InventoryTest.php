<?php

namespace Tests\Feature;

use App\Models\Inventory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InventoryTest extends TestCase
{
    use RefreshDatabase;
    //refreshes database each test

    /**
     * A basic feature test example.
     */
    public function test_can_get_inventories(): void
    {

        $user = User::factory()->create();

        Inventory::factory(10)->create([
            // 'user_id' => $user->getKey(),
            'user_id' => $user->id, // llinks to user
        ]); 

        $response = $this->actingAs(user: $user)->get('/inventories');

        $response->assertStatus(200);
    }

    public function test_can_create_inventory(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/inventories' , [
            'item_name' =>'Laptop',
            'serial_code' => '132456',
            'item_code' => 'SL-2879',
            'date_of_purchase' =>'1999-01-11 00:00:00'
        ]);

        $response->assertRedirect();

        // check if it is dbase has this values

        $this->assertDatabaseHas('inventories', [
            'item_name' =>'Laptop',
            'serial_code' => '132456',
            'item_code' => 'SL-2879',
            'date_of_purchase' =>'1999-01-11 00:00:00'

        ]);

    }

    public function test_can_update_inventory(): void {
        $user = User::factory()->create();

        //created
        $inventory = Inventory::factory()->create([
            'item_name' => 'laptop',
            'user_id' => $user->getKey(), 
            'serial_code' => '12345',
            'item_code' => '098765',
            'date_of_purchase' => '2023-09-27 00:00:00'
        ]);

        //updated
        $response = $this->actingAs($user)->put("/inventories/{$inventory->getKey()}", [
            'item_name' => 'laptops',
            'user_id' => $user->getKey(), 
            'serial_code' => '12345849384',
            'item_code' => '09876592389472',
            'date_of_purchase' => '2023-09-27 00:00:00'
        ]);

        $response->assertRedirect();
        //check
        //checks the database table if it has this   
        $this->assertDatabaseHas('inventories', [
            'item_name' => 'laptops',
            'user_id' => $user->getKey(), 
            'serial_code' => '12345849384',
            'item_code' => '09876592389472',
            'date_of_purchase' => '2023-09-27 00:00:00'
            
        ]);

    }


    public function test_can_delete_item(): void 
    {
        $user = User::factory()->create();

        //created
        $inventory = Inventory::factory()->create([
            'item_name' => 'laptop',
            'user_id' => $user->getKey(), 
            'serial_code' => '12345',
            'item_code' => '098765',
            'date_of_purchase' => '2023-09-27 00:00:00'
        ]);

        // //updated
        // $response = $this->actingAs($user)->put("/inventories/{$inventory->getKey()}", [
        //     'item_name' => 'laptops',
        //     'user_id' => $user->getKey(), 
        //     'serial_code' => '12345849384',
        //     'item_code' => '09876592389472',
        //     'date_of_purchase' => '2023-09-27 00:00:00'
        // ]);

        //deleted
        $response = $this->actingAs($user)->delete("/inventories/{$inventory->getKey()}");

        $response->assertRedirect();
        //check
        //checks the database table if it has this   
        $this->assertDatabaseMissing('inventories', [
            'id' => $inventory->id
            // 'id' => $inventory->getKey()
        ]);
    }

    public function test_can_show_item() : void {
        $user = User::factory()->create();

        //create
        $inventory = Inventory::factory()->create([
            'item_name' => 'laptops',
            'user_id' => $user->getKey(), 
            'serial_code' => '12345849384',
            'item_code' => '09876592389472',
            'date_of_purchase' => '2023-09-27 00:00:00'
        ]);

        // get the request actingAs user
        $response = $this->actingAs($user)->get("/inventories/{$inventory->id}");

        $response->assertStatus(200);
        $response->assertSee('laptops'); 

    }
       
}
