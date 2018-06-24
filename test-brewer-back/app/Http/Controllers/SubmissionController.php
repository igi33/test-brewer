<?php

namespace App\Http\Controllers;
use App\Submission;
use App\Test;
use App\SubmissionAnswer;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubmissionController extends Controller
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
        $submissions = Submission::all();
        return response()->json($submissions);
    }

    public function show($id)
    {
        $submission = Submission::findOrFail($id);
        return response()->json($submission);
    }

    public function answers($id)
    {
        $answers = Submission::findOrFail($id)->answers;
        return response()->json($answers);
    }

    // Create new Submission
    public function store(Request $request)
    {
        $this->validate($request, [
            'test_id' => 'required|exists:tests,id',
            'user_id' => 'required|exists:users,id',
            'answers' => [
                'required',
                'size:' . Test::find($request->test_id)->questions()->count()
            ],
            'answers.*.value' => 'required',
            // Check if all questions are in has_question table
            'answers.*.question_id' => [
                'required',
                'distinct',
                Rule::exists('has_question', 'question_id')->where(function ($query) use ($request) {
                    return $query->where('test_id', $request->test_id);
                })
            ]
        ]);

        // Check if Submission time is within limits
        // CODE...

        $test_id = $request->test_id;
        $user_id = $request->user_id;
        $answers = $request->answers;
        $count = Test::find($request->test_id)->questions()->count();
        $score = 0;

        // Calculate score
        foreach ($answers as $answer) {
            $question = Question::find($answer['question_id']);
            $type = $question->question_type;
            $corrects = $question->answers()->where('is_correct', 1)->get();
            // Text input question
            if ($type == 3) {
                foreach ($corrects as $correct) {
                    if ($answer['value'][0] == $correct['answer_content']) {
                        $score++;
                    }
                }
            // Radio input question
            } else if ($type == 2) {
                $correct = $corrects[0]['id'];
                if ($answer['value'][0] == $correct) {
                    $score++;
                }
            // Checkbox input question
            } else {
                $correct = array_column($corrects->toArray(), 'id');
                foreach ($answer['value'] as  $value) {
                    if (in_array($value, $correct)) {
                        $score++;
                    }
                }
            }
        }

        // Score in Percentage
        $score /= $count;

        // Store Submission
        $submission = Submission::create([
            'test_id' => $test_id,
            'user_id' => $user_id,
            'score' => $score
        ]);

        // Store Submission answers
        foreach ($answers as  $answer) {
            foreach ($answer['value'] as $value) {
                $subAns = new SubmissionAnswer([
                    'answer_value' => $value,
                    'question_id' => $answer['question_id']
                ]);
                $submission->answers()->save($subAns);
            }
        }
        
        return response()->json($submission);
    }
}