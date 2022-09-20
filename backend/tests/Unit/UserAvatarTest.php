<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Support\AuthTrait;
use Tests\TestCase;

class UserAvatarTest extends TestCase
{
    use RefreshDatabase, AuthTrait;
    public function test_avatar_upload()
    {
        $user=$this->createUser();
        $image=new UploadedFile(public_path(Storage::url('public/images/default_profile_avatar.jpg')), 'default_profile_avatar.jpg', 'image/jpg', null, true);
        if($user->avatar!='default_profile_avatar.jpg'){
          if(Storage::disk('local')->exists('public/images/'.$user->avatar)){
            Storage::delete('public/images/'.$user->avatar);
          }
        }
        $filename = time().rand(100,999).'.'.$image->getClientOriginalExtension();
        Storage::disk('local')->put('public/images/'.$filename, file_get_contents($image));
        User::where('id',$user->id)->update([
            'avatar'=>$filename
        ]);
        $user=User::find($user->id);
        $this->assertFileExists(public_path(Storage::url('public/images/').$user->avatar));
        $this->assertTrue($user->avatar===$filename);
        Storage::delete('public/images/'.$user->avatar);
    }
}
