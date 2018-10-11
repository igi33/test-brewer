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
        return $this->belongsToMany('App\Question', 'has_question')->withTimestamps()->withPivot(['question_weight', 'question_order']);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function submissions()
    {
        return $this->hasMany('App\Submission');
    }
}
