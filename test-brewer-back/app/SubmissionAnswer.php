<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubmissionAnswer extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function question()
    {
        return $this->belongsTo('App\Question');
    }
}
