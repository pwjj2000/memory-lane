const express = require('express');
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require("cors");
require('dotenv').config()

app.use(cors());

const server = http.createServer(app);

const {createRoom, joinRoom, exitRoom, rooms} = require("./util/rooms");
const {connectedUsers, initializeChoices, userConnected, zhaMakeMove, choices, initializeChoicesAlt, thumbsMakeMove} = require("./util/users");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        //origin: "https://the-awesome-pwjj2000-site.netlify.app",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("create-room", (data) => {
        if (data.room === "") {
            const error = "Please enter a valid Room ID";
            socket.emit("display-error", error);
        } else if (rooms[data.room]) {
            const error = "This room already exists!";
            socket.emit("display-error", error);
        } else {
            userConnected(socket.client.id);
            createRoom(data.room, socket.client.id, data.game);
            socket.emit("room-created", data)
            socket.join(data.room)
        }
    })

    socket.on("join-room", (data) => {
        if (!rooms[data.room]) {
            const error = "This room doesn't exist";
            socket.emit("display-error", error);
        } else if (data.game !== rooms[data.room][2]) {
            const error = "This room is for a different game";
            socket.emit("display-error", error);
        } else {
            userConnected(socket.client.id);
            joinRoom(data.room, socket.client.id);
            socket.join(data.room)
            socket.emit("player-2-joined")
            io.to(data.room).emit("room-joined", data)
            initializeChoices(data.room)
        }
    })

    socket.on("zha-submit", ({choice1, choice2, player, attacker, lives1, lives2, room}) => {
        zhaMakeMove(choice1, choice2, player, room)
        if (choices[room][0] !== "" && choices[room][1] !== "" && choices[room][2] !== "" && choices[room][3] !== "") {
            let newLives1 = lives1
            let newLives2 = lives2
            let result1 = ""
            let result2 = ""
            let result3 = ""
            let result4 = ""
            if ((player === 1 && !attacker) || (player === 2 && attacker)) {// Player 2 attacking Player 1
                for (let i = 2; i < 4; i++) {
                    for (let j = 0; j < 2; j++) {
                        if (choices[room][i] === "DEAD" || choices[room][j] === "DEAD") {
                            //Do Nothing
                        } else if (choices[room][i] === choices[room][j]) {// Players' choice draw
                            const message = "Player 2 (" + choices[room][i] + ") attacks Player 1 (" + choices[room][j] + "). Nothing Happens."
                            if (result1 === "") {
                                result1 = message
                            } else if (result2 === ""){
                                result2 = message
                            } else if (result3 === ""){
                                result3 = message
                            } else {
                                result4 = message
                            }
                        } else if ((choices[room][i] === "Plane" && choices[room][j] === "Human") ||
                            (choices[room][i] === "Human" && choices[room][j] === "Bomb") ||
                            (choices[room][i] === "Bomb" && choices[room][j] === "Plane")) { // Player 2 choice > Player 1 choice
                            newLives1--
                            const message = "Player 2 (" + choices[room][i] + ") attacks Player 1 (" + choices[room][j] + "). Player 2 loses a life."
                            choices[room][j] = "DEAD"
                            if (result1 === "") {
                                result1 = message
                                break
                            } else if (result2 === ""){
                                result2 = message
                                break
                            } else if (result3 === ""){
                                result3 = message
                                break
                            } else {
                                result4 = message
                                break
                            }
                        } else { // Player 2 choice < Player 1 choice
                            const message = "Player 2 (" + choices[room][i] + ") attacks Player 1 (" + choices[room][j] + ").Nothing Happens."
                            if (result1 === "") {
                                result1 = message
                            } else if (result2 === ""){
                                result2 = message
                            } else if (result3 === ""){
                                result3 = message
                            } else {
                                result4 = message
                            }
                        }   
                    }
                } 
            } 
            if ((player === 2 && !attacker) || (player === 1 && attacker)) { // Player 1 attacking Player 2
                for (let i = 0; i < 2; i++) {
                    for (let j = 2; j < 4; j++) {
                        if (choices[room][i] === "DEAD" || choices[room][j] === "DEAD") {
                            //Do Nothing
                            continue
                        } else if (choices[room][i] === choices[room][j]) {// Players' choice draw
                            const message = "Player 1 (" + choices[room][i] + ") attacks Player 2 (" + choices[room][j] + "). Nothing Happens."
                            if (result1 === "") {
                                result1 = message
                            } else if (result2 === ""){
                                result2 = message
                            } else if (result3 === ""){
                                result3 = message
                            } else {
                                result4 = message
                            }
                        } else if ((choices[room][i] === "Plane" && choices[room][j] === "Human") ||
                            (choices[room][i] === "Human" && choices[room][j] === "Bomb") ||
                            (choices[room][i] === "Bomb" && choices[room][j] === "Plane")) { // Player 1 choice > Player 2 choice
                            newLives2--
                            const message = "Player 1 (" + choices[room][i] + ") attacks Player 2 (" + choices[room][j] + "). Player 2 loses a life."
                            choices[room][j] = "DEAD"
                            if (result1 === "") {
                                result1 = message
                                break
                            } else if (result2 === ""){
                                result2 = message
                                break
                            } else if (result3 === ""){
                                result3 = message
                                break
                            } else {
                                result4 = message
                                break
                            }
                        } else { // Player 1 choice < Player 2 choice
                            const message = "Player 1 (" + choices[room][i] + ") attacks Player 2 (" + choices[room][j] + "). Nothing Happens."
                            if (result1 === "") {
                                result1 = message
                            } else if (result2 === ""){
                                result2 = message
                            } else if (result3 === ""){
                                result3 = message
                            } else {
                                result4 = message
                            }
                        }   
                    }
                } 
            }

            
            // if (attacker) {
            //     socket.broadcast.to(room).emit("change-lives", {newLives})
            //     socket.emit("zha-end-turn", {result1, result2, result3, result4})
            //     socket.broadcast.to(room).emit("zha-end-turn", {result1, result2, result3, result4})
            // } else {
            //     socket.emit("change-lives", {newLives})
            //     socket.emit("zha-end-turn", {result1, result2, result3, result4})
            //     socket.broadcast.to(room).emit("zha-end-turn", {result1, result2, result3, result4})
            // }
            const p1c1 = choices[room][0]
            const p1c2 = choices[room][1]
            const p2c1 = choices[room][2]
            const p2c2 = choices[room][3]
            io.to(room).emit("zha-end-turn", {result1, result2, result3, result4, p1c1, p1c2, p2c1, p2c2, newLives1, newLives2})
            io.to(room).emit("reset-choices")
            
           
            if (newLives1 === 0) {
                const player = 1
                console.log("P1 loses")
                io.to(room).emit("zha-end", {player})
            } 
            if (newLives2 === 0) {
                const player = 2
                console.log("P2 loses")
                io.to(room).emit("zha-end", {player})
            }
            initializeChoices(room)

        }

    })

    socket.on("join-random", (data) => {
        let roomID = ""
        
        for (let id in rooms) {
            if (rooms[id][1] === "" && data.game === rooms[id][2] ){
                roomID = id;
                break;
            }
        }

        if (roomID === "" || roomID === undefined) {
            const error = "All rooms are full or none exists";
            socket.emit("display-error", error);
        } else {
            userConnected(socket.client.id);
            joinRoom(roomID, socket.client.id);
            socket.join(roomID);
            socket.emit("player-2-joined")
            io.to(roomID).emit("room-joined", {room: roomID});
            initializeChoices(roomID);
        }
    })

    socket.on("disconnect", () => {
        if (connectedUsers[socket.client.id]) {
            let player;
            let roomId;

            for (let id in rooms) {
                if (rooms[id][0] === socket.client.id || rooms[id][1] === socket.client.id) {
                    if (rooms[id][0] === socket.client.id) {
                        player = 1;
                    } else {
                        player = 2;
                    }

                    roomId = id;
                    break;
                }
            }

            exitRoom(roomId, player);

            if(player === 1){
                io.to(roomId).emit("player-1-disconnected");
            }else{
                io.to(roomId).emit("player-2-disconnected");
            }
        }
    })

    socket.on("cs-submit", (data) => {
        console.log(data)
        const L1 = data.L1
        const R1 = data.R1
        const L2 = data.L2
        const R2 = data.R2
        const player = data.player
        io.to(data.room).emit("cs-receive", {L1, R1, L2, R2, player})
        if ((data.L1 === 0 && data.R1 === 0) || (data.L2 === 0 && data.R2 === 0)) {
            io.to(data.room).emit("cs-end", {player})
        }   
    })

    socket.on("thumbs-submit", ({choice1, choice2, player, attacker, lives1, lives2, room, yourNumber}) => {
        thumbsMakeMove(choice1, choice2, player, room, yourNumber)
        if (choices[room][0] !== "" && choices[room][1] !== "" && choices[room][2] !== "" && choices[room][3] !== "" && choices[room][4] !== "") {
            let thumbsRaised = 0
            let log = ""
            const p1c1 = choices[room][0]
            const p1c2 = choices[room][1]
            const p2c1 = choices[room][2]
            const p2c2 = choices[room][3]
            const num = choices[room][4]
            for (let i = 0; i < 4; i++) {
                if (choices[room][i] === "Raise") {
                    thumbsRaised++
                }
            }
            console.log(thumbsRaised)
            console.log(num)

            if (thumbsRaised !== num) {
                log = "Number called does not match thumbs raised. Nothing happened."
                const newLives1 = lives1
                const newLives2 = lives2
                io.to(room).emit("thumbs-end-turn", {p1c1, p1c2, p2c1, p2c2, newLives1, newLives2, num, thumbsRaised, log})
                io.to(room).emit("reset")
                initializeChoicesAlt(room)
            } else {
                if ((player === 1 && attacker) || (player === 2 && !attacker)) {
                    const newLives1 = lives1 - 1
                    const newLives2 = lives2
                    log = "Player 1 guessed the number of thumbs raised correctly!"
                    io.to(room).emit("thumbs-end-turn", {p1c1, p1c2, p2c1, p2c2, newLives1, newLives2, num, thumbsRaised, log})
                    io.to(room).emit("reset")
                    initializeChoicesAlt(room)
                    if (newLives1 === 0) {
                        const winner = 1
                        io.to(room).emit("thumbs-end", {winner})
                    }
                } else {
                    const newLives2 = lives2 - 1
                    const newLives1 = lives1
                    log = "Player 2 guessed the number of thumbs raised correctly!"
                    io.to(room).emit("thumbs-end-turn", {p1c1, p1c2, p2c1, p2c2, newLives1, newLives2, num, thumbsRaised, log})
                    io.to(room).emit("reset")
                    initializeChoicesAlt(room)
                    if (newLives2 === 0) {
                        const winner = 2
                        io.to(room).emit("thumbs-end", {winner})
                    }
                }
            }
            

        }
    })
    
})

server.listen(process.env.PORT || 3001, () => {
    console.log("Server started on port 3001...")
})