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
    $.post("http://127.0.0.1:8000/api/generar_csv", {renglones:[1,2,3]}, function (data) {
        // $(".result").html(data);
        respuesta = data;
        console.log('data', data);
    });
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