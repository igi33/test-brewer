<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['is_admin', ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function tests()
    {
        return $this->hasMany('App\Test');
    }
    
    public function questions()
    {
        return $this->hasMany('App\Question');
    }

    public function submissions()
    {
        return $this->hasMany('App\Submission');
    }
}
