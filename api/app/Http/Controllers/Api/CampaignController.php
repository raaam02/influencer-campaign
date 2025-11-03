<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignInfluencersRequest;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use App\Models\Influencer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendAssignedEmailJob;

class CampaignController extends Controller
{
    public function index()
    {
        // Eager load influencers and compute totals
        $campaigns = Campaign::with('influencers')
            ->withCount('influencers')
            ->withSum('influencers','followers')
            ->get();

        return CampaignResource::collection($campaigns);
    }

    public function show($id)
    {
        $campaign = Campaign::with('influencers')->find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }

        $campaign->total_influencers = $campaign->influencers->count();
        $campaign->total_followers   = $campaign->influencers->sum('followers');

        return new CampaignResource($campaign);
    }

    public function store(StoreCampaignRequest $request)
    {
        $data = $request->validated();

        $campaign = Campaign::create($data + ['status' => 'active']);

        return (new CampaignResource($campaign->load('influencers')))->response()->setStatusCode(201);
    }

    public function assignInfluencers(AssignInfluencersRequest $request, $campaignId)
    {
        $campaign = Campaign::find($campaignId);

        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }

        $ids = $request->validated()['influencer_ids'];

        // Get existing influencer IDs already assigned to this campaign
        $existing = $campaign->influencers()
            ->whereIn('influencer_id', $ids)
            ->pluck('influencer_id')
            ->toArray();

        // Detect duplicates
        $alreadyAssigned = Influencer::whereIn('id', $existing)->pluck('name')->toArray();

        // Filter new ones only
        $newIds = array_diff($ids, $existing);

        if (empty($newIds)) {
            return response()->json([
                'message' => 'Selected influencers are already assigned to this campaign.',
                'already_assigned' => $alreadyAssigned,
            ], 422);
        }

        // Sync new influencers without removing existing ones
        $campaign->influencers()->syncWithoutDetaching($newIds);

        // Dispatch jobs only for newly added influencers
        foreach ($newIds as $infId) {
            $influencer = Influencer::find($infId);
            if ($influencer) {
                SendAssignedEmailJob::dispatch($influencer, $campaign);
            }
        }

        $campaign->load('influencers');

        $response = [
            'message' => 'Influencers assigned successfully.',
            'newly_assigned_count' => count($newIds),
            'already_assigned' => $alreadyAssigned,
            'campaign' => new CampaignResource($campaign),
        ];

        return response()->json($response, 200);
    }

}
