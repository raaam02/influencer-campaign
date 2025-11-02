<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InfluencerFilterRequest;
use App\Models\Influencer;
use Illuminate\Http\Request;

class InfluencerController extends Controller
{
    public function index(InfluencerFilterRequest $request)
    {
        $q = $request->validated();

        $query = Influencer::query();

        if (!empty($q['platform'])) {
            $query->where('platform', $q['platform']);
        }

        if (!empty($q['category'])) {
            $query->where('category', $q['category']);
        }

        if (!empty($q['min_followers'])) {
            $query->where('followers', '>=', $q['min_followers']);
        }

        if (!empty($q['q'])) {
            $query->where('name', 'like', '%' . $q['q'] . '%');
        }

        $influencers = $query->paginate(20);

        return response()->json($influencers);
    }
}
