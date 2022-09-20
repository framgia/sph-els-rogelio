<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class FollowTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_follow_function_is_working()
    {
        $users=$this->createUser(2);
        $this->createAuth($users[0]);
        $response = $this->post('api/follow/'.$users[1]->id);
        $response->assertStatus(200);
    }
    public function test_follow_function_is_accessed_unauthenticated()
    {
        $response = $this->post('api/follow/1',[],['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
