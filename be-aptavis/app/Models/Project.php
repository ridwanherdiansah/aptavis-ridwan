<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    // Define the relationship to Task
    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }
}
