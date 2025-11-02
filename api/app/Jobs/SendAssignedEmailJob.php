<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendAssignedEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // simulate sending email: use Mail::to($this->influencer->email?) or log
        \Log::info("Email sent to influencer {$this->influencer->name} for campaign {$this->campaign->name}");
        // optionally use real Mail::to(...) with a Mailable
    }
}
