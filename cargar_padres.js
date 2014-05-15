$(function() {
	var meli_json = "https://api.mercadolibre.com/sites/MLM/categories";
	$.getJSON(meli_json, function(result){
		//console.log(result.length); // Tamaño del json
		$.each(result, function (i, field) {
			$('#categories').append("<li onClick='child(\""+field.id+"\")'>"+field.name+"</li>");
		});
	});	
});

var padre = "";
var path = "";
var id_cat = "";
var cat = "";
function child(valor){
	//alert(valor);}
	padre = "";
	path = "";
	$("#child").html("");
	$(".no-display").removeClass("no-display");
	var child = "https://api.mercadolibre.com/categories/"+valor;
	
	
	// Esta sección sirve para encontrar el padre anterior.
	$.getJSON(child, function(resultCategoria){
		$.each(resultCategoria.path_from_root, function (i, field) {
			console.log("Valor :"+valor);
			console.log("Id :"+field.id);
			id_cat = field.id;
			cat = field.name;
			if(field.id != valor){
				padre = field.id;
			}
			// Esta parte sirve para generar el path.
			if(path == ""){
				path = "<a onClick='child(\""+field.id+"\")'>"+field.name+"</a>";
			}
			else{
				path = path+" > <a onClick='child(\""+field.id+"\")'>"+field.name+"</a>";
			}
		});
		
		// Publicamos el path.
		path = "Path: "+path;
		$("#path").html(path);
		$("#id_cat").val(id_cat);
		$("#cat").val(cat);
		console.log('Este es el id ' + id_cat + ' y es de la Categoria ' + cat);
		
		// Validamos si estamos en la primera sección, para imprimir o no el botón de regresar.
		if(padre != "" && padre != valor){
			$('#child').append("<li class='back' onClick='child(\""+padre+"\")'>Regresar...</li>");
		}
		
		// Buscar todas las categorias hijas y las imprime.
		$.getJSON(child, function(resultCategoria){
			$.each(resultCategoria.children_categories, function (i, field) {
				$('#child').append("<li onClick='child(\""+field.id+"\")'>"+field.name+"</li>");
			});
		});
		
	});
	
}