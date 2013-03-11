console.log('content');
chrome.extension.onMessage.addListener(function(message, sender, resCallback){
    console.log(message);
    if (message.act == 'fetchPageSize') {
        console.log('fetchPageSize');
        var pageSize = {
            scrollHeight: document.body.scrollHeight,
            scrollWidth: document.body.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight
        };
        resCallback(pageSize);
    } else if (message.act = 'scrollPage') {
        window.scrollBy(message.x, message.y);
        var pageSize = {};
        resCallback(pageSize);
    }
});
