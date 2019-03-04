import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import './scss/custom.scss'

// use Popovers
$(function () {
    $('[data-toggle="popover"]').popover()
})

// $('[data-toggle="popover"]').each(function () {
//     $(this).popover({
//         html: true,
//         content: async function () {
//             var id = await $(this).attr('id')
//             return await $('#popover-content-' + id).html();
//         }
//     });
// });