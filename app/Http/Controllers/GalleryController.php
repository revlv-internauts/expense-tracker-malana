<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("gallery/index", [
            "photos" =>  Gallery::orderBy("id", "asc")->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        /*==================================================
        renders the front end component found in 
        resources/js/pages/gallery/create

        Route::get('/gallery/create', [GalleryController::class, 'create'])
        ->name('gallery.create');
        ==================================================*/
       return Inertia::render(component: "gallery/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validate = $request->validate([
            'image' => [
                'required',
                File::image()->types(['jpg', 'jpeg', 'png'])
            ],
            'image_name' =>['required', 'string']
        ]);

        /*=========================================
        storing image file path 
        by default it stores in storage/app/images 
        =========================================*/
        $path = $request->file('image')->store('images', 'public');

        //create 
        Gallery::create([...$validate, 'image'=>$path, 'iamge_url' => Storage::url($path)] );
        //commit 
        DB::commit();
        // $url = Storage::url($path); // /storage/images/filename.png

        // dd($url); // /storage/images/filename.png

        return to_route('gallery.index')->with('success','file Uploaded Successfully');

        } catch (\Throwable $th) {
            DB::rollback();
            return to_route('gallery.index')->withErrors(['error' => "Something went wrong uploading the image" . $th->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('gallery/show', [
            'photo' => $gallery
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {   // strin $id
        // $gallery = Gallery::findOrFail($id)
        return Inertia::render('gallery/edit', [
            'photo' => $gallery

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        DB::beginTransaction();
        
        try {
            //validate 
            $validate = $request->validate([
                'image' => [
                    'required',
                    File::image()->types(['jpg', 'jpeg', 'png'])
                ],
                'image_name' =>['required', 'string']
            ]);
            
        } catch (\Throwable $th) {
            DB::rollback();
            return to_route('gallery.index')->withErrors(['error' => "Something went wrong uploading the image" . $th->getMessage()]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        try {
            $gallery->delete();
            return to_route('gallery.index')->with('success', 'Successfully deleted');
        } catch (\Throwable $th) {
            // logs error
            \Log::error('Gallery deletion failed', [
                'error' => $th->getMessage()
            ]);

            return to_route('gallery.index')->withErrors(['error ' => 'Failed to delete' . $th->getMessage()]);
        }

    }
}
