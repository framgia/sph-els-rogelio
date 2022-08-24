<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    public function follower()
    {
        return $this->belongsTo(User::class,'follower_id','id');
    }

    public function following()
    {
        return $this->belongsTo(User::class,'following_id','id');
    }
}
