<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function tests($id)
    {
        $tests = User::findOrFail($id)->tests;
        return response()->json($tests);
    }

    public function questions($id)
    {
        $questions = User::findOrFail($id)->questions;
        return response()->json($questions);
    }

    public function submissions($id)
    {
        $submissions = User::findOrFail($id)->submissions;
        return response()->json($submissions);
    }

    // Create new User
    public function store(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|unique:users|max:50',
            'email' => 'required|email|unique:users|max:100',
            'password' => 'required|max:60'
        ]);
        
        $username = $request->username;
        $email = $request->email;
        $password = app('hash')->make($request->password);

        $user = User::create([
            'username' => $username,
            'email' => $email,
            'password' => $password
        ]);
        
        return response()->json($user, 201);
    }
}
