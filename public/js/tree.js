$(document).ready(function () {
    $('#div_tree').jstree({
        "plugins": ["checkbox"]
    });
});



////////////////////////// Funcion que genera un EXCEL con base a los checkbox seleccionados en el tree.blade.php ////////////////////////////
var generarExcel = function () {
    console.log('generarExcel');

    // Inicializar arrays 
    var jsonArray = [];
    var arrayParents = [];
    var arrayInvertir = [];
    var arrayArrays = [];
    // Se obtienen los elementos seleccionados(checkbox) del arbol tree en tree.blade.php
    // Se guarda en el arreglo "arrayElemSelected"
    var arrayElemSelected = $("#div_tree").jstree("get_selected", true);

    for (let i in arrayElemSelected) { // Recorremos el arreglo(arrayElemSelected) que tiene los elementos de los checkbox seleccionados
        if (arrayElemSelected[i].children == "") { // Se hace un filtro del arreglo, para saber cuál es la útima rama, 
            // si el elemento children es vacio, quiere decir que ya no tiene hijos, por lo que es él el ultimo hijo(rama)
            arrayParents = arrayElemSelected[i].parents; // arrayParents: Array en donde se guardan las ramas padre de la ultima rama(ultimo hijo)
            // arrayElemSelected[i].parents es un array de los id de los padres de la ultima rama.

            for (let j in arrayParents) { // Se recorre el array de los padres(arrayElemSelected)
                if (arrayParents[j] != "#") { // Se hace un filtro, el id=# quiere decir que es la rama de riesgos, en la que nos encontramos, la ultima rama


                    // get_node (obj [, as_dom]): obtener la representación JSON de un nodo (o el nodo DOM 
                    // extendido de jQuery real) mediante el uso de cualquier entrada (elemento DOM doméstico, cadena ID, selector, etc.)
                    // Con la funcion text - Se obtiene el texto de los padresy del hijo.
                    var textParents = $('#div_tree').jstree(true).get_node(arrayParents[j]).text;
                    var textChildren = $('#div_tree').jstree(true).get_node(arrayElemSelected[i]).text;

                    // El JSON de los nodos padres, obtenido anteriormente, se coloca en un array
                    arrayInvertir.push(textParents);
                }
            }
            arrayInvertir.reverse(); // Se invierte el array para que los elementos esten ordenados. (dominio, proceso, subproceso)
            arrayInvertir.push(textChildren); // ya ordenados los elementos del array, se inserta el ultimo elemento: riesgo - la ultima rama.(dominio, proceso, subproceso, riesgo)

            arrayArrays.push(arrayInvertir); // Ahora se agrega, en otro array(arrayArrays), cada arreglo que se vaya generando
            arrayInvertir = [];// Se limpia el array que guardó los padres del children actual.
        }
    }
    console.log('arrayArrays', arrayArrays);

    //
    let xhr = new XMLHttpRequest();

    // open (método, url): Realiza una petición de apertura de comunicación con un método que puede ser principalmente GET o POST.
    // METODO: 
    /* Con GET los parámetros de la petición van incluidos en la url. 
       Con POST los parámetros de la petición van en las cabeceras de HTTP. */
    // URL: Puede ser una ruta relativa o completa.
    // xmlhttp.open("GET","datos.php?pais=spain");
    xhr.open('POST', 'http://127.0.0.1:8000/api/treeexcel'); // Se direcciona a la url especificada (api.php)
    xhr.setRequestHeader('Content-Type', 'application/json');// Para PUBLICAR datos como un formulario HTML, agregue un encabezado 
                                                             // HTTP con setRequestHeader (). Especifique los datos que desea enviar en el método send ():
                                                            // Agrega encabezados HTTP a la solicitud

                                                            // encabezado: especifica el nombre del encabezado
                                                            // valor: especifica el valor del encabezado
                                                            /* Agrega un par de label/value al encabezado que se enviará*/

    xhr.responseType = 'blob'; //responseType: es un valor de cadena enumerado que especifica el tipo de datos contenidos en la respuesta.
                                // blob: Los blobs son objetos inmutables que representan datos brutos. File es una derivación de Blob que representa datos 
                                // del sistema de archivos. Use FileReader para leer datos de una Blob o archivo. Blobs te permite construir archivos como
                                //  objetos en el cliente que puedes pasar a apis que esperan urls en lugar de requerir que el servidor proporcione el archivo. 
                                // Por ejemplo, puede construir un blob que contenga los datos de una imagen,

    xhr.onload = function (e) { //  XMLHttpRequest.onload = callback;
                                // callback: es la función que se ejecutará cuando la solicitud se complete con éxito. 
                                // Recibe un objeto ProgressEvent como primer argumento. 

        if (this.status == 200) { // Si el estatus de la solicitud 200: "OK"
            let link = document.createElement('a'); // Se crea un elemento link <a>
            link.href = window.URL.createObjectURL(this.response); // Se le agrega un atributo href al <a> creado
                                                                    // this.response: Devuelve los datos de respuesta
            link.download = "results.xlsx"; 
            link.click();
        }
        else {
            console.log('xhr error');
        }
    }

    xhr.send(JSON.stringify({ riesgos: arrayArrays }));
}


////////////////////////// Funcion que recibe como parametro el rgo_id ////////////////////////////
var cargarActividadesYControles = function (rgo_id) {
    console.log('cargarActividades');


    /////////////////////////// ACTIVIDADES ///////////////////////////
    /* 
        Método $.get(URL, CALLBACK); de jQuery
        * El método $.get() solicia información a un servidor con la petición HTTP GET.
        * sirve para hacer una solicitud Ajax al servidor en la que podemos enviar datos por el método GET.
    */
    // $.get(URL, funcion) -- PARAMETROS
    // - URL: es necesario y es donde se especifica la URL a la cual quieres mandar tu petición.
    // - FUNCION: El CALLBACK es opcional y es el nombre de la función que se ejecutará una vez que la petición concluya satisfactoriamente. 
    // En esa función a su vez recibimos varios parámetros, siendo el más importante el primero, en el que 
    // tendremos una referencia al resultado de la solicitud realizada.
    $.get("http://127.0.0.1:8000/api/cargar_actividades/" + rgo_id, function (data) { // Se direcciona a la url especificada (api.php)
        // Posteriormente, recibe el resultado de la petición, que es data
        console.log('actividades:data', data);
        $("#div_actividades").empty(); // Elimina el contenido del elemento #div_actividades
        if (data && data.length > 0) { // Verificar que no esta vacia "data"
            data.forEach(function (a) { // El método forEach() ejecuta la función indicada una vez por cada elemento "a" del array "data"
                $("#div_actividades").append('<p>' + a.act_nombre_es + '</p>'); // Se agrega un <p> en el elemento #div_actividades, por cada elemento del array "data"
            });
        } else { // Si el array "data" recibido esta vacia
            $("#div_actividades").append("<p>No se encontraron actividades</p>"); // Se agrega un <p> señalando que no se encontraron actividades
        }
    });


    /////////////////////////// CONTROLES ///////////////////////////
    /* 
        Método $.get(URL, CALLBACK); de jQuery
        * El método $.get() solicia información a un servidor con la petición HTTP GET.
        * sirve para hacer una solicitud Ajax al servidor en la que podemos enviar datos por el método GET.
    */
    // $.get(URL, funcion) -- PARAMETROS
    // - URL: es necesario y es donde se especifica la URL a la cual quieres mandar tu petición.
    // - FUNCION: El CALLBACK es opcional y es el nombre de la función que se ejecutará una vez que la petición concluya satisfactoriamente. 
    // En esa función a su vez recibimos varios parámetros, siendo el más importante el primero, en el que 
    // tendremos una referencia al resultado de la solicitud realizada.
    $.get("http://127.0.0.1:8000/api/cargar_controles/" + rgo_id, function (data) {// Se direcciona a la url especificada (api.php)
        // Posteriormente, recibe el resultado de la petición, que es data
        console.log('controles:data', data);
        $("#div_controles").empty();// Elimina el contenido del elemento #div_controles
        if (data && data.length > 0) {// Verificar que no esta vacia "data"
            data.forEach(function (a) { // El método forEach() ejecuta la función indicada una vez por cada elemento "a" del array "data"
                $("#div_controles").append('<p>' + a.cont_nombre_es + '</p>');// Se agrega un <p> en el elemento #div_controles, por cada elemento del array "data"
            });
        } else {// Si el array "data" recibido esta vacia
            $("#div_controles").append("<p>No se encontraron controles</p>");// Se agrega un <p> señalando que no se encontraron controles
        }
    });
}


// var expedienteSelected = function () {
//     console.log('expedienteSelected');

//     var expediente = $('#username').val($("#username option:selected").text());

//     console.log('exped'+expediente[0].innerHTML);

//     $.get("http://127.0.0.1:8000/api/cargar_datosUser/" + expediente.innerHTML, function (data) {// Se direcciona a la url especificada (api.php)
//         // Posteriormente, recibe el resultado de la petición, que es data
//         console.log('datosUsuario:data', data);
//         // $("#username").empty();// Elimina el contenido del elemento #div_controles
//         if (data && data.length > 0) {// Verificar que no esta vacia "data"
//             data.forEach(function (a) { // El método forEach() ejecuta la función indicada una vez por cada elemento "a" del array "data"
//                 // $("#div_controles").append('<p>' + a.cont_nombre_es + '</p>');// Se agrega un <p> en el elemento #div_controles, por cada elemento del array "data"
//                 // documento.get$("#div_controles").


//                 document.getElementById("#username").value = a.username;
//             });
//         } else {// Si el array "data" recibido esta vacia
//             $(".col-md-6").append("<p>No se encontraron registros</p>");// Se agrega un <p> señalando que no se encontraron controles
//         }
//     });
// }

