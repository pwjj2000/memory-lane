const connectedUsers = {};
const choices = {};
const moves = {
    "rock": "scissor",
    "paper": "rock",
    "scissor": "paper"
};

const initializeChoices = (roomId) => {
    choices[roomId] = []
    for (let i = 0; i < 4; i++) {
        choices[roomId][i] = ""
    }
}

const userConnected = (userId) => {
    connectedUsers[userId] = true;
}

const makeMove = (roomId, player, choice) => {
    if(choices[roomId]){
        choices[roomId][player - 1] = choice;
    }
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

module.exports = {connectedUsers, initializeChoices, userConnected, makeMove, zhaMakeMove, moves, choices};

//{choice1, choice2, player, attacker, lives, room}