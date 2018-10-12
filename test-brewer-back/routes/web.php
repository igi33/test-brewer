<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Home Page
$router->get('/', function () use ($router) {
    return 'Home Page!';
});

// Store User --> Signup
$router->post('users', ['uses' => 'UserController@store']);

// Authenticate User --> Login
$router->post('auth/login', ['uses' => 'AuthController@authenticate']);

// Protected group
$router->group(['middleware' => 'jwt.auth'], function() use ($router) {
    // Users
    $router->get('users', ['uses' => 'UserController@index']);
    $router->get('users/{id}', ['uses' => 'UserController@show']);
    $router->put('users/{id}', ['uses' => 'UserController@update']);
    // $router->delete('users/{id}', ['uses' => 'UserController@destroy']);
    $router->get('users/{id}/tests', ['uses' => 'UserController@tests']);
    $router->get('users/{id}/questions', ['uses' => 'UserController@questions']);
    $router->get('users/{id}/submissions', ['uses' => 'UserController@submissions']);
    
    // Categories
    $router->get('categories', ['uses' => 'CategoryController@index']);
    $router->post('categories', ['uses' => 'CategoryController@store']);
    $router->get('categories/{id}', ['uses' => 'CategoryController@show']);
    $router->put('categories/{id}', ['uses' => 'CategoryController@update']);
    $router->delete('categories/{id}', ['uses' => 'CategoryController@destroy']);
    $router->get('categories/{id}/tests', ['uses' => 'CategoryController@tests']);
    $router->get('categories/{id}/questions', ['uses' => 'CategoryController@questions']);
    
    // Tests
    $router->get('tests', ['uses' => 'TestController@index']);
    $router->post('tests', ['uses' => 'TestController@store']);
    $router->get('tests/{id}', ['uses' => 'TestController@show']);
    $router->put('tests/{id}', ['uses' => 'TestController@update']);
    $router->delete('tests/{id}', ['uses' => 'TestController@destroy']);
    $router->get('tests/{id}/questions', ['uses' => 'TestController@questions']);
    $router->get('tests/{id}/submissions', ['uses' => 'TestController@submissions']);
    $router->get('testsInfo', ['uses' => 'TestController@infoAllPage']);
    $router->get('tests/{id}/info', ['uses' => 'TestController@info']);

    // Questions
    $router->get('questions', ['uses' => 'QuestionController@index']);
    $router->post('questions', ['uses' => 'QuestionController@store']);
    $router->get('questions/{id}', ['uses' => 'QuestionController@show']);
    $router->put('questions/{id}', ['uses' => 'QuestionController@update']);
    $router->delete('questions/{id}', ['uses' => 'QuestionController@destroy']);
    $router->get('questions/{id}/answers', ['uses' => 'QuestionController@answers']);
    $router->get('questions/{id}/tests', ['uses' => 'QuestionController@tests']);
    $router->get('questionsUser', ['uses' => 'QuestionController@allFromUser']);
    
    // Submissions
    $router->get('submissions', ['uses' => 'SubmissionController@index']);
    $router->post('submissions', ['uses' => 'SubmissionController@store']);
    $router->get('submissions/{id}', ['uses' => 'SubmissionController@show']);
    // $router->put('submissions/{id}', ['uses' => 'SubmissionController@update']);
    // $router->delete('submissions/{id}', ['uses' => 'SubmissionController@destroy']);
    $router->get('submissions/{id}/answers', ['uses' => 'SubmissionController@answers']);
});