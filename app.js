var app = require("./config/express")();

// socket.io
var http = require("http").Server(app);
var io = require("socket.io")(http);

// express tem essa função que 
app.set("io", io);

http.listen(3000, function() {
    console.log("servidor rodando");
});
