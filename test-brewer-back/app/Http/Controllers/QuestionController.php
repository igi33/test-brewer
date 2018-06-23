<?php

namespace App\Http\Controllers;
use App\Question;

class QuestionController extends Controller
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
        $questions = Question::all();
        return response()->json($questions);
    }

    public function show($id)
    {
        $question = Question::findOrFail($id);
        return response()->json($question);
    }

    public function tests($id)
    {
        $tests = Question::findOrFail($id)->tests;
        return response()->json($tests);
    }

    public function answers($id)
    {
        $answers = Question::findOrFail($id)->answers;
        return response()->json($answers);
    }
}