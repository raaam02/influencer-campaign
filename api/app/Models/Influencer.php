<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Influencer extends Model
{
    protected $fillable = ['name','category','followers','platform'];

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class)->withTimestamps();
    }
}
