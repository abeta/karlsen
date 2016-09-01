// off-canvas menu
$(document).on('click', function (e) {
    if ($(e.target).closest(".navbar-collapse.in").length === 0) {
        $(".navbar-collapse").removeClass('in');
    }
});

// owl-carousel
$(".owl-carousel").each(function (index) {
    var el = $(this),
        options = el.data();
    el.owlCarousel(options);
});

// select2 dropdowns
$("select").select2({
    minimumResultsForSearch: 5
});
$("select[multiple]").select2({
    dropdownAutoWidth : true,
    width: 'auto'
});

// tooltips
$('[data-toggle="tooltip"]').tooltip();

// popovers
$('[data-toggle="popover"]').popover({
  html: true,
  trigger: "hover",
  placement: "auto left"
});


// tabs
$('[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $(window).trigger('resize');
});

// smooth scroll to anchor
$('a[href*="#"]:not([href="#"],.carousel-control,[data-toggle])').click( function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - ($('.navbar-fixed-top').outerHeight() + $('.submenu').outerHeight() - 2)
            }, 800);
            return false;
        }
    }
});
$('a[href="#"]:not(.carousel-control,[data-toggle])').click( function() {
    $('html,body').animate({ scrollTop: 0 }, 800);
    return false;
});

$('.donslide .item').on('click', function() {
    var $el = $(this);
    function activate(){
        $el.addClass('active');
        $('html,body').animate({
            scrollTop: $el.offset().top
        }, 1000, function() {
            if( $(window).scrollTop() >= $('#nav').height() ) {
                $('#nav').addClass('nav-up');
            }
        });
    }
    if($el.hasClass('active')) {
        $el.removeClass('active');
    }
    else if($el.parent().find('.item').hasClass('active')) {
        $('.donslide .item').removeClass('active');
        window.setTimeout( activate, 1000 );
    }
    else {
        activate();
    }
});
