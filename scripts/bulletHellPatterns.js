const gb = require("bullets")
const effects = require("effects")

const etherealLancer = (input) => {
    let ang = Mathf.range(360)
    let x = Angles.trnsx(ang, 180) + Vars.player.x
    let y = Angles.trnsy(ang, 180) + Vars.player.y
    effects.lanceMarker.at(Vars.player.x, Vars.player.y, ang)
    Time.run(2, () => {
        gb.etherealLance.create(input, input.team, x, y, ang-180)
    })
}

// duration: the length of the attack in frames
// attack: the code executed when the pattern is called
const normal = new Seq([
    {
        duration:20,
        attack: (input) => {
            print("attack 1!")
            let ang = 0;
            for(let i = 0; i < 45; i++){
                Time.run(i, () => {
                    gb.ancientNeedle.create(input, input.team, input.x, input.y, ang*16)
                    gb.ancientNeedle.create(input, input.team, input.x, input.y, ang*16 - 180)
                    ang++
                })
            }
        }
    },
    {
        duration:15*15,
        attack: (input) => {
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
        duration: 60,
        attack: (input) => {
            let x = input.x
            let y = input.y
            let ana = normal.get(0)
            let an = Timer.schedule(() => {
                ana.attack(input)
            }, 0, 1)
            print("astral barrier!")
            Sounds.lasercharge.at(x,y)
            Time.run(80, () => {
                an.cancel()
                Sounds.laserblast.at(x,y)
                for(let i = 0; i < 4; i++){
                    gb.astralBarrier.create(input, input.team, x, y, i*90)
                }
            });
        }
    }

])

module.exports = {
    normal: normal,
    special: special
}