<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = ['id', 'name','budget','start_date','end_date','status','brand_id'];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    protected $dates = ['start_date','end_date'];

    public function influencers()
    {
        return $this->belongsToMany(Influencer::class)->withTimestamps();
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function getRouteKeyName()
    {
        return 'id';
    }

}
