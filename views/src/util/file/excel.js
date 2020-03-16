/**
 * Node读写Excel文件探究实践
 * https://aotu.io/notes/2016/04/07/node-excel/index.html
 * https://stackoverflow.com/questions/28892885/javascript-json-to-excel-file-download/52948276
 * api documentation for excel4node (v1.2.1):
 * https://npmdoc.github.io/node-npmdoc-excel4node/build/apidoc.html
 * github
 * https://github.com/natergj/excel4node
 */

import json from './json'
const xl = require('excel4node')

let createSheet = (data, sheetName = 'sheet1') => {

    if (data.length == 0) return null
    // setup workbook and sheet
    let wb = new xl.Workbook();
    let ws = wb.addWorksheet(sheetName);

    // row index
    let rowIndex = 1
    
    // Add a title row
    let keys = Object.keys(data[0])

    keys.forEach((e, index) => ws.cell(rowIndex, index).string(e))
    
    // add data from json
    for (let i = 0; i < data.length; i++) {
        for (let n = 0; n < keys.length; n++) {
            ws.cell(rowIndex + i + 1, n + 1).string(data[i][keys[n]])
        }
    }
    return wb
}
let reader = () => { }
let writer = (data, fileName) => {
    json.toJSON(data)
    createSheet(data).writeToBuffer().then(function (buffer) {
        // Do something with buffer
        let dataUri = 'data:text/xls;charset=utf-8,' + encodeURIComponent(buffer)
        exportFile.exportData(dataUri, fileName, '.xls')
    })
    
}
            
export default {
    createSheet,
    reader,
    writer,
}

// app.get('/excel', function (req, res) {

//     createSheet().then(file => {
//         file.write('ExcelFile.xlsx', res);
//     })

// });

// app.listen(3040, function () {
//     console.log('Excel app listening on port 3040');
// });