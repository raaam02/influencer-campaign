<?php

use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\InfluencerController;

Route::prefix('v1')->group(function () {
    Route::post('campaigns', [CampaignController::class, 'store']);
    Route::get('campaigns', [CampaignController::class, 'index']);
    Route::get('campaigns/{campaign}', [CampaignController::class, 'show']);
    Route::post('campaigns/{campaign}/assign', [CampaignController::class, 'assignInfluencers']);

    Route::get('influencers', [InfluencerController::class, 'index']);
});