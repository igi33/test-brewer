<?php

namespace App\Http\Controllers;
use App\Test;

class TestController extends Controller
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
        $tests = Test::all();
        return response()->json($tests);
    }

    public function show($id)
    {
        $test = Test::findOrFail($id);
        return response()->json($test);
    }

    public function questions($id)
    {
        $questions = Test::findOrFail($id)->questions;
        return response()->json($questions);
    }

    public function submissions($id)
    {
        $submissions = Test::findOrFail($id)->submissions;
        return response()->json($submissions);
    }
}