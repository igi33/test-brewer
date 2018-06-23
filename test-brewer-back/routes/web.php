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

$router->get('/', function () use ($router) {
    return 'Hello world!';
});

// Users
$router->get('users', ['uses' => 'UserController@index']);
$router->get('users/{id}', ['uses' => 'UserController@show']);
$router->get('users/{id}/tests', ['uses' => 'UserController@tests']);
$router->get('users/{id}/questions', ['uses' => 'UserController@questions']);
$router->get('users/{id}/submissions', ['uses' => 'UserController@submissions']);

// Categories
$router->get('categories', ['uses' => 'CategoryController@index']);
$router->get('categories/{id}', ['uses' => 'CategoryController@show']);
$router->get('categories/{id}/tests', ['uses' => 'CategoryController@tests']);
$router->get('categories/{id}/questions', ['uses' => 'CategoryController@questions']);

// Tests
$router->get('tests', ['uses' => 'TestController@index']);
$router->get('tests/{id}', ['uses' => 'TestController@show']);
$router->get('tests/{id}/questions', ['uses' => 'TestController@questions']);
$router->get('tests/{id}/submissions', ['uses' => 'TestController@submissions']);

// Questions
$router->get('questions', ['uses' => 'QuestionController@index']);
$router->get('questions/{id}', ['uses' => 'QuestionController@show']);
$router->get('questions/{id}/answers', ['uses' => 'QuestionController@answers']);
$router->get('questions/{id}/tests', ['uses' => 'QuestionController@tests']);

// Submission
$router->get('submissions', ['uses' => 'SubmissionController@index']);
$router->get('submissions/{id}', ['uses' => 'SubmissionController@show']);
$router->get('submissions/{id}/answers', ['uses' => 'SubmissionController@answers']);