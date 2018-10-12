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
                // 'size:' . Test::find($request->test_id)->questions()->count()

            ],
            // 'answers.*.value' => 'required',
            // Check if all questions are in has_question table
            'answers.*.question_id' => [
                'required',
                'distinct',
                Rule::exists('has_question', 'question_id')->where(function ($query) use ($request) {
                    return $query->where('test_id', $request->input('test_id'));
                })
            ]
        ]);

        // Check if Submission time is within limits
        // CODE...

        $testID = $request->input('test_id');
        $userID = $request->input('user_id');
        $answers = $request->input('answers');

        $testQuestions = Test::find($request->input('test_id'))->questions;
        $count = $testQuestions->count();
        $score = 0;

        $weights = [];
        foreach ($testQuestions as $question) {
            $weights[$question['id']] = $question->pivot['question_weight'];
        }
        $weightSum = array_sum($weights);

        // Calculate score
        foreach ($answers as $answer) {
            $qId = $answer['question_id'];

            $question = Question::find($qId);
            $type = $question->question_type;
            $weight = $weights[$qId];
            $correctAnswers = $question->answers()->where('is_correct', 1)->get();
            $points = 0;

            // Text input question
            if ($type === 3) {
                foreach ($correctAnswers as $correct) {
                    if ($answer['value'] == $correct['answer_content']) {
                        $points = 1;
                        break;
                    }
                }
            // Radio input question
            } elseif ($type === 2) {
                $correct = $correctAnswers[0]['id'];
                if ($answer['value'] == $correct) {
                    $points = 1;
                }
            // Checkbox input question
            } elseif ($type === 1) {
                $correct = array_column($correctAnswers->toArray(), 'id');
                $partialScore = 0;
                foreach ($answer['value'] as $value) {
                    if (in_array($value, $correct)) {
                        ++$partialScore;
                    } else {
                        --$partialScore;
                        if ($partialScore < 0) {
                            $partialScore = 0;
                        }
                    }
                }
                $points = $partialScore / count($correct);
            }

            $score += $points * $weight / $weightSum;
        }

        // Store Submission
        $submission = Submission::create([
            'test_id' => $testID,
            'user_id' => $userID,
            'score' => $score,
        ]);

        // Store Submission answers
        foreach ($answers as $answer) {
            foreach ((array) $answer['value'] as $value) {
                $subAns = new SubmissionAnswer([
                    'answer_value' => $value,
                    'question_id' => $answer['question_id'],
                ]);
                $submission->answers()->save($subAns);
            }
        }
        
        return response()->json($submission, 201);
    }
}
