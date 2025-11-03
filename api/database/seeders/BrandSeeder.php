<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::truncate();

        Brand::insert([
            ['name' => 'Exhibit Technologies', 'email' => 'info@exhibit.com'],
            ['name' => 'Glow Cosmetics', 'email' => 'contact@glow.com'],
            ['name' => 'TechNova', 'email' => 'hello@technova.com'],
        ]);
    }
}
