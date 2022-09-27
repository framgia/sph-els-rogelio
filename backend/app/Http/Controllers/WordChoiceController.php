<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\WordQuestion;
use App\Models\LearnedWord;
use App\Models\Choice;

class WordChoiceController extends Controller
{
    public function index($id)
    {
        return Lesson::with(['words' => function ($query) {
          $query->orderBy('created_at','DESC');
        },'words.choices'])->findOrFail($id);
    }
    public function show($lessonID, $wordID)
    {
        $word=WordQuestion::where([
          ['id','=',$wordID],
          ['lesson_id','=',$lessonID],
        ])->firstOrFail();
        $lesson=Lesson::where('id',$lessonID)->with([
          'words' => function($query) use ($word){
            $query->where('id', $word->id)->with('choices');
          }
        ]);
        return $word?$lesson->first():$word;
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
    public function update(Request $request, $lessonID, $wordID)
    {
        $word=WordQuestion::where('id',$wordID)->update([
          'word'=>$request->word,
          'usage'=>$request->usage,
        ]);
        $choice_ids=[];
        foreach($request->choices as $choice){
          if($choice['id'] != null){
            Choice::where('id',$choice['id'])->update([
              'choice'=>$choice['choice'],
              'is_correct'=>$choice['is_correct']
            ]);
            $choice_ids[]=$choice['id'];
          }else{
            $temp=Choice::create([
              'word_question_id'=>$wordID,
              'choice'=>$choice['choice'],
              'is_correct'=>$choice['is_correct']
            ]);
            $choice_ids[]=$temp->id;
          }
        }
        Choice::where('word_question_id',$wordID)->whereNotIn('id',$choice_ids)->delete();
        LearnedWord::where('word_question_id',$wordID)->whereNotIn('choice_id',$choice_ids)->delete();
        if(!$word){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot update word and choices.', 'errors' => 'Update Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$word, 
            'message' => 'Word and choices successfully updated.', 
            'errors' => null
        ],200);
    }
    public function destroy($lessonID, $wordID)
    {
        LearnedWord::where('word_question_id',$wordID)->delete();
        Choice::where('word_question_id',$wordID)->delete();
        $word=WordQuestion::where('id',$wordID)->delete();
        if(!$word){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot delete word.', 'errors' => 'Delete Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$word, 
            'message' => 'Word and choices successfully deleted.', 
            'errors' => null
        ],200);
    }
}
