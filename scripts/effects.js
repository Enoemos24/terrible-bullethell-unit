const lanceMarker = new Effect(90, e => {
    Draw.alpha((e.fin(Interp.pow10Out) * e.fout(Interp.pow10Out)) * 0.8)
    Lines.stroke(2)
    Lines.lineAngle(e.x, e.y, e.rotation, 16 * 20)
    Lines.lineAngle(e.x, e.y, e.rotation-180, 16 * 20)
})

const astralBarrier = new Effect(60, e => {
    for(let i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 10 * e.fout(Interp.pow10Out), 30, 90 * i + 90 * e.finpow())
    }
})

module.exports = {
    lanceMarker: lanceMarker,
    astralBarrier: astralBarrier
}