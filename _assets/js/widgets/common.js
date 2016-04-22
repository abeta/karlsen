// off-canvas menu
$(document).on('click', function (e) {
    if ($(e.target).closest(".navbar-collapse.in").length === 0) {
        $(".navbar-collapse").removeClass('in');
    }
});

// select2 dropdowns
$("select").select2();

// bigtext
$(".section h1, .bigtext").each(function() {
    $el = $(this);
    if(!$el.children().length) {
        $el.html('<span>' + $el.html() + '</span>').bigtext();
    }
    else {
        $el.bigtext();
    }
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
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
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

toastr.options = {
  "positionClass": "toast-bottom-left"
}
