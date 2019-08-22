function addAttr (e, attr, value) {
    if (!e) return
    if (hasAttr(e, attr)) removeAttr(e, attr)
    e[attr] = value
    e.attr = value
    e.attributes[attr] = value
    e.setAttribute && e.setAttribute(attr, value)
    e.createAttribute && e.createAttribute(attr, value)
}
function hasAttr(e, attr) { 
    if (!e) return
    if (e.attributes) { 
        return e.hasAttribute && e.hasAttribute(attr)
    }
    return e.includes && e.includes(attr)
}
function removeAttr(e, attr) { 
    if (!e) return
    if (!hasAttr(e, attr)) return
    if (e.attributes) {
        e.removeAttribute && e.removeAttribute(attr)
        return
    }
    e.includes && e.splice(e.indexOf(attr), 1)
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

function hasClass(e, className) {
    return e.classList ? e.classList.contains(className) : e.className.split(' ').includes(className)
}

function addClass(e, className) { 
    className = className.trim()
    if (hasClass(e, className)) return
    e.classList ? e.classList.add(className) : e.className += ' ' + className
}

function removeClass(e, className) { 
    className = className.trim()
    if (!hasClass(e, className)) return
    e.classList ? e.classList.remove(className) : e.className = e.className.replace(className, "");
}

function getDOMCoordinate(e) { 
    return {
        x: (e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) + 'px',
        y: (e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) + 'px',
    }
}

export default {
    addAttr,
    hasAttr,
    removeAttr,
    addAttrs,
    addElement,
    hasClass,
    addClass,
    removeClass,
    getDOMCoordinate,
}