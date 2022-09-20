<?php

namespace Tests\Unit;

use App\Models\Lesson;
use App\Models\WordQuestion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class LessonTest extends TestCase
{
    use RefreshDatabase, LessonTrait;
    public function test_lesson_has_words()
    {
        $lesson=$lesson=$this->createLesson();
        $this->createWord($lesson,3);
        $this->assertInstanceOf(WordQuestion::class, $lesson->words[0]); 
        $this->assertEquals(3, $lesson->words->count()); 
    }
}
