<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Choice extends Model
{
    use HasFactory, SoftDeletes;
    public function word()
    {
        return $this->belongsTo(WordQuestion::class,'word_id','id');
    }
    public function learned_words_choice()
    {
        return $this->hasMany(LearnedWord::class,'choice_id','id');
    }
}