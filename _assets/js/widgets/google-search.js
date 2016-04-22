var google_cse_key = '014812861817308790526:zsk1s3akajm';

// change search urls
function pushState(path) {
    if (typeof(window.history.pushState) == 'function') {
        window.history.pushState(null, path, path);
    } else {
        window.location.hash = '#!' + path;
    }
}

// jQuery $_GET plugin
(function($) {
	$.QueryString = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p = a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'))
})(jQuery);

if ($("#search_results").length > 0) {
    var pageTitle = document.title,
        searchURL = window.location.href.split('?')[0] + "?q=";

    $.ajax({
        url: 'https://www.google.com/jsapi',
        dataType: 'script',
        cache: true, // otherwise will get fresh copy every page load
        success: function() {
          google.load('search', '1', {
              language: 'en',
              nocss: true,
              callback: ''
          });
          google.setOnLoadCallback(function () {
              var searchControl = new google.search.CustomSearchControl(google_cse_key);
              searchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
              var options = new google.search.DrawOptions();
              options.setAutoComplete('true');
              searchControl.draw(document.getElementById("search_results"), options);
              searchControl.setSearchStartingCallback({}, function () {
                  var q = searchControl.getInputQuery();
                  pushState(searchURL + q);
                  document.title = q + ' ' + pageTitle;
              });
              searchControl.execute($.QueryString.q);
          }, true);
        }
    });
}