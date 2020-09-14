export function getWaitingStatusString(index) {
    switch (index) {
        case 1:
            return "Not active"
        case 2:
            return "Pending"
        case 3:
            return "Active"
        case 4:
            return "Removed"    
        default:
            return "Unknown";
    }
};

// const WaitingState = {
//     NONACTIVE: 1,
//     PENDING: 2,
//     ACTIVE: 3,
//     REMOVED: 4
// }