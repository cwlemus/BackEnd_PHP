/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
/*
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};*/
/*
  Función que inicializa el elemento Slider
*/





/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/*
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}


playVideoOnScroll();
*/

var arrayCiudades=[];
var arrayTipos=[];
$(function(){

  $('select').material_select();
data =(function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data-1.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

$('#frmFiltro').submit(function(event){
  var ciudad=$('#selectCiudad').val();
  var tipo=$('#selectTipo').val();
  console.log(ciudad);
  console.log(tipo);
  var slider = $("#rangoPrecio").data("ionRangeSlider");
  var precioMinimo = slider.result.from;
  var precioMaximo = slider.result.to;
  var selectedVal = "ninguno";
  var selectedRadio = $("#radioDiv input[type='radio']:checked");
  if (selectedRadio.length > 0) {
    selectedVal = selectedRadio.val();
  }
  console.log(selectedVal);
  console.log(precioMinimo);
  console.log(precioMaximo);
  event.preventDefault();
  $.ajax(
    {
      url:'php/filtro.php',
      type: 'POST',
      data: {ciudad: ciudad,tipo: tipo, precioMinimo: precioMinimo, precioMaximo: precioMaximo, tipoOrden: selectedVal}
    }
  ).done(function(data){
    $('#contenido').html(data);
  });
});

//ciudades
$.each(data,function(i,item){
  arrayCiudades.push(item.Ciudad);
});

//Tipo
$.each(data,function(i,item){
  arrayTipos.push(item.Tipo);
});


arrayCiudades=arrayCiudades.unique();
arrayTipos=arrayTipos.unique();
$.each(arrayCiudades, function(i,item){  $('#selectCiudad').append($('<option>',{    value: item,    text: item }))});
$('#selectCiudad').material_select();
$.each(arrayTipos, function(i,item){  $('#selectTipo').append($('<option>',{    value: item,    text: item }))});
$('#selectTipo').material_select();




/*
$.each(arrayCiudades, function(i,item){  $('#selectCiudad').append($('<option>',{    value: item,    text: item }))});
$('select').material_select();
*/

  function inicializarSlider(){
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 200,
      to: 80000,
      prefix: "$"
    });
  }
  inicializarSlider();

$('#mostrarTodos').on('click',function(){
  $.ajax(
    {
      url:'php/mostrarTodo.php',
      context: document.body
    }).done(function(data){
      $('#contenido').html(data);
    });
});

});

//arreglos unicos
Array.prototype.unique=function(a){
return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});
