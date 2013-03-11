// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var id = 100;

var Capturer = {
    canvas: document.createElement("canvas"),
    yPos: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    fetchPageSize: function (tabId){
        var self = this;
        chrome.tabs.sendMessage(tabId, {act: 'fetchPageSize'}, self.onResponseVisibleSize);
        // this.captureVisibleBlock();
    },
    scrollPage: function(tabId, x, y){
        var self = this;
        chrome.tabs.sendMessage(tabId, {act: 'scrollPage', x: x, y: y}, self.onScrollDone);
    },
    onScrollDone: function(resMsg) {
        console.log('onScrollDone', resMsg);
        setTimeout(function(){
            Capturer.captureVisibleBlock();
        }, 1000)
    },
    startCapture: function(){
        // scroll to top
        
        this.yPos = 0;
        this.scrollPage(this.tabId, 0, -1 * this.scrollHeight);
        // self.postImg();
    },
    onResponseVisibleSize: function (pageSize) {
        Capturer.scrollWidth = pageSize.scrollWidth;
        Capturer.scrollHeight = pageSize.scrollHeight;
        Capturer.clientWidth = pageSize.clientWidth;
        Capturer.clientHeight = pageSize.clientHeight;

        Capturer.canvas.width = pageSize.scrollWidth;
        Capturer.canvas.height = pageSize.scrollHeight;

        Capturer.startCapture();
    },
    captureVisibleBlock: function (w, h){
        var self = this;
        var width = w || self.clientWidth;
        var height = h || self.clientHeight;

        chrome.tabs.captureVisibleTab(null, function(img) {
            var blockImg = new Image();
            var canvas = self.canvas;

            if (Capturer.yPos + Capturer.clientHeight >= Capturer.scrollHeight) {
                blockImg.onload = function() {
                    var ctx = canvas.getContext("2d");
                    var y = Capturer.clientHeight - Capturer.scrollHeight % Capturer.clientHeight;
                    ctx.drawImage(blockImg, 0, 0, width, height, 0, self.yPos - y, width, height);
                    Capturer.postImg();
                };
            } else {
                blockImg.onload = function() {
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(blockImg, 0, 0, width, height, 0, Capturer.yPos, width, height);
                    Capturer.yPos += Capturer.clientHeight;
                    self.scrollPage(self.tabId, 0, Capturer.clientHeight);
                };
            }

            blockImg.src = img;
        });

    },
    scrollToNextBlock: function () {
        
    },
    postImg: function () {
        var canvas = Capturer.canvas;
        var screenshotUrl = canvas.toDataURL();
        var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++);
        chrome.tabs.create({url: viewTabUrl}, function(tab) {
            var targetId = tab.id;

            var addSnapshotImageToTab = function(tabId, changedProps) {
                // We are waiting for the tab we opened to finish loading.
                // Check that the the tab's id matches the tab we opened,
                // and that the tab is done loading.
                if (tabId != targetId || changedProps.status != "complete")
                    return;

                // Passing the above test means this is the event we were waiting for.
                // There is nothing we need to do for future onUpdated events, so we
                // use removeListner to stop geting called when onUpdated events fire.
                chrome.tabs.onUpdated.removeListener(addSnapshotImageToTab);

                // Look through all views to find the window which will display
                // the screenshot.  The url of the tab which will display the
                // screenshot includes a query parameter with a unique id, which
                // ensures that exactly one view will have the matching URL.
                var views = chrome.extension.getViews();
                for (var i = 0; i < views.length; i++) {
                    var view = views[i];
                    if (view.location.href == viewTabUrl) {
                        view.setScreenshotUrl(screenshotUrl);
                        break;
                    }
                }
            };
            chrome.tabs.onUpdated.addListener(addSnapshotImageToTab);
        });
    }
};
function takeScreenshot() {
    var tabId = chrome.tabs.getSelected(function(tab){
        Capturer.tabWin = window;
        Capturer.tabId = tab.id;
        Capturer.fetchPageSize(tab.id);
    });
}

// Listen for a click on the camera icon.  On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function(tab) {
    takeScreenshot();
});
