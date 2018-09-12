@extends('layouts.app')
@section('content')
<div id="container">
    <div class="row">
        <div class="col sm-12">
            <button class="btn btn-primary" onclick="generarExcel()">Generar Excel</button>
        </div>
    </div>
    <div id="div_flex">
        
        <div id="div_tree">
            <ul>
                @foreach($dominios as $dominio => $value1) <!-- Dominio -->
                    <li data-jstree='{"opened":false}'>{{ $value1->dom_nombre_es }}
                        <ul>
                        @foreach($procesos as $proceso => $value2) <!-- Proceso -->
                            @if($value1->dom_id == $value2->dom_id)
                                <li>{{ $value2->proc_nombre_es }}
                                    <ul>
                                        @foreach($subprocesos as $subproceso => $value3) <!-- Subproceso -->
                                            @if($value2->proc_id == $value3->proc_id)
                                                <li>{{ $value3->subp_nombre_es }}
                                                    <ul>
                                                        @foreach($riesgos as $riesgo => $value4) <!-- Riesgo -->
                                                            @if($value3->subp_id == $value4->subp_id)
                                                                <li onclick="cargarActividadesYControles({{ $value4->rgo_id }}); return false;">{{ $value4->rgo_nombre_es }}</li>
                                                            @endif
                                                        @endforeach
                                                    </ul>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </li>
                            @endif
                        @endforeach
                        </ul>
                    </li>
                @endforeach
            </ul>
        </div>
        <div id="div_block">
                <h3>CONTROLES ASOCIADO</h3>
            <div id="div_controles">
                
            </div>
        <h3>ACTIVIDADES ASOCIADAS</h3>
            <div id="div_actividades">
                
            </div>            
        </div>
    </div>
</div>
@endsection