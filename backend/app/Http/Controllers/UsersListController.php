<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersListController extends Controller
{
    public function users()
    {
      return User::where('is_admin',false)->orderBy('name','ASC')->with('followers')->get();
    }
    public function admins()
    {
      return User::where('is_admin',true)->orderBy('name','ASC')->with('followers')->get();
    }
}
