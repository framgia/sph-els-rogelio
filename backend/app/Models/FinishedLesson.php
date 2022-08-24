<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class FinishedLesson extends Pivot
{
    protected $table = 'finished_lessons';
    protected $primaryKey = 'id';
    public $incrementing = true;

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class,'lesson_id','id');
    }

    public function learned_words()
    {
        return $this->hasMany(LearnedWord::class,'finished_lesson_id','id');
    }
}
