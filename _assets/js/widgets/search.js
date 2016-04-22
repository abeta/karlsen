$("#search").on("click", function() {
    $("#search-form").css("display", "block");
    $(".navbar-nav,.navbar-extra").css("display", "none");
    $('.navbar').addClass("nav-down");
    $('#search_control').focus();
    
});
$("#close_search").on("click", function() {
    $("#search-form").css("display", "");
    $(".navbar-nav,.navbar-extra").css("display", "");
    $('.navbar').removeClass("nav-up").removeClass("nav-down");
});