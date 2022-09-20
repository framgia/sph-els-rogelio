<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_user_is_authenticated()
    {
        $this->createUserAuth();
        $response=$this->get('api/user');
        $response->assertStatus(200);
    }
    public function test_user_is_not_authenticated()
    {
        $response = $this->get('api/user',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
