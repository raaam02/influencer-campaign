<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Influencer;
use App\Models\Campaign;
use Illuminate\Support\Facades\Log;

class SendAssignedEmailJob implements ShouldQueue
{
    use Queueable;

    public $influencer;
    public $campaign;

    /**
     * Create a new job instance.
     */
    public function __construct(Influencer $influencer, Campaign $campaign)
    {
        $this->influencer = $influencer;
        $this->campaign = $campaign;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Simulate sending email
        Log::info("📩 Simulated email sent to influencer '{$this->influencer->name}' for campaign '{$this->campaign->name}'.");

        // later implement real mail:
        // Mail::to($this->influencer->email)->send(new InfluencerAssignedMail($this->campaign));
    }
}
