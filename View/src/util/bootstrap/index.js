import jQuert from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import './scss/custom.scss'

// use Popovers
jQuert(function () {
    jQuert('[data-toggle="popover"]').popover()
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