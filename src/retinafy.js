
// https://www.html5rocks.com/en/tutorials/canvas/hidpi/
const retinafy = (canvas) => {

    let context = canvas.getContext('2d')

    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1

    const ratio = devicePixelRatio / backingStoreRatio

    if (devicePixelRatio !== backingStoreRatio) {
      canvas.style.width = `${canvas.width}px`
      canvas.style.height = `${canvas.height}px`

      canvas.width *= ratio
      canvas.height *= ratio

      context.scale(ratio, ratio)
    }

    return canvas
}

export default retinafy
