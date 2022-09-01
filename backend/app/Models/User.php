<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    public function followers()
    {
        return $this->belongsToMany(User::class,'followers','following_id','follower_id')->withTimestamps();
    }

    public function followings()
    {
        return $this->belongsToMany(User::class,'followers','follower_id','following_id')->withTimestamps();
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class,'finished_lessons')->withTimestamps();
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function finished_lessons()
    {
        return $this->hasMany(FinishedLesson::class);
    }
}
