<?php

namespace App\Http\Controllers;
use App\Category;

class CategoryController extends Controller
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
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function tests($id)
    {
        $tests = Category::findOrFail($id)->tests;
        return response()->json($tests);
    }

    public function questions($id)
    {
        $tests = Category::findOrFail($id)->tests;
        $questions = [];

        foreach ($tests as $test) {
            $questions = array_merge($questions, $test->questions->toArray());
        }

        return response()->json($questions);
    }
}