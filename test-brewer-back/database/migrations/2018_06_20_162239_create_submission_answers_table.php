<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubmissionAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('submission_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('answer_value', 50);
            $table->unsignedInteger('submission_id');
            $table->unsignedInteger('question_id');
            $table->timestamps();

            $table->foreign('submission_id')->references('id')->on('submissions');
            $table->foreign('question_id')->references('id')->on('questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('submission_answers');
    }
}
