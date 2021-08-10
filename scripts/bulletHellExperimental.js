const patterns = require("bulletHellPatterns")
module.exports = {
    ai: prov(() => {
        let e = extend(AIController, {
            init(){
                print("AI Initialized")
                this.data = {
                    state: 0,
                    specialCooldown: 1200,
                }
            },
            teleport(){
                let ang = Mathf.range(360);
                let x = (Angles.trnsx(ang, 64) + Vars.player.x) - this.unit.x
                let y = (Angles.trnsy(ang, 64) + Vars.player.y) - this.unit.y
                this.unit.move(x, y)
            },
            updateUnit(){
                this.unit.lookAt(Vars.player.x, Vars.player.y)
                this.data.specialCooldown -= Time.delta
                // behold, my shit.
                switch(this.data.state){
                    case 0:
                        this.teleport()
                        this.data.state = 1
                        break;
                    case 1:
                        this.data.state = 2

                        let patternSeq = patterns.normal
                        let special = this.data.specialCooldown < 0 ? Mathf.randomBoolean : false
                        if(special){
                            print("Special attack!")
                            patternSeq = patterns.special
                            this.data.specialCooldown = 1200
                        }
                        let pattern = patternSeq.random()
                        pattern.attack(this.unit)
                        // 1 second of cooldown between attacks
                        Time.run(pattern.duration + 60, () => {
                            this.data.state = 0
                        })
                        break;
                    case 2:
                        //idle
                }
            },
        })
        return e;
    }),
}