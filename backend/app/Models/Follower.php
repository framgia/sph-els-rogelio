<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class Follower extends Pivot
{
    protected $table = 'followers';
    protected $primaryKey = 'id';
    public $incrementing = true;

    public function follower()
    {
        return $this->belongsTo(User::class,'follower_id','id');
    }

    public function following()
    {
        return $this->belongsTo(User::class,'following_id','id');
    }
}
