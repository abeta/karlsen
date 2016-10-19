if($('.submenu').length) {
  $('.submenu').affix({
    offset: {
      top: function () {
        return $('.banner').outerHeight(true) - $('.submenu').outerHeight(false);
      },
      bottom: function () {
        return $('.footer').outerHeight(true);
      }
    }
  });
  $('body').scrollspy({
    target: '#submenu',
    offset: (function() {
      return $('#nav').outerHeight() + $('.submenu').outerHeight() + 1;
    })()
  });
}