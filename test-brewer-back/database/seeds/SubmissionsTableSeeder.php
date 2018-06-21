<?php

use Illuminate\Database\Seeder;

class SubmissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // create 15 submissions using the factory
        factory(App\Submission::class, 15)->create();
    }
}
