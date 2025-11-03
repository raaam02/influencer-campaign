<?php

namespace Database\Seeders;

use App\Models\Influencer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InfluencerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Influencer::truncate();

        $influencers = [
            ['name' => 'Sneha', 'category' => 'fashion', 'followers' => 12000, 'platform' => 'Instagram'],
            ['name' => 'Aman', 'category' => 'tech', 'followers' => 50000, 'platform' => 'YouTube'],
            ['name' => 'Priya', 'category' => 'fitness', 'followers' => 30000, 'platform' => 'Instagram'],
            ['name' => 'Rohit', 'category' => 'travel', 'followers' => 25000, 'platform' => 'Instagram'],
            ['name' => 'Ananya', 'category' => 'beauty', 'followers' => 40000, 'platform' => 'TikTok'],
            ['name' => 'Vikram', 'category' => 'tech', 'followers' => 60000, 'platform' => 'YouTube'],
        ];

        Influencer::insert($influencers);
    }
}
