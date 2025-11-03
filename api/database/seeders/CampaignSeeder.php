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
            [
                'name' => 'New Year Bash',
                'budget' => 95000,
                'start_date' => Carbon::parse('2025-12-26'),
                'end_date' => Carbon::parse('2026-01-05'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Valentine Specials',
                'budget' => 70000,
                'start_date' => Carbon::parse('2026-02-01'),
                'end_date' => Carbon::parse('2026-02-15'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Holi Celebration',
                'budget' => 60000,
                'start_date' => Carbon::parse('2026-03-01'),
                'end_date' => Carbon::parse('2026-03-20'),
                'status' => 'active',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Summer Sale',
                'budget' => 85000,
                'start_date' => Carbon::parse('2026-04-01'),
                'end_date' => Carbon::parse('2026-04-30'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Tech Launch 2026',
                'budget' => 120000,
                'start_date' => Carbon::parse('2026-05-10'),
                'end_date' => Carbon::parse('2026-05-25'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Monsoon Madness',
                'budget' => 55000,
                'start_date' => Carbon::parse('2026-06-15'),
                'end_date' => Carbon::parse('2026-07-05'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Raksha Bandhan Offers',
                'budget' => 65000,
                'start_date' => Carbon::parse('2026-08-01'),
                'end_date' => Carbon::parse('2026-08-15'),
                'status' => 'upcoming',
                'brand_id' => $brand?->id,
            ],
            [
                'name' => 'Festive Bonanza',
                'budget' => 100000,
                'start_date' => Carbon::parse('2026-09-20'),
                'end_date' => Carbon::parse('2026-10-10'),
                'status' => 'upcoming',
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
