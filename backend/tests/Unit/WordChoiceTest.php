<?php

namespace Tests\Unit;

use App\Models\Choice;
use App\Models\Lesson;
use App\Models\WordQuestion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class WordChoiceTest extends TestCase
{
    use RefreshDatabase,LessonTrait;
    public function test_word_has_choices()
    {
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $this->createChoice($word,2);
        $this->assertInstanceOf(Choice::class, $word->choices[0]); 
        $this->assertEquals(2, $word->choices->count()); 
    }
}
