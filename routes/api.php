<?php

use Illuminate\Http\Request;

Use App\Riesgo;
Use App\Actividad;
Use App\Control;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('riesgos', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return Riesgo::all();
});

// Route::post('generar_csv', function(Request $request) {
//     //print_r($request);
//     //echo('asdasdasdasd');
//     //return Article::create($request->all);
//     return $request->all();
// });

Route::post('treeexcel', 'TreeController@export')->name('treeexcel');


Route::get('cargar_actividades/{rgo_id}', function($rgo_id) {
    $actividades = Actividad::where('rgo_id',$rgo_id);
    return $actividades->get();
});
Route::get('cargar_controles/{rgo_id}', function($rgo_id) {
    $controles = Control::where('rgo_id',$rgo_id);
    return $controles->get();
});