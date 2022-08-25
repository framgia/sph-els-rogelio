<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['unique:users'],
        ]);
        if($validator->fails()) {
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Email already used', 'errors' => $validator->errors()], 500);
        }
        $user=User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'status' => true,
            'data'=>$user, 
            'message' => 'Registration successful. You can now login.', 
            'errors' => null
        ],200);
    }
}
