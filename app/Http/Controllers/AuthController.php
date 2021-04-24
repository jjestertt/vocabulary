<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $rules = [
            'name' => 'required|min:3|max:50',
            'email' => 'required|min:3|max:50|email',
            'password' => 'required|min:3|max:50'
        ];

        $validator = Validator::make($request->only('name', 'email','password'), $rules);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

          $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
          ]);

          return response()->json([$user], 200);
    }

    public function login(Request $request){
        $rules = [
            'email' => 'required|min:3|max:50|email',
            'password' => 'required|min:3|max:50'
        ];

        $validator = Validator::make($request->only('email','password'), $rules);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;


        $expiresIn = 60;
        if($request->input('rememberMe')){
            $expiresIn = 60 * 24 * 7; //one week;
        }

        $cookie = cookie('jwt', $token, $expiresIn);

        return response()->json($user, 200)
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
