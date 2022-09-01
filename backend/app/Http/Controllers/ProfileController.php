<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function show($id)
    {
        $user=User::with([
          'followers',
          'followings',
          'finished_lessons.learned_words'=>function ($query) {
            $query->whereHas('choice', function($q){
              $q->where('is_correct',true);
            });
          }
        ])->findOrFail($id);
        return $user;
    }
}
