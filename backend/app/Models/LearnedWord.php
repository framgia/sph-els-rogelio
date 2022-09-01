<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearnedWord extends Model
{
    use HasFactory;
    protected $guarded=[];
    
    public function word()
    {
        return $this->belongsTo(WordQuestion::class);
    }

    public function choice()
    {
        return $this->belongsTo(Choice::class);
    }
    
    public function finished_lesson()
    {
        return $this->belongsTo(FinishedLesson::class);
    }
}
