<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MarkCompletedCampaigns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mark-completed-campaigns';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $updated = \App\Models\Campaign::where('status','!=','completed')
        ->whereDate('end_date','<', now()->toDateString())
        ->update(['status'=>'completed']);

        $this->info("Marked {$updated} campaigns as completed.");
    }
}
