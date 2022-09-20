<?php

namespace Tests\Feature;

use App\Models\Choice;
use App\Models\LearnedWord;
use App\Models\Lesson;
use App\Models\User;
use App\Models\WordQuestion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class UserLessonTest extends TestCase
{
    use RefreshDatabase,AuthTrait,LessonTrait;
    public function test_user_lesson_display_is_working()
    {
        $this->createUserAuth();
        $response = $this->get('api/user/lessons');
        $response->assertStatus(200);
    }
    public function test_user_lesson_is_accessed_unauthenticated()
    {
        $response = $this->get('api/user/lessons',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
    public function test_show_lesson_quiz_untaken()
    {
        $this->createUserAuth();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $response = $this->get('api/user/lessons/'.$lesson->id.'/take');
        $response->assertStatus(200);
        $data=$response->getOriginalContent();
        $this->assertEquals(false,$data['is_taken']);
    }
    public function test_show_lesson_quiz_taken()
    {
        $user=$this->createUserAuth();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $user->finished_lessons()->create([
          'user_id'=>$user->id,
          'lesson_id'=>$lesson->id
        ]);
        $response = $this->get('api/user/lessons/'.$lesson->id.'/take');
        $response->assertStatus(200);
        $data=$response->getOriginalContent();
        $this->assertEquals(true,$data['is_taken']);
    }
    public function test_validate_lesson_quiz()
    {
        $this->createUserAuth();
        $answers=[];
        $lesson=$this->createLesson();
        $words=$this->createWord($lesson,3);
        foreach($words as $word){
            $choices=$this->createChoice($word,2);
            $answers[]=[
              'id'=>$word->id,
              'choice_id'=>$choices[0]->id
            ];
        }
        $response = $this->post('api/user/lessons/'.$lesson->id.'/validate',['words'=>$answers]);
        $response->assertStatus(200);
    }
    public function test_show_lesson_quiz_result_untaken()
    {
        $this->createUserAuth();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $response = $this->get('api/user/lessons/'.$lesson->id.'/result');
        $response->assertStatus(200);
        $data=$response->getOriginalContent();
        $this->assertEquals(false,$data['is_taken']);
    }
    public function test_show_lesson_quiz_result_taken()
    {
        $user=$this->createUserAuth();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $user->finished_lessons()->create([
          'lesson_id'=>$lesson->id
        ]);
        $response = $this->get('api/user/lessons/'.$lesson->id.'/result');
        $response->assertStatus(200);
        $data=$response->getOriginalContent();
        $this->assertEquals(true,$data['is_taken']);
    }
}
