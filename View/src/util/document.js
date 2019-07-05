
function getSelection () {
    return document.selection
        ? document.selection.createRange().text // ie
        : document.getSelection().toString()
}
function setSelection (editor, value) {
    if (!editor || !value) return;
    editor.focus();
    let range = document.selection ? document.selection.createRange() : null
    if (range && range.parentElement() == editor) {
        range.text = value;
        range.select();
        range = null;
    } else if (document.selection) {
        document.selection.createRange().text = value;
    }
}
function setCursorPos(el, start = 0, end = el.value.length) {
    if (el.createRange) {
        var rng = el.value.createTextRange()
        rng.moveStart('character', start)
        rng.moveEnd('character', end)
        rng.collapse(true)
        rng.select()
    } else if (el.setSelectionRange) {
        el.focus()
        el.setSelectionRange(start, end)
    }
}

export default {
    getSelection,
    setSelection,
    setCursorPos,
}