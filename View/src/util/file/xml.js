import json from './json'
import exportFile from './export'

/**
 * https://blog.csdn.net/zqhphoenix/article/details/2971978
 */

let toXML = (data) => {
    if (data.length == 0) return ''

    let xmlStr = ''
    let lineDelimiter = '\r\n'

    xmlStr += '<?xml version=/"1.0/" encoding=/"utf-8/"?>' + lineDelimiter

    // if (data.title) csvStr += data.title + '\r\n\n'

    let keys = Object.keys(data[0])

    data.forEach(item => {
        xmlStr += '<row>' + lineDelimiter
        keys.forEach((key) => {
            xmlStr += `\t<${key}>${item[key] || ''}</${key}>${lineDelimiter}`
        });
        xmlStr += '</row>' + lineDelimiter
    })

    return xmlStr
}

let reader = () => {
    
}
let writer = (data, fileName) => {
    json.toJSON(data)
    let csvStr = toXML(data)
    let dataUri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(csvStr)

    exportFile.exportData(dataUri, fileName, '.xml')
}

export default {
    toXML,
    writer,
    reader,
}