<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = DB::table('projects')->get();

        return response()->json($projects);
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
        $data = DB::table('projects')->insert([
            'name' => $request->name,
            'status' => $request->status,
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
    public function show(Project $project)
    {
        return response()->json($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {   
        $data = DB::table('projects')
            ->where('id', $project->id)
            ->update([
                'name' => $request->name,
                'status' => $request->status,
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
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
