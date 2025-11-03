<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Campaign;
use Carbon\Carbon;

class MarkCompletedCampaigns extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'campaigns:mark-completed';

    /**
     * The console command description.
     */
    protected $description = 'Automatically mark campaigns as completed when the end date has passed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();

        $count = Campaign::where('end_date', '<', $today)
            ->where('status', '!=', 'completed')
            ->update(['status' => 'completed']);

        if ($count > 0) {
            $this->info("✅ $count campaign(s) marked as completed.");
        } else {
            $this->info("No campaigns needed updating today.");
        }
    }
}
