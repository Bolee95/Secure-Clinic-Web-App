const AmmendType = {
    USER_INITED: "1",
    TEHNICAL: "2",
    MEDICAL: "3"
}
// TO-DO: Find better way to do this
function ammendStringForType(ammendType) {
    switch (ammendType) {
        case "1":
            return "User initiated"
        case "2":
            return "Tehnical"
        case "3":
            return "Medical"
        default:
            break;
    }
}

module.exports = {AmmendType, ammendStringForType};