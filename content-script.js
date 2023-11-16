chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'feed') {
        chrome.storage.sync.set({ 'feed': request.data }, function () { });
        let m = document.querySelector('.style-scope.ytd-page-manager')
        if (request.data) {
            m.classList.add('hidden');
        } else {
            m.classList.remove('hidden');
        }
        console.log(m.classList);
    } else if (request.type === 'sidebar') {
        chrome.storage.sync.set({ 'sidebar': request.data }, function () { });
        let m = document.querySelector('#secondary')
        if (request.data) {
            m.classList.add('hidden');
        } else {
            m.classList.remove('hidden');
        }
    }else if (request.type === 'shorts') {
        chrome.storage.sync.set({ 'shorts': request.data }, function () { });
        let m = document.querySelector(`[aria-label="Shorts"]`)
        if (request.data) {
            m.classList.add('hidden');
        } else {
            m.classList.remove('hidden');
        }
    }
});

function handleMutations(mutations) {
    mutations.forEach((mutation) => {
        mutation?.previousSibling?.classList?.forEach((x) => {
            // console.log(mutation);
        })
    });
}

const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true,
};

const observer = new MutationObserver(handleMutations);

observer.observe(document, observerOptions);



