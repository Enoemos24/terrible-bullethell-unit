const lanceMarker = new Effect(90, e => {
    Draw.alpha((e.fin(Interp.pow10Out) * e.fout(Interp.pow10Out)) * 0.8)
    Lines.stroke(2)
    Lines.lineAngle(e.x, e.y, e.rotation, 16 * 20)
    Lines.lineAngle(e.x, e.y, e.rotation-180, 16 * 20)
})

module.exports = {
    lanceMarker: lanceMarker
}