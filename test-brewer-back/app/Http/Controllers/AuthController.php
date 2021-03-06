<?php

namespace App\Http\Controllers;

use Validator;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller as BaseController;

class AuthController extends BaseController 
{
    /**
     * The request instance.
     *
     * @var \Illuminate\Http\Request
     */
    private $request;
    /**
     * Create a new controller instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(Request $request) {
        $this->request = $request;
    }
    /**
     * Create a new token.
     * 
     * @param  \App\User   $user
     * @return string
     */
    protected function jwt(User $user) {
        $payload = [
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $user->id, // Subject of the token
            'username' => $user->username,
            'email' => $user->email,
            'isadmin' => $user->is_admin,
            'iat' => time(), // Time when JWT was issued. 
            'exp' => time() + 60*60*24*2 // Expiration time
        ];
        
        // As you can see we are passing `JWT_SECRET` as the second parameter that will 
        // be used to decode the token in the future.
        return JWT::encode($payload, env('JWT_SECRET'));
    } 
    /**
     * Authenticate a user and return the token if the provided credentials are correct.
     * 
     * @return mixed
     */
    public function authenticate() {
        $this->validate($this->request, [
            'username' => 'required',
            'password'  => 'required'
        ]);
        // Find the user by username
        $user = User::where('username', $this->request->input('username'))->first();
        
        // Verify the password and generate the token
        if ($user && Hash::check($this->request->input('password'), $user->password)) {
            return response()->json($this->jwt($user), 200);
        }
        // Bad Request response
        return response()->json([
            'error' => 'Username or password is wrong.'
        ], 400);
    }
}