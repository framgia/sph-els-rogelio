<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return response()->json([
            'status' => true,
            'data'=>$request->user(),
            'message' => 'Login successful.', 
            'errors' => null
        ],200);
    }
}
