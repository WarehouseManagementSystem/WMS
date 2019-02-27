import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import './scss/custom.scss'

// use Popovers
$(function () {
    $('[data-toggle="popover"]').popover()
})

$('[data-toggle="popover"]').each(function (i, obj) {
    $(this).popover({
        html: true,
        content: function () {
            var id = $(this).attr('id')
            return $('#popover-content-' + id).html();
        }
    });
});
