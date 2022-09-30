<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class UserTest extends TestCase
{
    use WithFaker,RefreshDatabase,AuthTrait;
    public function test_change_user_general_info()
    {
        $this->createUserAuth();
        $info=[
          'name'=>$this->faker->name(),
          'email'=>$this->faker->safeEmail()
        ];
        $response = $this->put('api/user/change/general-info',$info);
        $response->assertStatus(200);
    }
    public function test_change_user_password_correct_current_password()
    {
        $this->createUserAuth();
        $password=[
          'password'=>'password',
          'newPassword'=>$this->faker->password(8,20)
        ];
        $response = $this->put('api/user/change/password',$password);
        $response->assertStatus(200);
    }
    public function test_change_user_password_incorrect_current_password()
    {
        $this->createUserAuth();
        $password=[
          'password'=>$this->faker->password(8,20),
          'newPassword'=>$this->faker->password(8,20)
        ];
        $response = $this->put('api/user/change/password',$password);
        $response->assertStatus(500);
    }
    public function test_change_user_avatar()
    {
        $user=$this->createUserAuth();
        $response = $this->post('api/user/change/avatar',[
          'image'=>new UploadedFile(public_path(Storage::url('public/images/default_profile_avatar.jpg')), 'default_profile_avatar.jpg', 'image/jpg', null, true)
        ]);
        $user=User::find($user->id);
        $response->assertStatus(200);
        $this->assertFileExists(public_path(Storage::url('public/images/').$user->avatar));
        Storage::delete('public/images/'.$user->avatar);
    }
    public function test_access_user_general_info_unathenticated()
    {
      $response = $this->put('api/user/change/general-info',[],['Accept'=>'application/json']);
      $response->assertStatus(401);
    }
    public function test_access_user_change_password_unathenticated()
    {
      $response = $this->put('api/user/change/password',[],['Accept'=>'application/json']);
      $response->assertStatus(401);
    }
    public function test_access_user_change_avatar_unathenticated()
    {
      $response = $this->post('api/user/change/avatar',[],['Accept'=>'application/json']);
      $response->assertStatus(401);
    }
}
