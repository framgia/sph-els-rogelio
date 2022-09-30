<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase,WithFaker;
    public function test_user_can_register()
    {
      $user = [
        'name' => $this->faker()->name(),
        'email' => $this->faker()->safeEmail(),
        'password' => 'password',
      ];
      $response = $this->post('api/register', $user);
      $response->assertStatus(200);
    }
    public function test_user_cannot_register_same_email()
    {
      $user1 = [
        'name' => $this->faker()->name(),
        'email' => 'aryastark@test.com',
        'password' => 'password',
      ];
      $user2 = [
        'name' => $this->faker()->name(),
        'email' => 'aryastark@test.com',
        'password' => '12345678',
      ];
      $response = $this->post('api/register', $user1);
      $response = $this->post('api/register', $user2);
      $response->assertStatus(500);
    }
}
