<?php

use Illuminate\Database\Seeder;
use App\Question;
use App\Answer;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $questions = Question::all();
        
        foreach ($questions as $question) {
            // Text input Answer
            if ($question->question_type == 3) {
                $answer = new Answer([
                    'answer_content' => $faker->unique()->word,
                    'is_correct' => 1
                ]);
                // Add answer to Question
                $question->answers()->save($answer);

            // Select or Radio input Answer
            } else {
                // Create a list of answers and shuffle them
                $size = $faker->numberBetween(2, 5);
                $correctList = array_fill(0, $size, 0);
                $correctList[0] = 1;
                $correctList = $faker->shuffle($correctList);

                // Generate answers
                for ($i = 0; $i < $size; $i++) {
                    $answer = new Answer([
                        'answer_content' => $faker->text(rand(100,250)),
                        'is_correct' => $correctList[$i]
                    ]);
                    // Add answer to Question
                    $question->answers()->save($answer);
                }
            }
        }
    }
}
