<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $project = Project::create([
            'name' => 'Project Example',
            'status' => 'Draft',
        ]);

        Task::create([
            'name' => 'Task 1',
            'status' => 'In Progress',
            'project_id' => $project->id,
            'bobot' => 10,
        ]);

        Task::create([
            'name' => 'Task 2',
            'status' => 'Done',
            'project_id' => $project->id,
            'bobot' => 20,
        ]);
    }
    
}
