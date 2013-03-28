var onAddClick = function (info, tab) {
    console.log('onAddClick');

    var url = tab.url;
    var title = tab.title;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://lovps.23lab.com', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200){
            // console.log(xhr.responseText);
            
            // TODO 添加完成告诉页面, 页面展示结果给用户
            chrome.tabs.sendRequest(tab.id, {
                greeting: "hello"
            }, function(response) {
                // console.log(response.farewell);
            });
        }
    };
    xhr.send();
    console.log(url);
};
// Create a parent item and two children.
var add = chrome.contextMenus.create({
    "title": "Add to Groundhug",
    "onclick": onAddClick
});


