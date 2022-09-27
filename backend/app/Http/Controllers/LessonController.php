<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\FinishedLesson;
use App\Models\LearnedWord;
use App\Models\Activity;

class LessonController extends Controller
{
    public function index()
    {
        return Lesson::orderBy('created_at', 'desc')->get();
    }
    
    public function store(Request $request)
    {
        $lesson=Lesson::create([
            'title'=>$request->title,
            'description'=>$request->description
        ]);
        if(!$lesson){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot create new lesson.', 'errors' => 'Create Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$lesson, 
            'message' => 'New lesson successfully created.', 
            'errors' => null
        ],200);
    }
    
    public function show(Lesson $lesson)
    {
        return $lesson;
    }

    public function update(Lesson $lesson,Request $request)
    {
        $lessonUpdate=$lesson->update([
            'title'=>$request->title,
            'description'=>$request->description,
        ]);
        if(!$lessonUpdate){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot update new lesson.', 'errors' => 'Update Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$lessonUpdate, 
            'message' => 'Lesson successfully updated.', 
            'errors' => null
        ],200);
    }

    public function destroy(Lesson $lesson)
    {
        $finishedLessons=FinishedLesson::where('lesson_id',$lesson->id)->get();
        foreach($finishedLessons as $finishedLesson){
          Activity::where([
            ['type','=','lesson'],
            ['activitable_id','=',$finishedLesson->id]
          ])->delete();
          LearnedWord::where('finished_lesson_id',$finishedLesson->id)->delete();
        }
        FinishedLesson::where('lesson_id',$lesson->id)->delete();
        $lessonDelete=$lesson->delete();
        if(!$lessonDelete){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot delete lesson.', 'errors' => 'Delete Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$lessonDelete, 
            'message' => 'Lesson successfully deleted.', 
            'errors' => null
        ],200);
    }
}
