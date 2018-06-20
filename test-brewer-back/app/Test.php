<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    public function questions()
    {
        return $this->belongsToMany('App\Question', 'has_question');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
