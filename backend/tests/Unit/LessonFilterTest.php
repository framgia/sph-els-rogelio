<?php

namespace Tests\Unit;

use App\Models\FinishedLesson;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\AuthTrait;
use Tests\Support\LessonTrait;
use Tests\TestCase;

class LessonFilterTest extends TestCase
{
    use RefreshDatabase,LessonTrait,AuthTrait;
    public function test_lesson_filter_is_working()
    {
        $user=$this->createUser();
        $lessons=$this->createLesson(5);
        $user->finished_lessons()->create([
          'user_id'=>$user->id,
          'lesson_id'=>$lessons[0]->id
        ]);
        foreach($lessons as $lesson){
          $is_taken=FinishedLesson::where([
            ['user_id','=',$user->id],
            ['lesson_id','=',$lesson->id]
          ])->exists();
          $userLessons[]=[
            'lesson'=>$lesson,
            'is_taken'=>$is_taken
          ];
        }
        // Filter Taken Lessons
        $taken=collect($userLessons)->where('is_taken', true)->all();
        $this->assertEquals(1, count($taken)); 
        // Filter Untaken Lessons
        $untaken=collect($userLessons)->where('is_taken', false)->all();
        $this->assertEquals(4, count($untaken)); 
    }
}
