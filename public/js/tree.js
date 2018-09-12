$(document).ready(function () {
    $('#div_tree').jstree({
        "plugins": ["checkbox"]
    });
});
var test = function () {
    console.log('test');
    console.log($("#div_tree").jstree("get_selected", true));
    //
    var respuesta = null;
    $.get("http://127.0.0.1:8000/riesgos", function (data) {
        // $(".result").html(data);
        respuesta = data;
        console.log('data', data);
    },function(error){
        console.log(error);
    });
    console.log('despues de .get', respuesta);

}
// $(function() {
//     $('#container').jstree({
//         "plugins" : ["checkbox"]
//     });
// });