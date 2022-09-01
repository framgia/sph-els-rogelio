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
          'activities.activitable',
          'finished_lessons'
        ])->findOrFail($id);
        return $user;
    }
}
