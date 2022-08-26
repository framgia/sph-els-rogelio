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
}
