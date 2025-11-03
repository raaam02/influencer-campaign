<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Campaign;
use App\Models\Influencer;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Campaign::truncate();
        \DB::table('campaign_influencer')->truncate();

        $brand = Brand::first();

        $campaigns = [
            [
                'name' => 'Diwali Promo',
                'budget' => 50000,
                'start_date' => Carbon::parse('2025-11-01'),
                'end_date' => Carbon::parse('2025-11-20'),
                'status' => 'active',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Winter Sale',
                'budget' => 80000,
                'start_date' => Carbon::parse('2025-12-01'),
                'end_date' => Carbon::parse('2025-12-25'),
                'status' => 'active',
                'brand_id' => $brand?->id,
            ],
        ];

        foreach ($campaigns as $data) {
            $campaign = Campaign::create($data);

            // Attach random influencers (2–3)
            $influencerIds = Influencer::inRandomOrder()->take(rand(2, 3))->pluck('id');
            $campaign->influencers()->attach($influencerIds);
        }
    }
}
