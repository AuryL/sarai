<?php

namespace App\Http\Controllers;

use App\Dominio;
use App\Proceso;
use App\Subproceso;
use App\Riesgo;
use App\Control;
use App\Actividad;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use Auth;
use Redirect;
use Session;
use Validator;


class TreeController extends Controller
{
    public function viewTree()
    {        
        $user = Auth::user();

        $dominios = Dominio::all();
        $procesos = Proceso::all();
        $subprocesos = Subproceso::all();
        $riesgos = Riesgo::all();
        $controles = Control::all();
        $actividades = Actividad::all();

        return view('/tree/tree', ['dominios' => $dominios, 'procesos' => $procesos, 'subprocesos' => $subprocesos, 'riesgos' => $riesgos, 'controles' => $controles, 'actividades' => $actividades]);
    }
}
