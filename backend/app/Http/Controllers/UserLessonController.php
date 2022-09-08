<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Models\Lesson;
use App\Models\FinishedLesson;

class UserLessonController extends Controller
{
    public function index(Request $request)
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
        switch($request->query('filter')){
          case 'Taken':
            $userLessons=collect($userLessons)->where('is_taken', true)->all();
            break;
          case 'Untaken':
            $userLessons=collect($userLessons)->where('is_taken', false)->all();
            break;
          default:
            break;
        }
        return array_values($userLessons);
    }
    public function show(Request $request, $lessonID)
    {
        $userLessons=Lesson::where('id',$lessonID)->with('words.choices')->first();
        return [
          'lesson'=>$userLessons,
          'is_taken'=>false
        ];
    }
}
