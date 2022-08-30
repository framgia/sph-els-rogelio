<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Credentials do not match.', 'errors' => 'Attempt Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$request->user(), 
            'message' => 'Login successful.', 
            'errors' => null
        ],200);
    }
}
