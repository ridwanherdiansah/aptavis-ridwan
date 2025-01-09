<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    // Define the relationship to Project
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
