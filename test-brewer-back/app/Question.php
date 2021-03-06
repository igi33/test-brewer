<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function tests()
    {
        return $this->belongsToMany('App\Test', 'has_question')->withTimestamps()->withPivot(['question_weight', 'question_order']);
    }

    public function answers()
    {
        return $this->hasMany('App\Answer');
    }
}
