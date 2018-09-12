$(document).ready(function () {
    $('#div_tree').jstree({
        "plugins": ["checkbox"]
    });
});

// 
var test = function () {

    // Inicializar arrays 
    var jsonArray = [];
    var arrayParents = [];
    var arrayTree = [];
    var arrayArrays = [];

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
        console.log(arrayArrays[0][0][0]);

    // 
    $.get("http://127.0.0.1:8000/riesgos", function (data) {
        // $(".result").html(data);
        console.log('data', data);
    }, function (error) {
        console.log(error);
    });

}
