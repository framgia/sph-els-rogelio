<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WordQuestion extends Model
{
    use HasFactory, SoftDeletes;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class,'lesson_id','id');
    }
    
    public function choices()
    {
        return $this->hasMany(Choice::class,'word_id','id');
    }

    public function learned_words()
    {
        return $this->hasMany(LearnedWord::class,'word_id','id');
    }
}
