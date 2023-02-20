$(document).ready(function() {
	$('.menu-burger__header').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.navigation__list').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
	});
});

