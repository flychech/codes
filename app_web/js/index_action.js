//Niveles:
// 0 = página principal
// 1 = sub menus
// 2 = sub sub menus
// 3 = productos
// 4 = producto solo
var nivel = 0;
var abuelo = 0;
var sub = 0;
var vistaActual = 0;
var ultimosub = 0;
var busqueda = 0;
var primeraVez = 0;

$(document).ready(function(){


$(".container-hm").on("mousedown touchstart", ".category-div", function(){
	$(this).addClass('category-div-hold');
});

$(".container-hm").on("mouseup mouseleave touchend", ".category-div", function() {
    $(this).removeClass('category-div-hold');
});

$(".container-hm").on("mousedown touchstart", ".product-menu-div", function(){
	$(this).addClass('product-div-hold');
});

$(".container-hm").on("mouseup mouseleave touchend", ".product-menu-div", function() {
    $(this).removeClass('product-div-hold');
});

$("#icono-menu-lateral").click(function(){
	/*$("#menu-lateral").css({
	   "left": "0px"
	});*/
	$("#menu-lateral").animate({left:"0px"}, 300);

	$("#opaco-lateral").show();
});

$("#opaco-lateral").click(function(){
	/*$("#menu-lateral").css({
	   "left": "-60%"
	});*/
	$("#menu-lateral").animate({left:"-60%"}, 300);

	$("#opaco-lateral").hide();
});



// Muestra sub menu si hay
$("#principal-hm").on("click tap", ".category-div", function(){
	if($(this).hasClass('hijos')){
		$("#submenu-hm").addClass('vista');
		$("#subsubmenu-hm").addClass('oculta');
		$("#subsubmenu-hm").removeClass('vista');
		$("#principal-hm").removeClass('vista');
		$("#principal-hm").addClass('oculta');
		var categoryId = $(this).attr('id');
		categoryId = categoryId.substring(4);
		getSubMenu(categoryId);
		vistaActual = 1;
		ultimosub = 0;
	}else{
		
		var categoryId = $(this).attr('id');
		categoryId = categoryId.substring(4);
		getProduct(categoryId);
		vistaActual = 3;
		ultimosub = 0;
	}
	
});

//Muestra sub sub menu si hay
$("#submenu-hm").on("click tap", ".category-div", function(){
	if($(this).hasClass('hijos')){
		$("#submenu-hm").addClass('oculta');
		$("#submenu-hm").removeClass('vista')
		$("#subsubmenu-hm").addClass('vista');
		$("#subsubmenu-hm").removeClass('oculta');
		$("#principal-hm").removeClass('vista');
		$("#principal-hm").addClass('oculta');
		var categoryId = $(this).attr('id');
		categoryId = categoryId.substring(4);
		getSubSubMenu(categoryId);
		vistaActual = 2;
		ultimosub = 1;
	}else{
		var categoryId = $(this).attr('id');
		categoryId = categoryId.substring(4);
		getProduct(categoryId);
		vistaActual = 3;
		ultimosub = 1;
	}
	
});

//Muestra lista de productos cuando estamos en un sub sub menu
$("#subsubmenu-hm").on("click tap", ".category-div", function(){
		var categoryId = $(this).attr('id');
		categoryId = categoryId.substring(4);
		getProduct(categoryId);
		vistaActual = 3;
		ultimosub = 2;
	
});

$(".container-hm").on("click tap", ".product-menu-div", function(){

	$("#submenu-hm").addClass('oculta');
	$("#submenu-hm").removeClass('vista');
	$("#principal-hm").removeClass('vista');
	$("#principal-hm").addClass('oculta');

	$("#products-hm").addClass('oculta');
	$("#products-hm").removeClass('vista');
	$("#product-hm").removeClass('oculta');
	$("#product-hm").addClass('vista');
	
	var productId = $(this).attr('id');
	productId = productId.substring(5);
	getProductAlone(productId);
	vistaActual = 4;
});

/*$("#back-hm").click(function(){
	$("#products-hm").removeClass('oculta');
		$("#products-hm").addClass('vista');
		$("#product-hm").removeClass('vista');
		$("#product-hm").addClass('oculta');
		nivel = 2;
		sub--;
});*/

getPrincipal();

});

document.addEventListener("backbutton", pulsaRetorno, false);

//Para que fasclick entre en acción
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

function pulsaRetorno(){

	$("#reading-hm").hide();

	switch(vistaActual){
		case 0:
			var r = confirm("Seguro quiere salir?");
			if (r == true) {
		    	//Para cerrar la aplicación
				navigator.app.exitApp();
			} else {
		   	
			}
		break;

		case 1:
			$("#principal-hm").removeClass('oculta');
			$("#principal-hm").addClass('vista');

			$("#submenu-hm").removeClass('vista');
			$("#submenu-hm").addClass('oculta');
			$("#subsubmenu-hm").removeClass('vista');
			$("#subsubmenu-hm").addClass('oculta');
			
			vistaActual = 0;
		break;

		case 2:
			$("#submenu-hm").addClass('vista');
			$("#submenu-hm").removeClass('oculta');

			$("#subsubmenu-hm").addClass('oculta');
			$("#subsubmenu-hm").removeClass('vista');
			$("#principal-hm").removeClass('vista');
			$("#principal-hm").addClass('oculta');
			vistaActual = 1;
		break;

		case 3:
			if (ultimosub==1) {
				$("#submenu-hm").removeClass('oculta');
				$("#submenu-hm").addClass('vista');

				$("#subsubmenu-hm").removeClass('vista');
				$("#subsubmenu-hm").addClass('oculta');
				$("#principal-hm").removeClass('vista');
				$("#principal-hm").addClass('oculta');
				$("#products-hm").addClass('oculta');
				$("#products-hm").removeClass('vista');
				vistaActual = 1;
			}else if(ultimosub==2){
				$("#subsubmenu-hm").removeClass('oculta');
				$("#subsubmenu-hm").addClass('vista');

				$("#submenu-hm").removeClass('vista');
				$("#submenu-hm").addClass('oculta');
				$("#principal-hm").removeClass('vista');
				$("#principal-hm").addClass('oculta');
				$("#products-hm").addClass('oculta');
				$("#products-hm").removeClass('vista');
				vistaActual = 2;
			}else if(ultimosub==0){
				$("#principal-hm").removeClass('oculta');
				$("#principal-hm").addClass('vista');

				$("#submenu-hm").removeClass('vista');
				$("#submenu-hm").addClass('oculta');
				$("#subsubmenu-hm").removeClass('vista');
				$("#subsubmenu-hm").addClass('oculta');
				$("#products-hm").addClass('oculta');
				$("#products-hm").removeClass('vista');
				vistaActual = 0;
			}
		break;

		case 4:
			$("#products-hm").addClass('vista');
			$("#products-hm").removeClass('oculta');

			$("#submenu-hm").addClass('oculta');
			$("#submenu-hm").removeClass('vista');
			$("#subsubmenu-hm").addClass('oculta');
			$("#subsubmenu-hm").removeClass('vista');
			$("#principal-hm").removeClass('vista');
			$("#principal-hm").addClass('oculta');
			$("#product-hm").removeClass('vista');
			$("#product-hm").addClass('oculta');
			vistaActual = 3;
		break;
	}
	
}

function getPrincipal(){

	var result = "";
	var html = "";

	$("#principal-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		"option=1", 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							$("#reading-hm").show();
						},
			success: 	function(data)
						{	

							

							for(var i=0; i<data.category.length; i++){
								if(data.childs[i]==1){
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer hijos">';
								}else{
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer">';
								}
								html += 	'<img class="category-image" src="'+data.image[i]+'">';
								html +=		'<div class="category-name">'
								html +=			'<label class="eurostile">'+data.name[i]+'</label>';
								html +=		'</div>';
								html += '</div>';
							}

							$("#principal-hm").append(html);

						},
			error: function(){
					        //alert("no hay conexión");
					        html = 	'<div class="fallo-conexion">';
					        html +=		'<span class="fuente_12 fuente_gris">Fallo en la conexión, intentalo nuevamente.</span>';
					        html += '</div>';

					        $("#principal-hm").append(html);
					   },
			complete: function(){
							$("#reading-hm").hide();
						}
	});
}

function getSubMenu(id){

	var result = "";
	var html = "";

	$("#submenu-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		"option=2&id="+id, 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							$("#reading-hm").show();
						},
			success: 	function(data)
						{	

							

							for(var i=0; i<data.category.length; i++){
								if(data.childs[i]==1){
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer hijos">';
								}else{
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer">';
								}
								html += 	'<img class="category-image" src="'+data.image[i]+'">';
								html +=		'<div class="category-name">'
								html +=			'<label class="eurostile">'+data.name[i]+'</label>';
								html +=		'</div>';
								html += '</div>';
							}

							$("#submenu-hm").append(html);

						},
			error: function(){
					        html = 	'<div class="fallo-conexion">';
					        html +=		'<span class="fuente_12 fuente_gris">Fallo en la conexión, intentalo nuevamente.</span>';
					        html += '</div>';

					        $("#submenu-hm").append(html);
					   },
			complete: function(){
							$("#reading-hm").hide();
						}
	});

}

function getSubSubMenu(id){

	var result = "";
	var html = "";

	$("#subsubmenu-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		"option=2&id="+id, 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							$("#reading-hm").show();
						},
			success: 	function(data)
						{	

							

							for(var i=0; i<data.category.length; i++){
								if(data.childs[i]==1){
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer hijos">';
								}else{
									html += '<div id="cat_'+data.category[i]+'" class="category-div pointer">';
								}
								html += 	'<img class="category-image" src="'+data.image[i]+'">';
								html +=		'<div class="category-name">'
								html +=			'<label class="eurostile">'+data.name[i]+'</label>';
								html +=		'</div>';
								html += '</div>';
							}

							$("#subsubmenu-hm").append(html);

						},
			error: function(){
					        html = 	'<div class="fallo-conexion">';
					        html +=		'<span class="fuente_12 fuente_gris">Fallo en la conexión, intentalo nuevamente.</span>';
					        html += '</div>';

					        $("#subsubmenu-hm").append(html);
					   },
			complete: function(){
							$("#reading-hm").hide();
						}
	});

}

function getProduct(id){
	var result = "";
	var html = "";
	var tipoDato = "";

	$("#submenu-hm").addClass('oculta');
	$("#submenu-hm").removeClass('vista');
	$("#subsubmenu-hm").addClass('oculta');
	$("#subsubmenu-hm").removeClass('vista');
	$("#principal-hm").removeClass('vista');
	$("#principal-hm").addClass('oculta');
	$("#products-hm").addClass('vista');
	$("#products-hm").removeClass('oculta');

	if(busqueda==1){
		tipoDato = "option=3&busqueda="+id;
	}else{
		tipoDato = "option=3&id="+id;
	}

	$("#products-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		tipoDato, 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							$("#reading-hm").show();
						},
			success: 	function(data)
						{	

							

							//Separamos la cadena para ingresar a los directorios de prestashop y obtener la imagen
							for(var i=0; i<data.idProduct.length; i++){
								var cadenaImagen = "";
								var folders = data.idImage[i].split("");
								for (var z in folders) {
									cadenaImagen += folders[z];
								    cadenaImagen += "/";
								}

								//Esto es para redondear el precio y agregarle el iva
								var priceProduct = parseInt(data.priceProduct[i]*1.16);

								html += '<div id="prod_'+data.idProduct[i]+'" class="product-menu-div pointer">';
								html += 	'<img class="product-menu-image" src="http://hmovil.com/img/p/'+cadenaImagen+''+data.idImage[i]+'.jpg">';
								html +=		'<div class="product-menu-name">';
								html +=			'<div class="div-product-name-hm">';
								html +=			'<label class="eurostile">'+data.nameProduct[i]+'</label>';
								html +=			'</div>';
								html +=			'<div>';
								html +=			'<label class="price-product-hm rojo_obscuro strong">$ '+priceProduct+'</label>';
								html +=			'</div>';
								html +=		'</div>';
								html += '</div>';
							}

							$("#products-hm").append(html);

						},
			error: function(){
					        html = 	'<div class="fallo-conexion">';
					        html +=		'<span class="fuente_12 fuente_gris">Fallo en la conexión, intentalo nuevamente.</span>';
					        html += '</div>';

					        $("#products-hm").append(html);
					   },
			complete: function(){
							$("#reading-hm").hide();
						}
	});
}

function getProductAlone(id){
	var result = "";
	var html = "";

	$("#product-info-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		"option=5&id="+id, 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							$("#reading-hm").show();
						},
			success: 	function(data)
						{	

							

								productImages(data.idProduct[0]);

								var priceProduct = parseInt(data.priceProduct[0]*1.16);

								html+=	'<div id="product-title-hm"><label id="name-product-hm" class="opificio_bold">'+data.nameProduct[0]+'</label></div>';
								html+=	'<div id="price-social">';
								html+=		'<div id="price-productalone-hm"><label class="opificio_bold">$</label> <label id="data-price-hm" class="opificio_bold">'+priceProduct+'</label></div>';
								html+=		'<div id="social-hm"><img class="acoplate" src="pics/prueba_botones.png"></div>';
								html+=		'<div class="clear"></div>'
								html+=	'</div>';
								html+=	'<div>';
								html+=	'<label id="model-product-hm" class="opificio_bold">Modelo: </label>';
								html+=	'<label id="reference-product-hm" class="opificio_rounded">'+data.referenceProduct[0]+'</label>';
								html+=	'<br>';
								html+=	'<br>';
								html+=	'<label class="opificio_bold">Descripción:</label>';
								html+=	'<br>';
								html+=	'<div id="desc-product-hm" class="opificio_rounded">'+data.descriptionProduct[0]+'</div>';
								html+=	'</div>';

							$("#product-info-hm").append(html);

						},
			error: function(){
					        html = 	'<div class="fallo-conexion">';
					        html +=		'<span class="fuente_12 fuente_gris">Fallo en la conexión, intentalo nuevamente.</span>';
					        html += '</div>';

					        $("#product-info-hm").append(html);
					   },
			complete: function(){
								
							$("#reading-hm").hide();
						}
	});
}

function productImages(id){
	var result = "";
	var html = "";

	$("#square-image-hm").empty();

	$.ajax({ 
			type: 		"POST",
			data: 		"option=6&id="+id, 
			dataType:   "json",
			url: 		"http://hmovil.com/app/GetData_web.php", 
			//async: 		 false,
			//cache:		 false,
			beforeSend: function(){
							
						},
			success: 	function(data)
						{	
							
							
							html+= '<div id="owl-example" class="owl-carousel">';

							for(var i=0; i<data.idProduct.length; i++){
								var cadenaImagen = "";
								var folders = data.idImage[i].split("");
								for (var z in folders) {
									cadenaImagen += folders[z];
								    cadenaImagen += "/";
								}

								html += '<img class="slider-image-hm" src="http://hmovil.com/img/p/'+cadenaImagen+''+data.idImage[i]+'.jpg">';

							}

							html+='</div>';

							$("#square-image-hm").append(html);
						},
			complete: function(){
								
								$("#square-image-hm #owl-example").owlCarousel({
 
								    navigation : false, // Show next and prev buttons
								    slideSpeed : 300,
								    paginationSpeed : 400,
								    singleItem:true
								 
								    // "singleItem:true" is a shortcut for:
								    // items : 1, 
								    // itemsDesktop : false,
								    // itemsDesktopSmall : false,
								    // itemsTablet: false,
								    // itemsMobile : false
							 
							  	});

						}
	});
}
