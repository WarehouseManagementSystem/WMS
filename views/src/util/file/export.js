let exportData = (dataUri, fileName, suffix) => {
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', formatFileName(fileName, suffix));

    linkElement.style.display = 'none';
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
}
let formatFileName = (exportFileName, suffix = null) => {
    let fileName = exportFileName || `data-${new Date().toLocaleString()}`
    return fileName.includes('.') && !suffix
        ? fileName
        : fileName + suffix

}

export default {
    exportData,
    formatFileName,
}