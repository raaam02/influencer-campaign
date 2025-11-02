<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'budget' => (float)$this->budget,
            'start_date' => optional($this->start_date)->toDateString(),
            'end_date' => optional($this->end_date)->toDateString(),
            'status' => $this->status,
            'brand' => $this->brand ? ['id'=>$this->brand->id,'name'=>$this->brand->name] : null,
            'influencers' => $this->whenLoaded('influencers', $this->influencers->map(function($i){
                return [
                    'id' => $i->id,
                    'name' => $i->name,
                    'platform' => $i->platform,
                    'followers' => (int)$i->followers,
                    'category' => $i->category,
                ];
            })),
            // helpful computed fields:
            'total_influencers' => $this->when(isset($this->influencers_count), $this->influencers_count, $this->whenLoaded('influencers', $this->influencers->count())),
            'total_followers' => $this->when(isset($this->influencers_sum_followers), (int)$this->influencers_sum_followers, $this->whenLoaded('influencers', $this->influencers->sum('followers'))),
            'created_at' => optional($this->created_at)->toDateTimeString(),
        ];
    }
}
