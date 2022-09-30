<?php
namespace Tests\Support;

use App\Models\Follower;

trait FollowTrait {
    public function followUser($follower,$following) {
        return Follower::create([
          'follower_id'=>$follower->id,
          'following_id'=>$following->id
        ]);
    }
}