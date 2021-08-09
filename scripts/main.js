
const bhAI = require("bulletHellExperimental")
const goob = extend(UnitType, "goober", {
    health: 240,
    speed: 1,
    hitSize: 5,
    drawCell: false,
    hovering: true,

    localizedName: "Goober",
});

goob.constructor = () => extend(UnitEntity, {})
goob.defaultController = bhAI.ai;