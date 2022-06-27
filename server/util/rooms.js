const rooms = {};

const createRoom = (roomId, player1Id, game) => {
    rooms[roomId] = []
    rooms[roomId][0] = player1Id
    rooms[roomId][1] = ""
    rooms[roomId][2] = game
}

const joinRoom = (roomId, player2Id) => {
    rooms[roomId][1] = player2Id;
}

const exitRoom = (roomId, player) => {
    if(player === 1){
        delete rooms[roomId];
    } else {
        rooms[roomId][1] = "";
    }
}

module.exports = {rooms, createRoom, joinRoom, exitRoom};