<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class UsersListTest extends TestCase
{
    use RefreshDatabase,AuthTrait;
    public function test_show_admin_users_list()
    {
        $this->createUserAuth();
        $response = $this->get('api/users');
        $response->assertStatus(200);
    }
    public function test_access_admin_users_list_by_unauthenticated_user()
    {
        $response = $this->get('api/users',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
