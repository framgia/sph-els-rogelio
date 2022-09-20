<?php
namespace Tests\Support;

use App\Models\Choice;
use App\Models\FinishedLesson;
use App\Models\LearnedWord;
use App\Models\Lesson;
use App\Models\User;
use App\Models\WordQuestion;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;

trait LessonTrait {
    use WithFaker;
    public function createLesson($count=null) {
        return Lesson::factory($count)->create();
    }
    public function createWord($lesson,$wordCount=null){
      return WordQuestion::factory($wordCount)->create([
        'lesson_id'=>$lesson->id
      ]);
    }
    public function createChoice($word,$choiceCount=null,$choice_isCorrect=null){
      return Choice::factory($choiceCount)->create([
        'word_question_id'=>$word->id,
        'is_correct'=>$choice_isCorrect??$this->faker->boolean
      ]);
    }
    public function createLessonWithWordsChoices($wordCount=null,$choiceCount=null) {
        $lesson=$this->createLesson();
        $words=$this->createWord($lesson,$wordCount);
        foreach($words as $word){
            $this->createChoice($word,$choiceCount);
        }
        return $lesson;
    }
    public function createChoices($words,$choiceCount=null,$choice_isCorrect=null){
      foreach($words as $word){
        $this->createChoice($word,$choiceCount,$choice_isCorrect);
      }
    }
    public function createFinishedLesson($user,$lesson) {
        return FinishedLesson::create([
          'user_id'=>$user->id,
          'lesson_id'=>$lesson->id
        ]);
    }
    public function createLearnedWord($finishedLesson,$word,$choiceCount) {
      return LearnedWord::create([
          'finished_lesson_id'=>$finishedLesson->id,
          'word_question_id'=>$word->id,
          'choice_id'=>$word->choices[random_int(0,$choiceCount-1)]->id,
      ]);
    }
    public function createFinishedLessonWithLearnedWords($user,$lesson,$choiceCount) {
        $learned=$this->createFinishedLesson($user,$lesson);
        foreach($learned->lesson->words as $word){
          $this->createLearnedWord($learned,$word,$choiceCount);
        }
        return $learned;
    }
}