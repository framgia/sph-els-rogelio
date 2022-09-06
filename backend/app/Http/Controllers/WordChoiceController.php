<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\WordQuestion;

class WordChoiceController extends Controller
{
    public function index($id)
    {
        return Lesson::where('id',$id)->with(['words' => function ($query) {
          $query->orderBy('created_at','DESC');
        },'words.choices'])->first();
    }
    public function store(Request $request, $id)
    {
        $word=WordQuestion::create([
            'lesson_id'=>$id,
            'word'=>$request->word,
            'usage'=>$request->usage,
        ]);
        $word=$word->choices()->createMany($request->choices);
        if(!$word){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot create new word.', 'errors' => 'Create Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$word, 
            'message' => 'New word successfully created.', 
            'errors' => null
        ],200); 
    }
}
