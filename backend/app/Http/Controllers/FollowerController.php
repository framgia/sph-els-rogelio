<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Activity;
use App\Models\Follower;

class FollowerController extends Controller
{
    public function follow($id)
    {
        $user = User::where('id',Auth::user()->id)->with('followings')->first();
        $exists = $user->followings->contains('id',$id);
        if(!$exists){
          $follow=Follower::create([
            'follower_id'=>$user->id,
            'following_id'=>$id
          ]);
          Activity::create([
            'user_id'=>$user->id,
            'activitable_id'=>$follow->id,
            'activitable_type'=>get_class($follow),
            'type'=>'follow'
          ]);
          return response()->json(['status' => true, 'data'=>$follow, 'message' => 'User successfully followed', 'errors' => null], 200);
        }else{
          $follow=Follower::where([
            ['follower_id','=',$user->id],
            ['following_id','=',$id]
          ])->first();
          Activity::where([
            ['type','=','follow'],
            ['activitable_id','=',$follow->id]
          ])->delete();
          $follow->delete();
          return response()->json(['status' => true, 'data'=>$follow, 'message' => 'User successfully unfollowed', 'errors' => null], 200);
        }
    }
}
