<?php

use Illuminate\Database\Seeder;
use App\Test;
use App\Question;

class HasQuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $tests = Test::all();

        foreach($tests as $test) {
            for ($i = 1; $i <= 10; $i++) {
                // Find random question
                $questionId = Question::inRandomOrder()->first()->id;
                // Add question to test
                $test->questions()->attach($questionId,[
                    'question_weight' => $faker->numberBetween(1, 5),
                    'question_order' => $i
                ]);
            }
        }
    }
}
