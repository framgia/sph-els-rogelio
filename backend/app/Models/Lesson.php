<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded=[];

    public function learned_by_users()
    {
        return $this->belongsToMany(User::class,'finished_lessons','lesson_id','user_id')->withTimestamps();
    }
    
    public function words()
    {
        return $this->hasMany(WordQuestion::class,'lesson_id','id');
    }
}
