<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

// User Factory
$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'username' => $faker->unique()->userName,
        'email' => $faker->unique()->email,
        'password' => app('hash')->make('123456'),
    ];
});

// Category Factory
$factory->define(App\Category::class, function (Faker\Generator $faker) {

    // Possible Categories
    $categories = [
        'Computer Science',
        'Web Technology',
        'Sockets Theory',
        'Video Games',
        'Test Maker',
        'Online Security',
        'Embedded Systems',
        'Open-Source Software',
        'Operating System',
        'Software Engineering',
    ];

    return [
        'category_name' => $faker->unique()->randomElement($categories),
        'category_description' => $faker->text(rand(100,250)),
    ];
});

// Test Factory
$factory->define(App\Test::class, function (Faker\Generator $faker) {

    // Generates random dateTime
    $dateGenerator = mktime(
        $faker->numberBetween(8, 20), // hours
        $faker->randomElement(array(0,15,30,45)), // minutes
        0, // seconds
        $faker->numberBetween(7, 12), // month
        $faker->numberBetween(1, 28), // day
        2018 // year
    );
    $minutesToAdd = $faker->numberBetween(1, 12) * 15;

    // Start date
    $time = new DateTime(date("Y-m-d H:i:s", $dateGenerator));
    $start_time = $time->format('Y-m-d H:i:s');
    // Start date + Random generated minutes
    $time->modify("+{$minutesToAdd} minutes");
    $end_time = $time->format('Y-m-d H:i:s');

    return [
        'test_title' => $faker->unique()->catchPhrase,
        'test_description' => $faker->text(rand(100,250)),
        'start_time' => $start_time,
        'end_time' => $end_time,

        'user_id' => function () {
            // Get random user id
            return App\User::inRandomOrder()->first()->id;
        },
        'category_id' => function () {
            // Get random user id
            return App\Category::inRandomOrder()->first()->id;
        }
    ];
});

// Questions Factory
$factory->define(App\Question::class, function (Faker\Generator $faker) {
    return [
        'question_title' => $faker->unique()->company,
        'question_content' => $faker->text(rand(100,250)),
        'question_type' => $faker->numberBetween(1, 3),

        'user_id' => function () {
            // Get random user id
            return App\User::inRandomOrder()->first()->id;
        },
    ];
});

// Submissions Factory
$factory->define(App\Submission::class, function (Faker\Generator $faker) {
    
    // Find random test
    $test = App\Test::inRandomOrder()->first();
    // Generate date
    $time = new DateTime(date($test->end_time));
    // Minutes before test end
    $minutes = $faker->numberBetween(1, 10);
    // Date of submision
    $time->modify("-{$minutes} minutes");
    $time->modify("-2 hours");
    $sub_time = $time->format('Y-m-d H:i:s');

    return [
        'created_at' => $sub_time,
        'updated_at' => $sub_time,

        'test_id' => $test->id,
        'user_id' => function () {
            // Get random user id
            return App\User::inRandomOrder()->first()->id;
        },
    ];
});

