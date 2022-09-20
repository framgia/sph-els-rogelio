<?php

namespace Tests\Unit;

use App\Models\Activity;
use App\Models\FinishedLesson;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Support\AuthTrait;
use Tests\Support\FollowTrait;
use Tests\Support\LessonTrait;

class UserTest extends TestCase
{
    use RefreshDatabase, AuthTrait, LessonTrait, FollowTrait;
    public function test_user_has_followers_followings()
    {
        $users=$this->createUser(2);
        $this->followUser($users[0],$users[1]);
        $this->assertInstanceOf(User::class, $users[1]->followers[0]); 
        $this->assertInstanceOf(User::class, $users[0]->followings[0]); 
        $this->assertEquals(1, $users[1]->followers->count()); 
        $this->assertEquals(1, $users[0]->followings->count()); 
    }
    public function test_user_has_finished_lessons()
    {
        $user=$this->createUser();
        $lesson=$this->createLessonWithWordsChoices(3,2);
        $this->createFinishedLessonWithLearnedWords($user,$lesson,2);
        $this->assertInstanceOf(FinishedLesson::class, $user->finished_lessons[0]); 
        $this->assertEquals(1, $user->finished_lessons->count()); 
    }
    public function test_user_has_activities()
    {
        $users=$this->createUser(2);
        $follow=$this->followUser($users[0],$users[1]);
        $activity=$users[0]->activities()->create([
          'activitable_id'=>$follow->id,
          'activitable_type'=>get_class($follow),
          'type'=>'follow',
        ]);
        $this->assertInstanceOf(Activity::class, $activity);
        $this->assertEquals(1, $users[0]->activities->count());  
    }
}
