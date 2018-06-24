<?php

namespace App\Http\Controllers;
use App\Test;
use Illuminate\Http\Request;

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

    // Create new Test
    public function store(Request $request)
    {
        $this->validate($request, [
            'test_title' => 'required|max:50',
            'test_description' => 'required|max:255',
            'is_public' => 'boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'questions' => 'required',
            'questions.*.id' => 'required|exists:questions,id',
            'questions.*.weight' => 'required|integer'
        ]);

        $title = $request->test_title;
        $description = $request->test_description;
        $public = $request->has('is_public') ? $request->is_public : 0;
        $user_id = $request->user_id;
        $cat_id = $request->category_id;
        $start_time = $request->start_time;
        $end_time = $request->end_time;
        $questions = $request->questions;
        
        // Store test
        $test = Test::create([
            'test_title' => $title,
            'test_description' => $description,
            'is_public' => $public,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'user_id' => $user_id,
            'category_id' => $cat_id
        ]);
        
        // Store questions in has_question
        foreach ($questions as $i=>$question) {
            $test->questions()->attach($question['id'], [
                'question_weight' => $question['weight'],
                'question_order' => $i+1
            ]);
        }
        
        return response()->json($test);
    }
}