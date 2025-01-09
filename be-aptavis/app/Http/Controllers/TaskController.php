<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = DB::table('tasks')->get();

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = DB::table('tasks')->insert([
            'name' => $request->name,
            'status' => $request->status,
            'project_id' => $request->project_id,
            'bobot' => $request->bobot,
            'created_at' => now(),
        ]);
        
        if ($data) {
            return response()->json([
                "success" => true,
                "message" => "Donasi berhasil",
                "code" => 200,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Donasi gagal",
                "code" => 401,
            ]);
        }  
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return $task->load('project');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $data = DB::table('tasks')
            ->where('id', $task->id)
            ->update([
                'name' => $request->name,
                'status' => $request->status,
                'project_id' => $request->project_id,
                'bobot' => $request->bobot,
                'updated_at' => now(),
            ]);

        if ($data) {
            return response()->json([
                "success" => true,
                "message" => "Data berhasil diperbarui",
                "code" => 200,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Data gagal diperbarui",
                "code" => 400,
            ]);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
