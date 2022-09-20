<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase,WithFaker,AuthTrait;
    public function test_user_can_login()
    {
        $user = [
          'name' => $this->faker()->name(),
          'email' => $this->faker()->safeEmail(),
          'password' => 'password',
        ];
        $response = $this->post('api/register', $user);
        $response = $this->post('api/login',$user);

        $response->assertStatus(200);
    }
    public function test_admin_can_login()
    {
        $admin=$this->createUser(null,true);
        $login=[
          'email'=>$admin->email,
          'password'=>'password'
        ];
        $response = $this->post('api/login',$login);

        $response->assertStatus(200);
    }
    public function test_user_cannot_login_invalid_credentials()
    {
        $user = [
          'email' => $this->faker()->safeEmail(),
          'password' => $this->faker()->password(8,20),
        ];
        $response = $this->post('api/login',$user);

        $response->assertStatus(500);
    }
}
