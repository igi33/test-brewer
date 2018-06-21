<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function answers()
    {
        return $this->hasMany('App\SubmissionAnswer');
    }

    public function test() {
        return $this->belongsTo('App\Test');
    }
}
