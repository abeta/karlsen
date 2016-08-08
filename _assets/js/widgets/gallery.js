$(document).ready(function() {
  var current;
  var $modal = $('#galleryModal');
  
  if(!$modal.length) return false;
  
  // open modal
  $('#gallery a').click(function(){
    var $el = $(this);
    current = $el;
    $modal.children('.modal-title, .modal-body').empty();
    $modal.children('.modal-title').html($el.data("title"));
    $modal.children('.modal-body').html('<img class="img-responsive" src="'+$el.data("image")+'"/>');
    $modal.modal({show:true});
  });
  
  // previous/next buttons
  $modal.children('.next').click(function(){
    current.parent().next().children('a').click();
  });
  $modal.children('.previous').click(function(){
    current.parent().prev().children('a').click();
  });
});