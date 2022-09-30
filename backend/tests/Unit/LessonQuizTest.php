<?php

namespace Tests\Unit;

use App\Models\LearnedWord;
use App\Models\Lesson;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\AuthTrait;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class LessonQuizTest extends TestCase
{
    use RefreshDatabase, AuthTrait, LessonTrait;
    public function test_lesson_is_finished()
    {
        $user=$this->createUser();
        $lesson=$this->createLesson();
        $learned=$this->createFinishedLesson($user,$lesson);
        $this->assertInstanceOf(Lesson::class, $learned->lesson); 
        $this->assertEquals(1, $learned->count()); 
    }
    public function test_finished_lesson_has_learned_words()
    {
        $user=$this->createUser();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $learned=$this->createFinishedLessonWithLearnedWords($user,$lesson,2);
        $this->assertInstanceOf(LearnedWord::class, $learned->learned_words[0]); 
        $this->assertEquals(3, $learned->learned_words->count()); 
    }
    public function test_count_correct_learned_words()
    {
        $user=$this->createUser();
        $lesson=$this->createLesson();
        $words=$this->createWord($lesson,3);
        $this->createChoices($words,2,true);
        $learned=$this->createFinishedLessonWithLearnedWords($user,$lesson,2);
        $correctWordCount=$learned->learned_words->filter(function ($item) {
          return $item->choice->is_correct;
        })->values()->count();
        $incorrectWordCount=$learned->learned_words->filter(function ($item) {
          return !$item->choice->is_correct;
        })->values()->count();
        $this->assertEquals(3, $correctWordCount); 
        $this->assertEquals(0, $incorrectWordCount); 
    }
}
