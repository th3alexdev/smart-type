chrome.action.onClicked.addListener(() => {
    // chrome.tabs.create({ url: "chrome-extension://cckjhkecnolheihcboimfcnmfdoimgim/index.html"  });

    chrome.tabs.create({ url: "http://localhost:5173/" })
});