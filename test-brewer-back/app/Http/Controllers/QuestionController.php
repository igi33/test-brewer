<?php

namespace App\Http\Controllers;
use App\Question;
use App\User;
use App\Answer;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * Question type:
     *      1: checkbox
     *      2: radio
     *      3: input
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

    // Create new Question
    public function store(Request $request)
    {
        $this->validate($request, [
            'question_title' => 'required|max:50',
            'question_content' => 'required|max:255',
            'question_type' => 'required|integer|between:1,3',
            'user_id' => 'required|exists:users,id',
            'answers' => 'required|min:1',
            'answers.*.content' => 'required|max:255',
            'answers.*.correct' => 'required|boolean',
        ]);

        $q_title = $request->question_title;
        $q_content = $request->question_content;
        $q_type = $request->question_type;
        $q_user_id = $request->user_id;
        $answers = $request->answers;

        
        // Store question
        $question = Question::create([
            'question_title' => $q_title,
            'question_content' => $q_content,
            'question_type' => $q_type,
            'user_id' => $q_user_id
        ]);

        // Store answers
        foreach ($answers as $answer) {
            $answer = new Answer([
                'answer_content' => $answer['content'],
                'is_correct' => $answer['correct']
            ]);
            $question->answers()->save($answer);
        }
        
        return response()->json($question);
    }
}