'use strict';

$(function(){ 
    // $( '#btn1' ).click(ajaxGet1);
    $( '#btn1' ).click(ajaxgetmembers);
    // $( '#btn2' ).click(ajaxGetQuery);
    $( '#btn2' ).click(ajaxGetQuery2);
    $(document ).ajaxStart(function(){
      $( 'body' ).css('opacity','.2');
    });
    $(document ).ajaxComplete(function(){
      $( 'body' ).css('opacity','1');
    });
    $( '#register' ).click(register);
    $( '#btn4' ).click(getPhotos);

    // $( '#formRegister' ).click(formRegister);
});

function ajaxGet1(){
    var settings = {
        "url": "http://localhost/api/filmlist/"+$( '#txt1' ).val().toLowerCase().trim(),
        "method": "GET",
        timeout: 20000
      };
      $.ajax(settings).done(function (data) {
        $( '#response' ).append($('<p>'+JSON.stringify(data)+'</p>'));
      }).fail(function(err){
        $( '#response' ).append( $( '<p/>' ).append(err.responseText) )
      });
}

function ajaxGetQuery(){
  var settings={
    method: 'get',
    url: 'http://localhost/api/films/',
    timeout: 20000
    // data: { name: $( '#txt2' ).val() }
  };
  $.ajax(settings).done(function(data){
    var $table=$( '<table class="table table-striped"/>' ).append($('<tbody/>'));
    $.each(data,function(i,value){
      if(i==="id"){
        $table.append( $( '<tr class="thead-dark"/>').append('<th>'+i+': </th>'+'<th>'+value+'</th>')  );
      }else{
        $table.append( $( '<tr/>').append('<td>'+i+': </td>'+'<td>'+value+'</td>')  );
      }
    });
    $( '#responseQuery' ).append($table);
    // $( '#responseQuery' ).append( $( '<p class="word-break"/>' ).append(JSON.stringify(data)) );
  }).fail(function(err){
    $( '#responseQuery' ).append( $( '<p class="word-break"/>' ).append(err.responseText) );
  }).always(function (){
    $( '#responseQuery' ).css('opacity','1');
  });
}

function ajaxgetmembers(){
  var settings={
    method: 'get' ,
    url: 'http://localhost/api/register/' ,
    // contentType: 'application/json',
    data: {
      // "id":$( '#txt1' ).val(),
      "name":$( '#txt1' ).val().toLowerCase().trim()
    },
    timeout: 20000
    // data: '{"id":'+JSON.stringify( $( '#txt1' ).val() )+',"name":'+JSON.stringify( $( '#txt2' ).val() )+'}'
  };
  $.ajax(settings).done(function(data){
    var $table=$( '<table class="table table-striped"/>' ).append($('<tbody/>'));
    $.each(data,function(i,value){
      $table.append( $( '<tr class="thead-dark text-center w-100"/>').append('<th colspan="2">user information</th>')  );
      $.each(value,function(i,value){
        $table.append( $( '<tr/>').append('<td>'+i+': </td>'+'<td>'+value+'</td>')  );
      });
    });
    $( '#response' ).html($table);
  }).fail(function(err){
    $( '#response' ).html( $( '<p/>' ).append(err.responseText) );
  });
}


function ajaxGetQuery2(){
  var settings={
    method: 'post',
    url: 'http://localhost/api/',
    data: {"name": $( '#txt2' ).val().toLowerCase().trim()},
    timeout: 20000
  };
  $.ajax(settings).done(function(data){
    var $table=$( '<table class="table table-striped"/>' ).append($('<tbody/>'));
    // $.each(data,function(i,value){
    //   $.each(value,function(i,value){
    //     if(i==="tags"){
    //       $table.append( $( '<tr class="thead-dark"/>').append('<th>'+i+': </th>'+'<th>'+value+'</th>')  );
    //     }else{
    //       $table.append( $( '<tr/>').append('<td>'+i+': </td>'+'<td>'+value+'</td>')  );
    //     }
    //   });
    // });
    $.each(data,function(i,value){
      if(i==="name"){
        $table.append( $( '<tr class="thead-dark"/>').append('<th>'+i+': </th>'+'<th>'+value+'</th>')  );
      }else{
        $table.append( $( '<tr/>').append('<td>'+i+': </td>'+'<td>'+value+'</td>')  );
      }
    });
    $( '#responseQuery' ).append($table);
  }).fail(function(err){
    $( '#responseQuery' ).append( $( '<p class="word-break"/>' ).append(err.responseText) );
  }).always(function (){
    $( '#responseQuery' ).css('opacity','1');
  });
}


function register(e){
  e.preventDefault();
  var settings={
    method: 'post' ,
    url: 'http://localhost/api/register/' ,
    data: {
      name: $( '#txtinput1' ).val().toLowerCase().trim(),
      password: $( '#txtinput2' ).val().toLowerCase().trim(),
      email: $( '#txtinput3' ).val().toLowerCase().trim()
    },
    timeout: 20000
  };
  $.ajax(settings).done(function(data){
    var $table=$( '<table class="table table-striped"/>' ).append($('<tbody/>'));
    $.each(data,function(i,value){
      $table.append( $( '<tr/>' ).append('<td>'+i+'</td>'+'<td>'+value+'</td>') )
    });
    $( 'div#userinfo' ).html( '<h1 class="text-center"> user info</h1>' ).append($table);
  }).fail(function(err){
    var $table=$( '<table class="table table-striped"/>' ).append($('<tbody/>'));
    $.each(err,function(i,value){
      $table.append( $( '<tr/>' ).append('<td>'+i+'</td>'+'<td>'+value+'</td>') )
    });
    $( 'div#userinfo' ).html( '<h1 class="text-center"> user info</h1>' ).append($table);
    console.log( err );
    // $( 'div#userinfo' ).html( $( '<p/>' ).append(err.responseText) )
  });
}


function getPhotos(){
  var settings={
    method: 'get' ,
    url:'/api/getphotos/',
    // url: 'https://api.unsplash.com/search/photos' ,
    data: {
      page:'2',
      query: 'tower,home',
      // client_id: '943fee9de0736ad9f96d496d8f228b25a8ca71142d2afbf5c463ac9e1fcdac11',
      per_page: '12'
    }
  };
  $.ajax(settings).done(function(data){
    // $.each(data.results,function(i,value){
    $.each(data,function(i,value){
      // var imgsrc = value.urls.regular;
      $( '#responsePhoto' ).append
        ( $( '<img src="'+value+'" alt="" class="col-sm-6 col-md-4 mb-2 img-fluid px-4 px-sm-1" style="height:300px;overflow:hidden;object-fit:cover;border-radius: 0.4rem;">' ) );
      // (function(v){
        // var imgsrc = value.urls.regular;
      //   $( '#responsePhoto' ).append
      //   ( $( '<img src="'+imgsrc+'" alt="" class="col-sm-6 col-md-4 mb-2 img-fluid img-thumbnail" style="height:300px;overflow:hidden;object-fit:cover;">' ) );
      //   // $( '#responsePhoto' ).append( $( '<div class="col-sm-6 col-md-4 mb-2" style="height:300px;overflow:hidden;" ></div>' )
      //   // .append( $( '<img src="'+imgsrc+'" alt="" class="img-fluid img-thumbnail" style="object-fit:cover;">' ) ) );
      // }(value));
    });
  }).fail(function(err){
    $( '#responsePhoto' ).append( $( '<p/>' ).append(err.responseText) )
  });
}


