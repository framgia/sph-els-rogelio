<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_profile_found()
    {
        $user=$this->createUser();
        Sanctum::actingAs($user);
        $response = $this->get('api/profile/'.$user->id);
        $response->assertStatus(200);
    }
    public function test_profile_not_found()
    {
        $this->createUserAuth();
        $response = $this->get('api/profile/9999');
        $response->assertStatus(404);
    }
    public function test_access_profile_unauthenticated()
    {
        $response = $this->get('api/profile/1',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
