<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Lesson;
use App\Models\FinishedLesson;

class UserLessonController extends Controller
{
    public function index()
    {
        $lessons=Lesson::with('words')->get();
        $userLessons=[];
        foreach($lessons as $lesson){
          $is_taken=FinishedLesson::where([
            ['user_id','=',Auth::user()->id],
            ['lesson_id','=',$lesson->id]
          ])->exists();
          $userLessons[]=[
            'lesson'=>$lesson,
            'is_taken'=>$is_taken
          ];
        }
        return $userLessons;
    }
}
