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
            'password' => 'required|max:60',
        ]);
        
        $username = $request->input('username');
        $email = $request->input('email');
        $password = app('hash')->make($request->input('password'));

        $user = User::create([
            'username' => $username,
            'email' => $email,
            'password' => $password,
        ]);
        
        // TODO: Add location header for the newly created resource (absolute URL)
        return response()->json($user, 201);
    }

    /**
     * Update the specified user.
     *
     * @param  Request  $request
     * @param  string  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        // AUTHORIZATION???

        $this->validate($request, [
            'username' => 'required|unique:users|max:50',
            'email' => 'required|email|unique:users|max:100',
            'password' => 'required|max:60',
        ]);

        $user = User::findOrFail($id);
        
        $username = $request->input('username');
        $email = $request->input('email');
        $password = app('hash')->make($request->input('password'));

        $user->username = $username;
        $user->email = $email;
        $user->password = $password;
        $user->save();

        return response()->json($user, 200);
    }

    /*
    public function destroy($id)
    {
        if (User::where('id', '=', $id)->count() === 0)
        {
            return response('', 404);
        }

        User::destroy($id);

        return response('', 204);
    }*/
}
