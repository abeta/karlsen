if($(".img-parallax").length) {
    var didScroll = false;
 
    $(window).scroll(function() {
        $(".img-parallax").css("background-position","50% -" + ($(this).scrollTop() * 1.26) + "px");
    });
}
