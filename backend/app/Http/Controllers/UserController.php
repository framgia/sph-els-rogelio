<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
    public function changePassword(Request $request)
    {
        if(Hash::check($request->password,$request->user()->password)){
          $user=User::where('id',$request->user()->id)->update([
            'password'=>Hash::make($request->newPassword)
          ]);
          if(!$user){
            return response()->json(['status' => false, 'data'=>null, 'message' => 'Cannot update user password.', 'errors' => 'Update Error'], 500);
          }
          return response()->json([
              'status' => true,
              'data'=>$user, 
              'message' => 'User password successfully updated.', 
              'errors' => null
          ],200);
        }else{
          return response()->json(['status' => false, 'data'=>null, 'message' => 'Invalid current password', 'errors' => 'Current password error'], 500);
        }
    }
}
