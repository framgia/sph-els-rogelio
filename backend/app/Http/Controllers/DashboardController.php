<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user=User::where('id',Auth::user()->id)->with([
          'finished_lessons.learned_words'=>function ($query) {
            $query->whereHas('choice', function($q){
              $q->where('is_correct',true);
            });
          }
      ]);
        return $user->first();
    }
}
