function addAttr (e, attr, value) {
    if (!e) return
    e[attr] = value
    e.attr = value
    e.attributes[attr] = value
    e.setAttribute && e.setAttribute(attr, value)
    e.createAttribute && e.createAttribute(attr, value)
}
function addAttrs (e, attrs) {
    if (!attrs) return
    for (const item of Object.entries(attrs)) {
        addAttr(e, item[0], item[1])
    }
}
function addElement(tagName, text, parentEl) {
    // create a new div element 
    // and give it some content 
    var newNode = document.createElement(tagName);
    var newContent = document.createTextNode(text);
    newNode.appendChild(newContent); //add the text node to the newly created div. 

    // add the newly created element and its content into the DOM 
    document.body.insertBefore(newNode, parentEl);
}

function addClass(e, classes) { 
    e.classList ? e.classList.add(classes) : e.className = ' ' + classes
}

function hasClass(e, className) {
    return e.classList ? e.classList.contains(className) : e.className.split(' ').includes(className)
 }

function removeClass(e, className) { 
    debugger
    className = className.trim()
    if (!hasClass(e, className)) return
    e.classList ? e.classList.remove(className) : e.className.split(' ').remove(className).join(' ')
}

export default {
    addAttr,
    addAttrs,
    addElement,
    addClass,
    hasClass,
    removeClass,
}