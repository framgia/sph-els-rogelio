<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;

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
