(function() {
    // Hide Header on on scroll down
    var $navbar = $('.navbar');
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $navbar.outerHeight();
    
    $(window).on('scroll', function() {
        didScroll = true;
    }).on('resize', function() {
        if($(this).scrollTop() < navbarHeight) {
            $navbar.removeClass('nav-up');
        }
    });
    
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    
    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $navbar.addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $navbar.removeClass('nav-up');
            }
        }
        
        lastScrollTop = st;
    }
})();