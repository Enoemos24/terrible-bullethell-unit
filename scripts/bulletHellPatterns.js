const gb = require("bullets")
const effects = require("effects")
const sfx = require("sfx")

const etherealLancer = (input) => {
    let ang = Mathf.range(360)
    let x = Angles.trnsx(ang, 180) + Vars.player.x
    let y = Angles.trnsy(ang, 180) + Vars.player.y
    effects.lanceMarker.at(Vars.player.x, Vars.player.y, ang)
    Time.run(15, () => {
        gb.etherealLance.create(input, input.team, x, y, ang-180)
    })
}

const ancientNeedleCircle = (ent, team, x, y, amount) => {
    let ang = 0
    for(let i = 0; i < amount; i++){
        Time.run(i, () => {
            sfx.pew1.at(x, y)
            for(let j = 0; j < 4; j++){
                gb.ancientNeedle.create(ent, team, x, y, ang * 48 + 90 * j)
            }
            for(let j = 0; j < 4; j++){
                gb.ancientNeedle.create(ent, team, x, y, -(ang * 48 + 90 * j))
            }
            ang++
        })
    }
}

const ancientNeedler = (ent, team, x, y, duration) => {
    let ang = 0;
    for(let i = 0; i < duration; i++){
        Time.run(i, () => {
            sfx.pew1.at(x, y)
            gb.ancientNeedle.create(ent, team, x, y, ang*16)
            gb.ancientNeedle.create(ent, team, x, y, ang*16 - 180)
        })
    }
}

// duration: the length of the attack in frames
// attack: the code executed when the pattern is called
const normal = new Seq([
    {
        duration:60*7,
        attack(input){
            print("attack 1!")
            ancientNeedler(input, input.team, input.x, input.y, 60*7)
        }
    },
    {
        duration:90,
        attack(input){
            print("attack 2!")
            ancientNeedleCircle(input, input.team, input.x, input.y, 90)
        }
    },
    {
        duration:90,
        attack(input){
            print("attack 3!")
            for(let i = 0; i < 90; i++){
                let j  = i
                let len = 16 + (256 * (i/90))
                Time.run(i, () => {
                    let x1 = input.x + Angles.trnsx(j * 16, len)
                    let y1 = input.y + Angles.trnsy(j * 16, len)
                    let x2 = input.x + Angles.trnsx(j * 16 -180, len)
                    let y2 = input.y + Angles.trnsy(j * 16 -180, len)
                    sfx.pew1.at(x1, y1)
                    sfx.pew1.at(x2, y2)
                    let ang1 = Angles.angle(x1,y1,Vars.player.x,Vars.player.y)
                    let ang2 = Angles.angle(x1,y2,Vars.player.x,Vars.player.y)
                    gb.ancientNeedle.create(input, input.team, x1, y1, ang1)
                    gb.ancientNeedle.create(input, input.team, x2, y2, ang2)
                })
            }
        }
    },
    {
        duration: 15,
        attack(input){
            print("attack 4!")
            for(let i = 0; i < 5; i++){
                Time.run(i, () => {
                    etherealLancer(input)
                })
            }
        }
    }
])
const special = new Seq([
    {
        duration: 120,
        //TODO: Somehow make the lasers and markers render when out of frame
        attack(input){
            print("astral cage!")
            let w = Vars.world.tiles.width*8
            let h = Vars.world.tiles.height*8
            sfx.barrierflash.at(input.x,input.y)
            effects.astralBarrier.at(input.x,input.y)
            Time.run(30, () => {
                Geometry.iterateLine(0,0,0,0,h,40,(x, y) => {
                    effects.astralMarker.at(x, y, 0, {x: w, y:y})
                    Time.run(30, () => {
                        effects.astralCage.at(x, y, 0, {x: w, y:y})
                        Sounds.laserblast.at(Vars.player.x,Vars.player.y)
                    });
                })
                Geometry.iterateLine(0,0,0,w,0,40,(x, y) => {
                    effects.astralMarker.at(x, y, 0, {x: x, y:h})
                    Time.run(90, () => {
                        effects.astralCage.at(x, y, 0, {x: x, y:h})
                        Sounds.laserblast.at(Vars.player.x,Vars.player.y)
                    });
                })
            });
        }
    },
    {
        duration: 250,
        attack(input){
            let x = input.x
            let y = input.y
            print("astral barrier!")
            sfx.barrierflash.at(x,y)
            effects.astralBarrier.at(x,y)
            Time.run(80, () => {
                let an = Timer.schedule(() => {
                    ancientNeedler(input, input.team, x, y, 45)
                }, 0, 1)
                Sounds.laserblast.at(x,y)
                for(let i = 0; i < 4; i++){
                    gb.astralBarrier.create(input, input.team, x, y, i*90)
                }
                Time.run(180, () => {
                    an.cancel()
                })
            });
        }
    }

])

module.exports = {
    normal: normal,
    special: special
}