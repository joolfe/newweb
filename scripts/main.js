/*
 *	Common javascript for jolivapps.com
 *
 */
// Boton Top
$('.btn-to-top').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
});
// Evitar que se cierre el carrito al clicar dentro
$(function() {
	$("ul.dropdown-menu").on("click", function(e) {
	    e.stopPropagation();
	});
});
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
  loop:false,
  margin:10,
  nav:true,
  dots:true,
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
$( "#link-review" ).click(function(e) {
	$('html, body').animate({scrollTop : $('#review-carousel').offset().top-20 },600);
	e.stopPropagation();
});
$( "#link-write-review" ).click(function(e) {
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
$('.psw-check input').click(function(e) {
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
$( '.btn-check' ).click(function(e) {
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
$( 'legend > span' ).click(function(e) {
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
$( ".go-contact" ).on('click', function(e) {
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