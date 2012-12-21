var io = require('socket.io');
var express = require('express');

var app = express()
    , server = require('http').createServer(app)
    , io = io.listen(server);

server.listen(8232);

var ClientManager = function(){
    var clients = {};
    this.addClient = function (socket) {
        console.log('addClient');
        console.log(socket.id);
        return function () {
            clients['' + socket.id + ''] = socket;
        }();
    };

    this.removeClient = function (socket) {
        return function () {
            console.log('socket.id : ' + socket.id);
            delete clients['' + socket.id + ''];
        }();
    }

    this.getClientById = function (id) {
        return function () {
            return clients[id];
        }();
    };
    this.printClient = function () {
        return function(){
            console.log(clients);
        }();
    };
    this.getLength = function () {
        return function () {
            var length = 0;
            for (var i in clients) {
                length++;
            }
            return length;
        }();
    };
    return this;
};

var cm = new ClientManager();

var STATUS = {
    SUCCESS: 200,
    CLIENT_ERROR: 400,
    SERVER_ERROR: 500
};

function findClientById() {
    for (var i = 0, len = clients.length; i < len; i++) {
        console.log(clients[i].id);
    }
}

io.sockets.on('connection', function (socket) {
    cm.addClient(socket); 
    console.log(cm.getLength());
    socket.on('cmd', function (data) {
        console.log(data);
        var slave = cm.getClientById(data.slave);
        if (slave === undefined) {
            return;
        }
        console.log(slave);

        slave.emit('remote_cmd', {
            cmd: data.cmd,
            msg: [
                'your master ask you to' + data.cmd
            ]
        });
        socket.emit('cmd_res', {
            status: STATUS.SUCCESS,
            msg: [
                'success'
            ]
        });
    });

    socket.on('disconnect', function () {
        console.log('disconnect, left: ' + cm.getLength());
        cm.removeClient(this);
        console.log(cm.getLength());
    });
});
