$(document).ready(function () {
    $('#div_tree').jstree({
        "plugins": ["checkbox"]
    });
});

// 
var test = function () {
    console.log('test');
    
    // 
    var jsonArray = [];
    var arreglo = $("#div_tree").jstree("get_selected", true); // obtener elementos seleccionados
    for (let i in arreglo) {
        console.log("Id: "+arreglo[i].id+", "+"Texto: "+arreglo[i].text);
        jsonArray.push({'id':arreglo[i].id, 'texto':arreglo[i].text});
    }

    console.log(jsonArray);
    // 
    $.get("http://127.0.0.1:8000/riesgos", function (data) {
        // $(".result").html(data);
        console.log('data', data);
    },function(error){
        console.log(error);
    });

}
