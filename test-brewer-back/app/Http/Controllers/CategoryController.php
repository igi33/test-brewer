<?php

namespace App\Http\Controllers;
use App\Category;
use Illuminate\Http\Request;

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

    // Create new Category
    public function store(Request $request)
    {
        $this->validate($request, [
            'category_name' => 'required|unique:categories|max:50',
            'category_description' => 'required|max:255',
        ]);
        
        $categoryName = $request->input('category_name');
        $categoryDescription = $request->input('category_description');

        $category = Category::create([
            'category_name' => $categoryName,
            'category_description' => $categoryDescription
        ]);
        
        return response()->json($category, 201);
    }

    /**
     * Update the specified category.
     *
     * @param  Request  $request
     * @param  string  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'category_name' => 'required|unique:categories|max:50',
            'category_description' => 'required|max:255',
        ]);

        $category = Category::findOrFail($id);
        
        $categoryName = $request->input('category_name');
        $categoryDescription = $request->input('category_description');

        $category->fill([
            'category_name' => $categoryName,
            'category_description' => $categoryDescription
        ]);
        $category->save();

        return response()->json($category, 200);
    }

    
    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return response('', 204);
    }
}
