<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Model;

class FinishedLesson extends Model
{
    protected $guarded=[];
    protected $with=['user','lesson','learned_words.choice','learned_words.word_question'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function learned_words()
    {
        return $this->hasMany(LearnedWord::class);
    }
}
