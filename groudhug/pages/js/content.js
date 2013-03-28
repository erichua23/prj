console.log('content.js');
function log() {
    console.log('window', window);
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    // console.log(sender.tab ?  "from a content script:" + sender.tab.url : "from the extension");

    // 添加完成以后, 后台通知content, 运行这里反馈添加结果给用户
    if (request.greeting == "hello") {
        sendResponse({
            farewell: "goodbye"
        });
        alert('添加成功');
    } else {
        sendResponse({}); // snub them.
    }
}
);

