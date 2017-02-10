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

        if (options.filter) {

        }

        if (options.sortBy) {
            var items = $data.get();
            items.sort(function(a, b) {
                if (typeof(options.sortBy) === 'string') {
                    var sortBy = options.sortBy;
                    // attribute e.g. "[data-id]"
                    if (sortBy.match(/\[[^\]\t\n\f \/>"'=]+\]/)) {
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
                var valA = options.sortBy($(a)) || 0;
                var valB = options.sortBy($(b)) || 0;

                if ($.isNumeric(valA)) {
                    valA = Number(valA);
                }
                if ($.isNumeric(valB)) {
                    valB = Number(valB);
                }

                if (options.reverse) {
                    return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
                } else {
                    return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
                }
            });
            if (options.limit) {
                items = items.slice(options.start, options.start + options.limit);
            }
            $data = $(items);
        }

        return $data;
    };
})(jQuery);

var quicksand = (function(data) {
    var $filter = $('#filter'),
        sort = '#sort :selected',
        order = '#order :checked',
        $container = $('.filter-container'),
        $selector = '.filter-item',
        $filteredData;


    var $data = $container.clone(),
        $sortedData = $data.find($selector);

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

        if (!$('#show_sold').prop("checked")) {
            $filteredData = $filteredData.not('[data-sold]');
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
        });
    });
});

function sort(prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function(a, b) {
        var i = 0;
        while (i < len) {
            a = a[prop[i]];
            b = b[prop[i]];
            i++;
        }
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

if ($('#showroom').length) {
    quicksand();
    if (window.location.hash) {
        $('#filter').val(window.location.hash.substring(1)).trigger('change');
    }
}
