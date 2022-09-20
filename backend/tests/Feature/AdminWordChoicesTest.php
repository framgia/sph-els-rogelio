<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Support\AuthTrait;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class AdminWordChoicesTest extends TestCase
{
    use RefreshDatabase, WithFaker, AuthTrait, LessonTrait;
    public function test_fetch_lesson_words()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $response = $this->get('api/lessons/'.$lesson->id.'/words');
        $response->assertStatus(200);
    }
    public function test_create_lesson_word_choices()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $data=[
          'word'=>$this->faker->word,
          'usage'=>$this->faker->sentence,
          'choices'=>[
            [
              'choice'=>$this->faker->word,
              'is_correct'=>$this->faker->boolean
            ],
            [
              'choice'=>$this->faker->word,
              'is_correct'=>$this->faker->boolean
            ]
          ]
        ];
        $response = $this->post('api/lessons/'.$lesson->id.'/words',$data);
        $response->assertStatus(200);
    }
    public function test_show_lesson_word_choices()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $this->createChoice($word,2);
        $response = $this->get('api/lessons/'.$lesson->id.'/words/'.$word->id);
        $response->assertStatus(200);
    }
    public function test_show_lesson_word_choices_not_found()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $this->createChoice($word,2);
        $response = $this->get('api/lessons/'.$lesson->id.'/words/999');
        $response->assertStatus(404);
    }
    public function test_fetch_lesson_word_not_found()
    {  
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $this->createChoice($word,2);
        $response = $this->get('api/lessons/999/words');
        $response->assertStatus(404);
    }
    public function test_edit_lesson_word_choices()
    {  
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $choices=$this->createChoice($word,2);
        $data=[
          'word'=>$this->faker->word,
          'usage'=>$this->faker->sentence,
          'choices'=>[
            [
              'id'=>$choices[0]->id,
              'choice'=>$this->faker->word,
              'is_correct'=>$this->faker->boolean
            ],
            [
              'id'=>null,
              'choice'=>$this->faker->word,
              'is_correct'=>$this->faker->boolean
            ]
          ]
        ];
        $response = $this->put('api/lessons/'.$lesson->id.'/words/'.$word->id,$data);
        $response->assertStatus(200);
    }
    public function test_delete_lesson_word_choices()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $word=$this->createWord($lesson);
        $this->createChoice($word,2);
        $response = $this->delete('api/lessons/'.$lesson->id.'/words/'.$word->id);
        $response->assertStatus(200);
    }
    public function test_lesson_words_accessed_by_unauthenticated_user()
    {
        $response = $this->get('api/lessons/1/words',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
    public function test_lesson_words_accessed_by_regular_user()
    {
        $this->createUserAuth();
        $response = $this->get('api/lessons/1/words',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
