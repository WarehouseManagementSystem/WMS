import exportFile from './export'

// https://www.codevoila.com/post/30/export-json-data-to-downloadable-file-using-javascript
// https://blog.csdn.net/zqhphoenix/article/details/2971978

const toJSON = (json) => typeof json != 'object' ? JSON.parse(json) : json
const reader = () => { }
const writer = (data, fileName) => {
    toJSON(data)
    let dataStr = JSON.stringify(data);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    exportFile.exportData(dataUri, fileName, '.json')
}
            
export default {
    toJSON,
    reader,
    writer,
}