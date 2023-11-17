chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    hide(request);
});

function hide(request) {
    if (request.type === 'feed') {
        let m = document.querySelector('ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer')

        if (request.data) {
            m?.classList.add('hidden');
        } else {
            m?.classList.remove('hidden');
        }
    } else if (request.type === 'sidebar') {
        let m = document.querySelector('#related')
        if (request.data) {
            m?.classList.add('hidden');
        } else {
            m?.classList.remove('hidden');
        }
    } else if (request.type === 'shorts') {
        let m = document.querySelector(`[aria-label="Shorts"]`)
        if (request.data) {
            m?.classList.add('hidden');
        } else {
            m?.classList.remove('hidden');
        }
    } else if (request.type === 'comments') {
        let m = document.querySelector(`#comments`)
        if (request.data) {
            m?.classList.add('hidden');
        } else {
            m?.classList.remove('hidden');
        }
    }
}
function getData(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function (result) {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                resolve(result[key]);
            }
        });
    });
}
function handleMutations(mutations) {
    mutations.forEach(async (mutation) => {
        if (mutation?.target?.id === 'contents') {
            const retrievedValue = await getData('feed');
            hide({ "type": "feed", data: retrievedValue })
        }
        else if (mutation?.target?.ariaLabel == 'Shorts') {
            const retrievedValue = await getData('shorts');
            hide({ "type": "shorts", data: retrievedValue })
        } else if (mutation?.target?.parentElement?.id === 'related') {
            const retrievedValue = await getData('sidebar');
            hide({ "type": "sidebar", data: retrievedValue })
        } else if (mutation?.target?.id === 'comments') {
            const retrievedValue = await getData('comments');
            hide({ "type": "comments", data: retrievedValue })
        }
    });
}

const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true,
};

const observer = new MutationObserver(handleMutations);

observer.observe(document, observerOptions);



