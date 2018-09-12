$(document).ready(function () {
    $('#div_tree').jstree({
        "plugins": ["checkbox"]
    });
});
var generarExcel = function () {
    console.log('generarExcel');

    // var nodes = $("#div_tree").jstree("get_selected", true);
    // console.log('nodes', nodes);
    // if (nodes && nodes.length > 0) {
    //     var node = $('#div_tree').jstree(true).get_node('j1_3').text;
    //     console.log('node', node);
    // }
    // //
    // var respuesta = null;
    // $.get("http://127.0.0.1:8000/api/riesgos", function (data) {
    //     // $(".result").html(data);
    //     respuesta = data;
    //     console.log('data', data);
    // });
    // console.log('despues de .get', respuesta);
    // $.post("http://127.0.0.1:8000/api/treeexcel", { renglones: [1, 2, 3] }, function (data) {
    //     // $(".result").html(data);
    //     respuesta = data;
    //     console.log('data', data);
    // });

    // $.ajaxSetup({
    //     beforeSend: function (jqXHR, settings) {
    //         console.log('beforeSend');
    //         if (settings.dataType === 'binary') {
    //             console.log('beforeSend:binary');
    //             settings.xhr().responseType = 'arraybuffer';
    //             settings.processData = false;
    //         }
    //     }
    // });
    // $.ajax({
    //     // beforeSend: function (jqxhr, settings) {
    //     //     jqxhr.filename = 'riesgos.xls';
    //     //     console.log('beforeSend:binary');
    //     //     settings.xhr().responseType = 'arraybuffer';
    //     //     settings.processData = false;
    //     // },
    //     url: 'http://127.0.0.1:8000/api/treeexcel',
    //     method: 'POST',
    //     success: function (response) {
    //         // var a = document.createElement("a");
    //         // a.href = response; 
    //         // a.download = 'risegos.xls';
    //         // document.body.appendChild(a);
    //         // a.click();
    //         // a.remove();
    //     },
    // });

    //
    // Inicializar arrays 
    var jsonArray = [];
    var arrayParents = [];
    var arrayTree = [];
    var arrayArrays = [];
    //

    var arreglo = $("#div_tree").jstree("get_selected", true); // obtener elementos seleccionados
    for (let i in arreglo) { // Recorremos el arreglo que tiene los elementos de los checkbox seleccionados
        if (arreglo[i].children == "") { // Se hace un filtro del arreglo, para saber cuál es la útima rama
            arrayParents = arreglo[i].parents; // array en donde se guardan las ramas padre del children
            for (let j in arrayParents) { // Se recorre el array de padres
                if (arrayParents[j] != "#") { // Se obtiene el texto de los padres y del children
                    var textParents = $('#div_tree').jstree(true).get_node(arrayParents[j]).text;
                    var textChildren = $('#div_tree').jstree(true).get_node(arreglo[i]).text;
                    arrayTree.push(textParents); // Se agrega a un arraylos padres
                }
            }
            arrayTree.reverse(); // Se invierte el array para que los elementos esten ordenados. (dominio, proceso, subproceso)
            arrayTree.push(textChildren); // ya ordenados los elementos del array, se inserta el ultimo elemento: riesgo - la ultima rama.(dominio, proceso, subproceso, riesgo)

            arrayArrays.push(arrayTree); // Ahora se agrega, en otro array, cada arreglo que se vaya generando
            arrayTree = [];// Se limpia el array que guardó los padres del children actual.
        }
    }
    console.log('arrayArrays', [['col1', 'col2', 'col3']]);
    console.log('arrayArrays', arrayArrays);
    //
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/treeexcel');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'blob';

    xhr.onload = function (e) {
        if (this.status == 200) {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "results.xlsx";
            link.click();
        }
        else {
            console.log('xhr error');
        }
    }

    xhr.send(JSON.stringify({ riesgos: arrayArrays }));
}
var cargarActividadesYControles = function (rgo_id) {
    console.log('cargarActividades');
    $.get("http://127.0.0.1:8000/api/cargar_actividades/" + rgo_id, function (data) {
        console.log('actividades:data', data);
        $("#div_actividades").empty();
        if (data && data.length > 0) {
            data.forEach(function (a) {
                $("#div_actividades").append('<p>' + a.act_nombre_es + '</p>');
            });
        } else {
            $("#div_actividades").append("<p>No se encontraron actividades</p>");
        }
    });
    $.get("http://127.0.0.1:8000/api/cargar_controles/" + rgo_id, function (data) {
        console.log('controles:data', data);
        $("#div_controles").empty();
        if (data && data.length > 0) {
            data.forEach(function (a) {
                $("#div_controles").append('<p>' + a.cont_nombre_es + '</p>');
            });
        } else {
            $("#div_controles").append("<p>No se encontraron controles</p>");
        }
    });
}
// $(function() {
//     $('#container').jstree({
//         "plugins" : ["checkbox"]
//     });
// });