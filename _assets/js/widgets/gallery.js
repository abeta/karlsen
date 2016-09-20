$(document).ready(function() {
  var current;
  var $modal = $('#galleryModal');

  if(!$modal.length) return false;

  $modal.modal({show:false});

  var $m = {
    header: $modal.find('.modal-header'),
    title: $modal.find('.modal-title'),
    body: $modal.find('.modal-body'),
  };

  // open modal
  $('.gallery a').click(function(){
    var $el = $(this);
    current = $el;
    $m.title.html($el.data("title") ? $el.data("title") : $el.attr("title"));
    $m.body.html('<img src="' + $el.data("image") + '" class="hidden" />');
    $modal.modal('show');
    return false;
  });

  // previous/next buttons
  var previous = function() {
    $modal.one('hidden.bs.modal', function (e) {
      current.parent().prev().children('a').click();
    }).modal('hide');
  };
  var next = function() {
    $modal.one('hidden.bs.modal', function (e) {
      current.parent().next().children('a').click();
    }).modal('hide');
  };

  $modal.find('.previous').click(previous);
  $modal.find('.next').click(next);

  var arrowKeys = function(e) {
    if (e.which == '37' || e.which == '38') {
      previous();
    }
    else if (e.which == '39' || e.which == '40') {
      next();
    }
  };

  var setSize = function() {
    $modal.find('.modal-dialog').width('100%');
    var maxHeight = $(window).height()-$m.header.outerHeight();
    var $img = $m.body.find('img');
    $img.css("max-height", maxHeight).removeClass('hidden');
    $modal.find('.modal-dialog').width($img.width());
  };
  var setSizeDebounced = debounce(setSize, 250);

  $modal.on('shown.bs.modal', function (e) {
    setSize();
    $(window).on('resize', setSizeDebounced).on('keydown', arrowKeys);
  });

  $modal.on('hidden.bs.modal', function (e) {
    $(window).off('resize', setSizeDebounced).off('keydown', arrowKeys);
  });

});