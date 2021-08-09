const gb = require("bullets")
const effects = require("effects")
const sfx = require("sfx")

const etherealLancer = (input) => {
    let ang = Mathf.range(360)
    let x = Angles.trnsx(ang, 180) + Vars.player.x
    let y = Angles.trnsy(ang, 180) + Vars.player.y
    effects.lanceMarker.at(Vars.player.x, Vars.player.y, ang)
    Time.run(2, () => {
        gb.etherealLance.create(input, input.team, x, y, ang-180)
    })
}

const ancientNeedler = (ent, team, x, y) => {
    let ang = 0;
    for(let i = 0; i < 45; i++){
        Time.run(i, () => {
            gb.ancientNeedle.create(ent, team, x, y, ang*16)
            gb.ancientNeedle.create(ent, team, x, y, ang*16 - 180)
            ang++
        })
    }
}

// duration: the length of the attack in frames
// attack: the code executed when the pattern is called
const normal = new Seq([
    {
        duration:20,
        attack(input){
            print("attack 1!")
            ancientNeedler(input, input.team, input.x, input.y)
        }
    },
    {
        duration:15*15,
        attack(input){
            print("attack 2!")
            let ang = 0
            let j = 0
            for(let i = 0; i < 20; i++){
                Time.run(i*20, () => {
                    etherealLancer(input)
                })
            }
        }
    }
])
const special = new Seq([
    {
        duration: 70,
        attack(input){
            let x = input.x
            let y = input.y
            print("astral barrier!")
            sfx.barrierflash.at(x,y)
            effects.astralBarrier.at(x,y)
            Time.run(80, () => {
                let an = Timer.schedule(() => {
                    ancientNeedler(input, input.team, x, y)
                }, 0, 1)
                Sounds.laserblast.at(x,y)
                for(let i = 0; i < 4; i++){
                    gb.astralBarrier.create(input, input.team, x, y, i*90)
                }
                Time.run(60 * 3, () => {
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