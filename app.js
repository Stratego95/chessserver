const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 5001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id)
    socket.on("sendChessPositionToServer", (board, position) => {
        io.emit("sendChessPositionToClient", board, position);
    })

    socket.on("sendCapturedPiecesToServer", (board, capturedPieces, color) => {
        io.emit("sendCapturedPiecesToClient", board, capturedPieces, color);
    })

    socket.on("sendPieceSelectedToServer", (piece, board) => {
        io.emit("sendPieceSelectedToClient", piece, board);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));