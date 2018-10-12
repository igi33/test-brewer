<?php

namespace App\Http\Controllers;
use App\Test;
use App\User;
use Illuminate\Http\Request;
use App\Category;
use App\Answer;

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
        $test = Test::with('questions', 'user', 'category')->with('questions.answers')->findOrFail($id);
        return response()->json($test);
    }

    public function infoAll()
    {   
        
        $tests = Test::with('user', 'category')->get();
        return response()->json($tests);
    }

    public function info($id)
    {
        $test = Test::with('user', 'category')->findOrFail($id);
        return response()->json($test);
    }

    public function infoAllPage(Request $request) {
        $cat = $request->input('cat');

        if ($cat == 0) {
            $tests = Test::with('user', 'category')
                ->orderBy('start_time')
                ->simplePaginate(20);
        } else {
            $tests = Test::with('user', 'category')
                ->where('category_id',$cat)
                ->orderBy('start_time')
                ->simplePaginate(20);
        }
        return response()->json($tests);
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
            'category_id' => 'required|exists:categories,id',
            'questions' => 'required',
            'questions.*.id' => 'required|exists:questions,id',
            'questions.*.weight' => 'required|integer'
        ]);

        $title = $request->input('test_title');
        $description = $request->input('test_description');
        $public = $request->input('is_public', 0);
        $userID = $request->auth->id;
        $catID = $request->input('category_id');
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');
        $questions = $request->input('questions');
        
        // Store test
        $test = Test::create([
            'test_title' => $title,
            'test_description' => $description,
            'is_public' => $public,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'user_id' => $userID,
            'category_id' => $catID
        ]);
        
        // Store questions in has_question
        foreach ($questions as $i=>$question) {
            $test->questions()->attach($question['id'], [
                'question_weight' => $question['weight'],
                'question_order' => $i+1
            ]);
        }
        
        return response()->json($test, 201);
    }

    /**
     * Update the specified test.
     *
     * @param  Request  $request
     * @param  string  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $test = Test::findOrFail($id);

        // Authorization
        if (Gate::forUser($request->auth)->denies('update-test', $test)) {
            // The user can't update the test...
            return response('Unauthorized action.', 403);
        }

        $this->validate($request, [
            'test_title' => 'required|max:50',
            'test_description' => 'required|max:255',
            'is_public' => 'boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'category_id' => 'required|exists:categories,id',
            'questions' => 'required',
            'questions.*.id' => 'required|exists:questions,id',
            'questions.*.weight' => 'required|integer'
        ]);


        $title = $request->input('test_title');
        $description = $request->input('test_description');
        $public = $request->input('is_public', 0);
        $userID = $request->auth->id;
        $catID = $request->input('category_id');
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');
        $questions = $request->input('questions');
        
        // Update test
        $test->fill([
            'test_title' => $title,
            'test_description' => $description,
            'is_public' => $public,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'user_id' => $userID,
            'category_id' => $catID
        ]);
        $test->save();

        // Delete old questions
        $test->questions()->detach();

        // Store questions in has_question
        foreach ($questions as $i=>$question) {
            $test->questions()->attach($question['id'], [
                'question_weight' => $question['weight'],
                'question_order' => $i+1
            ]);
        }
        
        return response()->json($test, 200);
    }

    public function destroy($id)
    {
        Test::findOrFail($id)->delete();

        return response('', 204);
    }
}