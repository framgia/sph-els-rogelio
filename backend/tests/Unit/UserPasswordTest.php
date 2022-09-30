<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class UserPasswordTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_check_user_factory_current_password()
    {
        $user=$this->createUser();
        $this->assertTrue(Hash::check('password',$user->password));
    }
}
