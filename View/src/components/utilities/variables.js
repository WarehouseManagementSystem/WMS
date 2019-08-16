/** base */

// themes
const themes = [ 'bright', 'dark' ]
// color
const baseColors = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white' ]
const colors = [ ...baseColors, 'transparent' ]
const textColor = [ ...baseColors, 'body', 'muted', 'black-50', 'white-50' ]
// size
const size = [ '', 'lg', 'sm' ]
// set
const setX = ['left', 'right', 'center' ]
const setY = [ 'up', 'down' ]
const set = [ ...setX, ...setY ]
// position
const positionST = [ 'top-left', 'top-right' ]
const positionSB = [ 'bottom-left', 'bottom-right' ]
const positionCT = [ 'top-center' ]
const positionCB = [ 'bottom-center' ]
const positionT = [ ...positionST, ...positionCT ]
const positionB = [ ...positionSB, ...positionCB ]
const positionS = [ ...positionST, ...positionSB ]
const positionC = [ ...positionCT, ...positionCB ]
const position = [ ...positionT, ...positionB ]
// border
const borders = ['border', ...[set.map(e => `border-${e}`)]]
const border0 = borders.map(e => `${e}-0`)
const borderColor = colors.map(e => `border-${e}` )
const borderRadius = ['rounded', 'rounded-circle', 'rounded-pill', 'rounded-0', ...[set.map(e => `rounded-${e}`)]]
const borderRadiusSize = size.map(e => `rounded-${e}`)
// justify
const justify = ['', 'start', 'center', 'end', 'between', 'around']

export default {
    base: {
        themes: themes,
        color: {
            bg: colors,
            text: textColor,
        },
        size: size,
        set: {
            default: set,
            x: setX,
            y: setY,
        },
        position: {
            default: position,
            sidetop: positionST,
            sidebotton: positionSB,
            centertop: positionCT,
            centerbottom: positionCB,
            top: positionT,
            bottom: positionB,
            side: positionS,
            center: positionC,
        },
        border: {
            set: borders,
            border0: border0,
            color: borderColor,
            radius: borderRadius,
            rediussize: borderRadiusSize,
        },
        justify: justify,
    },
}