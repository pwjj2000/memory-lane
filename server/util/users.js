const connectedUsers = {};
const choices = {};


const initializeChoices = (roomId) => {
    choices[roomId] = []
    for (let i = 0; i < 4; i++) {
        choices[roomId][i] = ""
    }
}

const initializeChoicesAlt = (roomId) => {
    choices[roomId] = []
    for (let i = 0; i < 5; i++) {
        choices[roomId][i] = ""
    }
}

const userConnected = (userId) => {
    connectedUsers[userId] = true;
}

const zhaMakeMove = (choice1, choice2, player, room) => {
    if (choices[room]) {
        if (player === 1) {// Store Player 1 choices
            choices[room][0] = choice1
            choices[room][1] = choice2
        } else {// Store Player 2 choices
            choices[room][2] = choice1
            choices[room][3] = choice2
        }
    }
}

const thumbsMakeMove = (choice1, choice2, player, room, number) => {
    if (choices[room]) {
        if (number !== null) {
            choices[room][4] = number
        }
        if (player === 1) {// Store Player 1 choices
            choices[room][0] = choice1
            choices[room][1] = choice2
        } else {// Store Player 2 choices
            choices[room][2] = choice1
            choices[room][3] = choice2
        }
    }
}


module.exports = {connectedUsers, initializeChoices, initializeChoicesAlt, userConnected, zhaMakeMove, thumbsMakeMove, choices};