/*
 *	Common javascript for jolivapps.com
 *
 */
// Boton Top
$(document).delegate('.btn-to-top', 'click', function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
});
// Evitar que se cierre el carrito al clicar dentro
$(function() {
	$("ul.dropdown-menu").on("click", function(e) {
	    e.stopPropagation();
	});
});
// Search
$(document).delegate('.btn-search','click', function() {
  search();
});
$(document).delegate('#search_filter','keydown', function(e) {
  if (e.keyCode == 13) {search();}
});
function search(){
  url = $('base').attr('href') + 'index.php?route=product/search';
  var filter_name = $('#search_filter').attr('value');
  if (filter_name) {
    url += '&filter_name=' + encodeURIComponent(filter_name);
  }
  location = url;
}
//Wishlist
var wishlist = {
  'add': function(product_id) {
    $.ajax({
      url: 'index.php?route=account/wishlist/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function(json) {
        $('.alert').remove();

        if (json['success']) {
          $('.main-body>.container').parent().before('<div class="alert alert-success alert-dismissible fade in" role="alert"><span class="fa fa-thumbs-up"></span>&nbsp;' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
        }

        if (json['info']) {
          $('.main-body>.container').parent().before('<div class="alert alert-info alert-dismissible fade in" role="alert"><span class="fa fa-info-circle"></span>&nbsp;' + json['info'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
        }

        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    });
  },
  'remove': function() {}
}
//Get var fo cart
function getURLVar(key) {
  var value = [];
  var query = String(document.location).split('?');
  if (query[1]) {
    var part = query[1].split('&');
    for (i = 0; i < part.length; i++) {
      var data = part[i].split('=');
      if (data[0] && data[1]) {
        value[data[0]] = data[1];
      }
    }
    if (value[key]) {
      return value[key];
    } else {
      return '';
    }
  }
}
// Cart add remove functions
var cart = {
  'add': function(product_id, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/add',
      type: 'post',
      data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
      dataType: 'json',
      beforeSend: function() {
        $('#cart > button').button('loading');
      },
      success: function(json) {
        $('.alert, .text-danger').remove();

        $('#cart > button').button('reset');

        if (json['redirect']) {
          location = json['redirect'];
        }

        if (json['success']) {
          $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

          $('#cart-total').html(json['total']);

          $('html, body').animate({ scrollTop: 0 }, 'slow');

          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      }
    });
  },
  'remove': function(key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      beforeSend: function() {
        $('#cart > button').button('loading');
      },
      success: function(json) {
        $('#cart > button').button('reset');

        $('#cart-total').html(json['total']);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      }
    });
  }
}

// Magnific zoom
$('.zoom').magnificPopup({
	type: 'image',
	closeOnBgClick: true,
	closeBtnInside: true,
	image: {
	  verticalFit: true
	},
	gallery: {
	  enabled: true,
	  navigateByImgClick: true,
	  arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% ctrl-btn"><span class="fa mfp-prevent-close"></span></button>', // markup of an arrow button
	  preload: [0,2] // Will preload 0 - before current, and 1 after the current image
	}
});
// reviews carousel 
$('.owl-carousel').owlCarousel({
  margin:10,
  nav:true,
  navText:['<span class="fa fa-chevron-left"></span>','<span class="fa fa-chevron-right"></span>'],
  navContainer:'.nav-controlers',
  responsive:{
      0:{items:1},
      768:{items:2},
      992:{items:2},
      1200:{items:3}
  }
});
// ellipsis 
$('.bubble-rev p').dotdotdot({watch: true});
$('.product-tile .desc > div').dotdotdot({watch: true}); 
// Rating input
$(function() {
var checked_rating = false;
$('.rating-input > label').mouseenter( 
  function(e) {
    var $elem =  $(this);
    $elem.addClass('ind');
    $elem.prevAll('label').addClass('ind');
    $elem.nextAll('label').removeClass('ind');
    changeSmile($elem.siblings('span'),$elem.prev('input').val());
    e.stopPropagation();
  }
);
$('.rating-input').mouseleave( 
  function(e) {
    var $elem =  $(this);
    $elem.find('label').removeClass('ind');
    if(!checked_rating){
      $elem.find('span').removeClass();
    }else{
      changeSmile($elem.find('span'),$elem.find('input:checked').val());
    }
    e.stopPropagation();
});
$('.rating-input > input').change(function() {
  if(this.checked) {
	    checked_rating = true;
	    var $elem =  $(this);
	    $elem.nextAll('label').removeClass('check');
	    $elem.next().addClass('check').removeClass('ind');
	    $elem.prevAll('label').addClass('check').removeClass('ind');
	  }else{
	    checked_rating = false;
	  }
	});
}); 
function changeSmile($element, value){
	$element.removeClass().addClass('colored fa');
	switch(value){
	  case '1': $element.addClass('fa-frown-o');break;
	  case '2': case '3': $element.addClass('fa-meh-o');break;
	  case '4': case '5': $element.addClass('fa-smile-o');break;
	}
}
// review links
$(document).delegate('#link-review','click', function(e) {
	$('html, body').animate({scrollTop : $('#review-carousel').offset().top-20 },600);
	e.stopPropagation();
});
$(document).delegate('#link-write-review', 'click', function(e) {
	$('html, body').animate({scrollTop : $('#review-form').offset().top-20 },600);
	e.stopPropagation();
});
// Carousel producto
$('#carousel-product').owlCarousel({
  items:1,
  margin:10,
  nav:false
});
// Mask/unmask password
$(document).delegate('.psw-check input','click',function(e) {
  if( $(this).prop('checked') ){
      $('#'+$(this).attr('name') ).attr('type', 'text');
  }else{
      $('#'+$(this).attr('name')).attr('type', 'password');
  }
});
// Tooltip
$testEl = $('<div id="smTest" class="hidden-xs hidden-sm"></div>');
$testEl.appendTo($('body'));
if( !$('#smTest').is(':hidden') ){
$('.btn-go, .btn-delete, .btn-edit, .btn-add').tooltip({container: 'body'}); 
}
// Check button
$(document).delegate('.btn-check','click',function(e) {
 console.log(e.target.nodeName);
 if( e.target.nodeName == "SPAN" || e.target.nodeName == "BUTTON" ){
  e.preventDefault();
 }
  $icon = $(this).children('span.fa');
  if($icon.hasClass('fa-square-o')){
    $icon.removeClass('fa-square-o').addClass('fa-check-square-o');
    $(this).prev().val('true');
  }else{
    $icon.removeClass('fa-check-square-o').addClass('fa-square-o');
    $(this).prev().val('false');
  }
});
// Legend with radios label work
$(document).delegate('legend > span', 'click', function(e) {
  $(this).prev().prop("checked", true);
});
// Accordion always one open
$('.accordion-legend').on('click',function(e){
  console.log("aqui");
  if($(this).parent().children('.collapse').hasClass('in')){
      e.stopPropagation();
  }
});
// Contact link to higlight
$(document).delegate('.go-contact' ,'click', function(e) {
  $('body').animate(
    {scrollTop : $('.contact').offset().top-20 },
    600, 
    function() {
      $('.contact a, .contact .btn').addClass('hovered').delay( 600 ).queue(function(next){
          $(this).removeClass('hovered').dequeue();;
      });
    });
  e.stopPropagation();
});
