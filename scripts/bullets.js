const etherealLance = extend(BasicBulletType, {
    damage: 200,
    speed:16,
    lifetime:40,

    init(b){
        if(!b)return
        b.data = {
            trail: new Trail(15)
        }
    },
    update(b){
        this.super$update(b)
        b.data.trail.update(b.x, b.y)
    },
    draw(b){
        Draw.color(Pal.lancerLaser)
        Fill.square(b.x,b.y,5,b.rotation()+45)
        b.data.trail.draw(Pal.lancerLaser, 4)
        Draw.color(Color.white)
        Fill.square(b.x,b.y,3,b.rotation()+45)
    }
})

const astralBarrier = extend(ContinuousLaserBulletType, {
    damage: 1200,
    lifetime: 600,
    width: 16,
    length: 1600,

    draw(b){
        Draw.color(Pal.lancerLaser)
        Lines.stroke((15 + (2 * Mathf.sin(Time.time*2))) * b.fout(Interp.pow10Out))
        Lines.lineAngle(b.x,b.y,b.rotation(),1600)
        Draw.color(Color.white)
        Lines.stroke((12 + (2 * Mathf.sin(Time.time*2))) * b.fout(Interp.pow10Out))
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
        Draw.color(Pal.lancerLaser)
        Fill.square(b.x,b.y,5,b.rotation() + Time.time * 4)
        Draw.color(Color.white)
        Fill.square(b.x,b.y,3,b.rotation() + Time.time * 4)
    }
})

module.exports = {
    etherealLance: etherealLance,
    ancientNeedle: ancientNeedle,
    astralBarrier: astralBarrier,
}