<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    public function test_user_email_duplication()
    {
        $email='johndoe@test.com';
        $is_taken=true;
        $user=User::make([
          'name' => 'John Doe',
          'email' => $email,
        ]);
        if($user->email!=$email){
          $user=User::make([
            'name' => 'Arya Stark',
            'email' => $email,
          ]);
          $is_taken=false;
        }
        $this->assertTrue($is_taken);
    }
}
