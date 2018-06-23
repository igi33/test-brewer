<?php

namespace App\Http\Controllers;

use App\User;

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
}
