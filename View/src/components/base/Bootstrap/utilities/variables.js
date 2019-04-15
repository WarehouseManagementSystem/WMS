// base
const themes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const size = ['', 'lg', 'sm']
const set = { 'top', 'right', 'bottom', 'left'}
const position = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

// border
const borders = ['border', ...[set.map(e => `border-${e}`)]]
const border0 = borders.map(e => `${e}-0`)
const borderColor = themes.map(e => `border border-${e}` )
const borderRadius = ['rounded', 'rounded-circle', 'rounded-pill', 'rounded-0', ...[set.map(e => `rounded-${e}`)]]
const borderRadiusSize = size.map(e => `rounded-${e}`)

// button
const btnTarget = ['button', 'a', 'input']
const btnType = ['button', 'submit', 'reset']


export default {
    themes,
    position,
    size,
    set,
    border0,
    borderColor,
    borderRadius,
    borderRadiusSize,
    btnTarget,
    btnType,
}