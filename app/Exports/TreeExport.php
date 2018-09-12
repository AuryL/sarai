<?php

namespace App\Exports;

use App\Riesgo;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class TreeExport implements FromView
{
    private $riesgos;
    public function __construct($riesgos)
    {
        $this->riesgos = $riesgos;
    }
    public function view(): View
    {
        return view('/tree/treeexcel', [
            'riesgos' =>  $this->riesgos
        ]);
    }
}