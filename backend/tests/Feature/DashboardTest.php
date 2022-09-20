<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase,AuthTrait;
    public function test_dashboard_is_accessed_authenticated()
    {
        $this->createUserAuth();
        $response = $this->get('api/dashboard');
        $response->assertStatus(200);
    }
    public function test_dashboard_is_accessed_unauthenticated()
    {
        $response = $this->get('api/dashboard',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
