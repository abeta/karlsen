$( ".donforms" ).on('submit', function( event ) {
    var $el = $(this);
    function message(msg, type) {
      $el.children('.alert').remove();
      if(!type) type = 'info';
      $el.prepend('<div class="alert alert-dismissible alert-' + type + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
    }
    event.preventDefault();
    var $form = $(this),
        data = $form.serialize(),
        data2 = $form.serializeArray(),
        $input = $form.find('input, select, textarea').prop('disabled', 1),
        $btn = $form.find('button').button('loading');
        
    $.ajax({
        url: $form.attr("action"),
        type: 'post',
        data: data,
        accepts: {
            json: 'application/json'
        },
    }).always(function(data) {
        $input.prop('disabled', 0);
        $btn.button('reset');
        if (typeof Recaptcha != "undefined") {
            Recaptcha.reload();
        }
        $('html,body').animate({ scrollTop: $form.offset().top - $('#nav').outerHeight() - 15 }, 1000);
    })
    .done(function(data) {
        if(data.status == 'error') {
            message(data.message, 'danger');
        } else {
            $form[0].reset();
            message('Message sent successfully. We will be in touch shortly.', 'success');
        }
    })
    .fail(function(data) {
        message(data.message, 'danger');
    });
});
