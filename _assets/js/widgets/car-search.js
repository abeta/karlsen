// Custom sorting plugin
(function($) {
    $.fn.sorted = function(params) {
        var defaults = {
            reverse: false,
            sortBy: false,
            filter: false,
            limit: false,
            start: 0
        };
        var options = $.extend({}, defaults, params);

        var $data = $(this).clone();

        if(options.filter) {

        }

        if(options.sortBy) {
            var items = $data.get();
            items.sort(function(a, b) {
                if(typeof(options.sortBy) === 'string') {
                    var sortBy = options.sortBy;
                    // attribute e.g. "[data-id]"
                    if(sortBy.match(/\[[^\]\t\n\f \/>"'=]+\]/)) {
                        options.sortBy = function(el) {
                            return $(el).attr(sortBy.replace(/\[|\]/g, ''));
                        };
                    }
                    // css selector e.g. ".name"
                    else {
                        options.sortBy = function(el) {
                            return $(el).find(sortBy).text();
                        };
                    }
                }
                var valA = options.sortBy($(a));
                var valB = options.sortBy($(b));
                if (options.reverse) {
                    return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
                } else {
                    return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
                }
            });
            if(options.limit) {
                items = items.slice(options.start, options.start + options.limit);
            }
            $data = $(items);
        }

        return $data;
    };
})(jQuery);

var quicksand = (function( data ) {
    var $filter = $('#filter'),
        sort = '#sort :selected',
        order = '#order :checked',
        $container = $('.filter-container'),
        $selector = '.filter-item',
        $filteredData;

    var source = "<div>";
    for (var i = 0; i < data.length; i++) {
        var $item = $( $($selector).clone()[0].outerHTML );
        $item
          .attr('data-id', data[i].id)
          .attr('data-make', data[i].make);
        $item.find('a').attr('href', data[i].url);
        $item.find('.title').html(data[i].title);
        $item.find('.price').html(data[i].price);
        $item.find('.mileage').html(data[i].mileage);
        $item.find('.year').html(data[i].year);
        $item.find('img')
              .attr('src', data[i].image)
              .attr('alt', data[i].title);
        source += $item[0].outerHTML;
    }
    source += "</div>";
    var $data = $(source),
        $sortedData = $data.find($selector);

    /*
    $('#loadmore_press').on('click', function() {

        // finally, call quicksand
        $container.quicksand($sortedData.slice(0, $container.find($selector).length + 15), {
            duration: 1000,
            easing: "swing",
            selector: ".filter-item",
            adjustWidth: false,
            attribute: "data-id",
            useScaling: true
        }, function() {
            if($sortedData.length > $container.find($selector).length) {
                $('#loadmore_press').show();
            } else {
                $('#loadmore_press').hide();
            }
        });
    });
    */

    // attempt to call Quicksand on every form change
    $('.filter-sort form').change(function(e) {
        var filter = $filter.val();
        if (filter) {
            for (var i = 0; i < filter.length; i++) {
                filter[i] = $selector + '[data-make="' + filter[i] + '"]';
            }
            $filteredData = $data.find(filter.join(","));
        } else {
            $filteredData = $data.find($selector);
        }

        var sortBy = $(sort).val();
        $sortedData = $filteredData.sorted({
            sortBy: (sortBy[0] == "." ? sortBy : '[data-' + sortBy + ']'),
            reverse: ($(order).val() == 'desc')
        });

        // finally, call quicksand
        $container.quicksand($sortedData, {
            duration: 1000,
            easing: "swing",
            selector: ".filter-item",
            adjustWidth: false,
            adjustHeight: 'dynamic',
            attribute: "data-id",
            useScaling: true
        }, function() {
            $container.attr('style', '').find($selector).attr('style', '');
            if($sortedData.length > $container.find($selector).length) {
                $('#loadmore_press').show();
            } else {
                $('#loadmore_press').hide();
            }
        });
    });
});

function sort(prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
}

if($('#showroom').length) {
    $.getJSON( "api/cars.json", function( data ) {
        quicksand(data);
    });
}