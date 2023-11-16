chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request,"bg");
    if (request.type === 'feed') {
        chrome.storage.sync.set({ 'feed': request.data }, function () {

        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'feed', data: request.data });
        });
    }else if (request.type === 'sidebar') {
        chrome.storage.sync.set({ 'sidebar': request.data }, function () {

        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'sidebar', data: request.data });
        });
    } else  if (request.type === 'shorts') {
        chrome.storage.sync.set({ 'shorts': request.data }, function () {

        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'shorts', data: request.data });
        });
    }
});