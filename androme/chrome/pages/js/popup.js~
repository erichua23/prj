// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20",
    true);
req.onload = showPhotos;
req.send(null);

function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
*/


console.log('popup.js');
var fcState = false; // false表示未连接, true表示连接
function activeFc() {
    var iconPath = '';
    if (!fcState) {
        iconPath = 'images/icon2.png';
        fcState = true;
        console.log('active');
        connect();
    } else {
        iconPath = 'images/icon1.png';
        fcState = false;
        console.log('deactive');

        disconnect();
    }
    chrome.browserAction.setIcon({
        path: iconPath
    });
}

function connect() {
    var socket = io.connect('http://localhost:8000'); // TIP: .connect with no args does auto-discovery
    socket.on('connect', function (id) { // TIP: you can avoid listening on `connect` and listen on events directly too!
        console.log(socket);
        console.log(socket.socket.sessionid);
        $('#qrcode').qrcode(socket.socket.sessionid);
        $('#sessionId').html(socket.socket.sessionid);
    });

    socket.on('cmd', function (cmd) {
        console.log('recieve a cmd');
        //log();
        //chrome.tabs.executeScript(null, {code:"window.scrollBy(0, 100)"});
        
        chrome.tabs.getSelected(null, function(tab) {
            if (cmd.cmd === 'up') {
                window.scrollBy(0, cmd.moveBy);
            } else if (cmd.cmd === 'down') {
                window.scrollBy(0, cmd.moveBy);
            }
            //chrome.tabs.update(tab.id, {url: 'http://baidu.com'});
        });
    });
}

function disconnect() {

}

activeFc();
