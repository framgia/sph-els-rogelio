<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Follower;

class DashboardController extends Controller
{
    public function index()
    {
        $user=User::where('id',Auth::user()->id)->with([
          'activities.activitable',
          'followings.activities.activitable',
          'followers',
          'finished_lessons'
        ])->first();
        return $user;
    }
}
