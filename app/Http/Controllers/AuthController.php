<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request){
          $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
          ]);

          return response()->json([$user], 200);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 60);

        return response()->json(["user" => $user, 'token' => $token] , 200)
            ->withCookie($cookie);
    }

    public function user(){
        return response()->json(Auth::user(), 200);
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');
        return response()->json(['message' => 'Success'] , 200)
            ->withCookie($cookie);
    }
}
