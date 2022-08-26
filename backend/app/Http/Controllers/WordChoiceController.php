<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;

class WordChoiceController extends Controller
{
    public function index($id)
    {
        return Lesson::where('id',$id)->with('words.choices')->first();
    }
}
