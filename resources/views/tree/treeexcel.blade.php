<table>
    <thead>
        <tr>
            <th>Dominio</th>
            <th>Proceso</th>
            <th>Subproceso</th>
            <th>Riesgo</th>
        </tr>
    </thead>
    <tbody>
        @foreach($riesgos as $riesgo)
        <tr>
            <td>{{ $riesgo[0] }}</td>
            <td>{{ $riesgo[1] }}</td>
            <td>{{ $riesgo[2] }}</td>
            <td>{{ $riesgo[3] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>