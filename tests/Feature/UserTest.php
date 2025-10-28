<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_can_get_all_users(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/users');

        $response->assertStatus(200);
    }

    public function test_can_create_user(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/users', 
        [
            'name' => 'Hanna Malana',
            'email' => $email = 'hanna@example.com',
            'password' => bcrypt('123456788') 
        
        ]);
        $response->assertStatus(302);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', [
            'email' => $email,
        ]);
    }

    public function test_can_update_user(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/users', 
        [
            // 'id' => $user->id,
            'name' => 'Hanna Malana',
            'email' => 'hanna@example.com',
            'password' => bcrypt('123456788') 
        
        ]);

        $response = $this->actingAs($user)->put("/users/{$user->id}",
        [
            'name' => $newName = 'Hanna Malalana',
            'email' => $newEmail ='hanna123@gmail.com'
        ]);

        $this->assertDatabaseHas('users', [
            'name'=> $newName,
            'email'=> $newEmail,
        ]);
    }

    public function test_can_delete_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/users', 
        [

            // 'id' => $user->id,
            'name' => 'Hanna Malana',
            'email' => $email = 'hanna@example.com',
            'password' => bcrypt('123456788') 
        
        ]);

        $response = $this->actingAs($user)->delete("/users/{$user->id}");


        $response->assertStatus(302);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

}
