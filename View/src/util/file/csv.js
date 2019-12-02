// http://jsfiddle.net/hybrid13i/JXrwM/
import json from './json'
import exportFile from './export'

let toCSV = (data) => {
    if (data.length == 0) return ''

    let csvStr = ''
    let columnDelimiter = ','
    let lineDelimiter = '\r\n'

    // if (data.title) csvStr += data.title + '\r\n\n'

    let keys = Object.keys(data[0])
    
    let csvColumnHeader = keys.join(columnDelimiter)
    csvStr = csvColumnHeader + lineDelimiter

    data.forEach(item => {
        keys.forEach((key, index) => {
            csvStr += item[key] || ''
            if (index < keys.length - 1) csvStr += columnDelimiter
        });
        csvStr += lineDelimiter
    })

    return csvStr
}

let reader = () => { }
let writer = (data, fileName) => {
    json.toJSON(data)
    let csvStr = toCSV(data)
    let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvStr)

    exportFile.exportData(dataUri, fileName, '.csv')
}
    
export default {
    toCSV,
    reader,
    writer,
    
}