<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearnedWord extends Model
{
    use HasFactory;
    
    public function word()
    {
        return $this->belongsTo(WordQuestion::class,'word_id','id');
    }

    public function choice()
    {
        return $this->belongsTo(Choice::class,'choice_id','id');
    }
    
    public function finished_lesson()
    {
        return $this->belongsTo(FinishedLesson::class,'finished_lesson_id','id');
    }
}
