import json from './json'
import exportFile from './export'

let toTxt = (data) => {
    if (data.length == 0) return

    let txtStr = ''
    let columnDelimiter = '\t'
    let lineDelimiter = '\r\n'

    let keys = Object.keys(data[0])

    let txtColumnHeader = keys.join(columnDelimiter)
    txtStr = txtColumnHeader + lineDelimiter

    data.forEach(item => {
        keys.forEach((key, index) => {
            txtStr += item[key] || ''
            if (index < keys.length - 1) txtStr += columnDelimiter
        });
        txtStr += lineDelimiter
    })

    return txtStr
}
let reader = () => {}
let writer = (data, fileName) => {
    json.toJSON(data)
    let txtStr = toTxt(data)
    let dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtStr);
    // data:text/xls;charset=utf-8

    exportFile.exportData(dataUri, fileName, '.txt')
}
        
export default {
    toTxt,
    reader,
    writer,
}