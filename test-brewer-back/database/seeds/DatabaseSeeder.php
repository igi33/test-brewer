<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        // Set seed for data generation
        // or comment line to always generate new data
        $faker->seed(1234);

        // Generate data
        $this->call('UsersTableSeeder');
        $this->call('CategoriesTableSeeder');
        $this->call('TestsTableSeeder');
        $this->call('QuestionsTableSeeder');
        $this->call('HasQuestionTableSeeder');
        $this->call('AnswersTableSeeder');
        $this->call('SubmissionsTableSeeder');
        $this->call('SubmissionAnswersTableSeeder');
    }
}
