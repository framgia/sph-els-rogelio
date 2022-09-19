<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
    public function changeGeneralInfo(Request $request)
    {
        $user=User::where('id',$request->user()->id)->update([
          'name'=>$request->name,
          'email'=>$request->email
        ]);
        
        if(!$user){
          return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot update user.', 'errors' => 'Update Error'], 500);
        }
        return response()->json([
            'status' => true,
            'data'=>$user, 
            'message' => 'User general information successfully updated.', 
            'errors' => null
        ],200);
    }
}
