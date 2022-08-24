<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users=\App\Models\User::factory(3)->create();
        $admins=\App\Models\User::factory(3)->create([
            'is_admin'=>true
        ]);
        $lessons=\App\Models\Lesson::factory(5)->create();
        for($x=0;$x<count($lessons);$x++){
            $words=\App\Models\WordQuestion::factory(10)->create([
                'lesson_id'=>$lessons[$x]->id
            ]);
            for($y=0;$y<count($words);$y++){
                \App\Models\Choice::factory(4)->create([
                    'word_id'=>$words[$y]->id
                ]);
            }
        }
        $learned1=\App\Models\FinishedLesson::create([
            'user_id'=>$users[0]->id,
            'lesson_id'=>$lessons[0]->id
        ]);
        $items = array(1, 2, 3, 4);
        foreach($learned1->lesson->words as $word){
            \App\Models\LearnedWord::create([
                'finished_lesson_id'=>$learned1->id,
                'word_id'=>$word->id,
                'choice_id'=>$word->choices[array_rand($items)]->id,
            ]);
        }

        $follower1=\App\Models\Follower::create([
            'follower_id'=>$users[0]->id,
            'following_id'=>$users[1]->id
        ]);
        $users[0]->activities()->createMany([
            [
                'activitable_id'=>$follower1->id,
                'activitable_type'=>get_class($follower1),
                'type'=>'follow',
            ],[
                'activitable_id'=>$learned1->id,
                'activitable_type'=>get_class($learned1),
                'type'=>'lesson',
            ],
        ]);
        $users[1]->activities()->createMany([
            [
                'activitable_id'=>$follower1->id,
                'activitable_type'=>get_class($follower1),
                'type'=>'follow',
            ],
        ]);
    }
}
