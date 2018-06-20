<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHasQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('has_question', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('question_weight');
            $table->unsignedInteger('question_order');
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('test_id');
            $table->timestamps();

            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('test_id')->references('id')->on('tests');
            $table->index(['question_id', 'test_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('has_question');
    }
}
