export default {
  formatFileSize: (fileSize) => {
    let size = [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ]
    let e = size.find((e, index) => fileSize < Math.pow(1024, index + 1))
    return e
      ? (fileSize / Math.pow(1024, size.indexOf(e))).toFixed(1) + e
      : (fileSize / Math.pow(1024, size.length - 1)).toFixed(1) + size[size.length - 1]
  },
}
