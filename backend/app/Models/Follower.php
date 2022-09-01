<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $guarded=[];
    protected $with=['follower','following'];
    public function follower()
    {
        return $this->belongsTo(User::class);
    }

    public function following()
    {
        return $this->belongsTo(User::class);
    }
}
