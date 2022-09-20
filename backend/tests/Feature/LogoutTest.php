<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_check_logout_with_user()
    {
        $this->createUserAuth();
        $response = $this->post('api/logout',[],['Accept'=>'application/json']);
        $response->assertStatus(200);
    }
    public function test_check_logout_without_user()
    {
        $response = $this->post('api/logout',[],['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
