$( ".donforms" ).on('submit', function( event ) {
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
        $('html,body').animate({ scrollTop: $form.offset().top }, 1000);
    })
    .done(function(data) {
        if(data.status == 'error') {
            toastr.error(data.message);
        } else {
            $form[0].reset();
            toastr.success('Message sent successfully. We will be in touch shortly.');
        }
    })
    .fail(function(data) {
        toastr.error(data.message);
    });
});