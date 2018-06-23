<?php

namespace App\Http\Controllers;
use App\Submission;

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
}