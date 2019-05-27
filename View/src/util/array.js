function push(array, item) { 
    if (!array.includes(item))
        array.push(item)
}
function splice(array, item, start = 1) { 
    if (array.includes(item))
        array.splice(array.indexOf(item), start);
}
export default {
    push,
    splice,
}