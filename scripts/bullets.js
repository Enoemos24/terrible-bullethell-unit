const etherealLance = extend(BasicBulletType, {
    damage: 200,
    speed:16,
    lifetime:40,

    draw(b){
        Drawf.tri(b.x,b.y,10,30,b.rotation())
        Drawf.tri(b.x,b.y,10,10,b.rotation()-180)
    }
})

const astralBarrier = extend(ContinuousLaserBulletType, {
    damage: 1200,
    lifetime: 600,
    width: 16,
    length: 1600,

    draw(b){
        Lines.stroke((15 + (2 * Mathf.sin(Time.time*2))) * b.fout(Interp.pow10Out))
        Lines.lineAngle(b.x,b.y,b.rotation(),1600)
    }
})

const ancientNeedle = extend(BasicBulletType, {
    damage: 50,
    speed:3,
    lifetime:300,
    width: 5,
    height: 5,

    draw(b){
        Fill.square(b.x, b.y, 5, b.rotation()+45 + Time.time)
    }
})

module.exports = {
    etherealLance: etherealLance,
    ancientNeedle: ancientNeedle,
    astralBarrier: astralBarrier,
}