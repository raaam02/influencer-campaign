<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InfluencerFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'platform' => 'nullable|string',
            'category' => 'nullable|string',
            'min_followers' => 'nullable|integer|min:0',
            'q' => 'nullable|string' // search
        ];
    }
}
