<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Models\Lesson;
use App\Models\FinishedLesson;
use App\Models\WordQuestion;
use App\Models\Choice;
use App\Models\Activity;

class UserLessonController extends Controller
{
    public function index(Request $request)
    {
        $lessons=Lesson::whereHas('words')->with('words')->get();
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
        if(count($userLessons->words)){
          $is_taken=FinishedLesson::where([
            ['user_id','=',Auth::user()->id],
            ['lesson_id','=',$lessonID]
          ])->exists();
          return [
            'lesson'=>$userLessons,
            'is_taken'=>$is_taken
          ];
        }else{
          return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot validate answers.', 'errors' => 'Validation Error'], 500);
        }
    }
    public function validateAnswers(Request $request, $lessonID)
    {
        $finishedLesson=FinishedLesson::create([
          'user_id'=>Auth::user()->id,
          'lesson_id'=>$lessonID
        ]);
        Activity::create([
          'user_id'=>Auth::user()->id,
          'activitable_id'=>$finishedLesson->id,
          'activitable_type'=>get_class($finishedLesson),
          'type'=>'lesson',
        ]);
        foreach($request->words as $word){
          $wordExist=WordQuestion::where([
            ['id','=',$word['id']],
            ['lesson_id','=',$lessonID],
          ])->exists();
          $choiceExist=Choice::where([
            ['id','=',$word['choice_id']],
            ['word_question_id','=',$word['id']],
          ])->exists();
          if($wordExist && $choiceExist){
            $finishedLesson->learned_words()->create([
              'word_question_id'=>$word['id'],
              'choice_id'=>$word['choice_id']
            ]);
          }
        }
        if(!$finishedLesson){
          return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot validate answers.', 'errors' => 'Validation Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$finishedLesson, 
            'message' => 'You have successfully finished this lesson.', 
            'errors' => null
        ],200);
    }
    public function showResult(Request $request, $lessonID)
    {
        $finishedLesson=FinishedLesson::where([
          ['user_id','=',Auth::user()->id],
          ['lesson_id','=',$lessonID]
        ])->with('lesson','learned_words.word_question.choices','learned_words.choice')->first();
        $is_taken=FinishedLesson::where([
          ['user_id','=',Auth::user()->id],
          ['lesson_id','=',$lessonID]
        ])->exists();
        return [
          'lesson'=>$finishedLesson,
          'is_taken'=>$is_taken
        ];
    }
}
