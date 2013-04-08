var onAddClick = function (info, tab) {
    console.log('onAddClick');

    var url = tab.url;
    var title = tab.title;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://lovps.23lab.com:4567/links', false);

    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");

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

    var params = "link[own]=owner&link[url]=url&commit=Create Link";
    xhr.send(params);
    console.log(url);
};
// Create a parent item and two children.
var add = chrome.contextMenus.create({
    "title": "Add to Groundhug",
    "onclick": onAddClick
});


