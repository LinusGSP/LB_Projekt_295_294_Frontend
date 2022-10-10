import colors from './colors'

function randomColor() {
    colors.sort()
    return colors[Math.floor(Math.random() * colors.length)]
}

export default randomColor;