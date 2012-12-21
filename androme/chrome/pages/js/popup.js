console.log('popup.js');
var fcState = false; // false表示未连接, true表示连接
var socket;
function activeFc() {
    var iconPath = '';
    
    socket = connect();
    if (socket) {
        iconPath = 'images/icon2.png';
        fcState = true;
    } else {
        iconPath = 'images/icon1.png';
        fcState = false;
    }
    chrome.browserAction.setIcon({
        path: iconPath
    });
}

function connect() {
    var socket = io.connect('http://199.83.92.201:8232'); // TIP: .connect with no args does auto-discovery
    socket.on('connect', function (id) { // TIP: you can avoid listening on `connect` and listen on events directly too!
        console.log(socket);
        console.log(socket.socket.sessionid);
        $('#qrcode').qrcode(socket.socket.sessionid);
        $('#sessionId').html(socket.socket.sessionid);
        socket.on('remote_cmd', function (cmd) {
            console.log('recieve a cmd');
            console.log(cmd);
            alert(cmd.cmd);
            
            chrome.tabs.getSelected(null, function(tab) {
                window.scrollBy(0, 100);
                //chrome.tabs.update(tab.id, {url: 'http://baidu.com'});
            });
        });

        socket.on('disconnect', function (){
            iconPath = 'images/icon1.png';
            fcState = false;
            chrome.browserAction.setIcon({
                path: iconPath
            });
        });
    });

}

activeFc();
