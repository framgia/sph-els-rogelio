<?php
namespace Tests\Support;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

trait AuthTrait {
    public function createUser($count=null,$is_admin=false) {
        return User::factory($count)->create([
          'is_admin'=>$is_admin
        ]);
    }
    public function createUserAuth($count=null,$is_admin=false) {
      Sanctum::actingAs($user=User::factory($count)->create([
        'is_admin'=>$is_admin
      ]));
      return $user;
    }
    public function createAuth($user) {
      Sanctum::actingAs($user);
    }
}