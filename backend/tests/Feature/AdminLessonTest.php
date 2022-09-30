<?php

namespace Tests\Feature;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\Support\AuthTrait;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class AdminLessonTest extends TestCase
{
    use RefreshDatabase, WithFaker, AuthTrait, LessonTrait;
    public function test_fetch_all_lessons()
    {
        $this->createUserAuth(null,true);
        $response=$this->get('api/lessons');
        $response->assertStatus(200);
    }
    public function test_create_a_lesson()
    {
        $this->createUserAuth(null,true);
        $lesson=[
          'title'=>$this->faker->sentence,
          'description' => $this->faker->paragraph
        ];
        $response=$this->post('api/lessons',$lesson);
        $response->assertStatus(200);
    }
    public function test_edit_a_lesson()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $data=[
          'title'=>$this->faker->sentence,
          'description' => $this->faker->paragraph
        ];
        $response=$this->put('api/lessons/'.$lesson->id,$data);
        $response->assertStatus(200);
    }
    public function test_edit_a_lesson_not_found()
    {
        $this->createUserAuth(null,true);
        $data=[
          'title'=>$this->faker->sentence,
          'description' => $this->faker->paragraph
        ];
        $response=$this->put('api/lessons/999',$data);
        $response->assertStatus(404);
    }
    public function test_delete_a_lesson()
    {
        $this->createUserAuth(null,true);
        $lesson=$this->createLesson();
        $response=$this->delete('api/lessons/'.$lesson->id);
        $response->assertStatus(200);
    }
    public function test_lesson_accessed_by_regular_user()
    {
        $this->createUserAuth();
        $response=$this->get('api/lessons');
        $response->assertStatus(401);
    }
    public function test_lesson_accessed_by_unauthenticated_user()
    {
        $response=$this->get('api/lessons',['Accept'=>'application/json']);
        $response->assertStatus(401);
    }
}
