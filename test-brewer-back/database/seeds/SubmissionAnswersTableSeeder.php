<?php

use Illuminate\Database\Seeder;
use App\Submission;
use App\SubmissionAnswer;
use App\Question;

class SubmissionAnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $submissions = Submission::all();

        foreach ($submissions as $submission) {
            // Find all questions of a test
            $test = $submission->test()->first();
            $questions = $test->questions;
            
            // Insert submited answers to each question
            foreach ($questions as $question) {
                //var_dump($question->question_title);

                $subAnswer = new SubmissionAnswer([
                    'question_id' => $question->id,
                ]);
                // Answer value based on type of question
                if ($question->question_type == 3) {
                    $correct = $question->answers()->first()->answer_content;
                    $answers = [$faker->word, $correct, $correct];
                    // Add one answer
                    $subAnswer->answer_value = $faker->randomElement($answers);
                } else {
                    $answerVals = [];
                    // Find all answers
                    foreach ($question->answers as $answer) {
                        array_push($answerVals, $answer->id);
                    }
                    $subAnswer->answer_value = $faker->randomElement($answerVals);
                }
                $submission->answers()->save($subAnswer);
            }

        }
    }
}
