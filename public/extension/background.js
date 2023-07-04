// This listener is triggered when the extension button is clicked.
chrome.action.onClicked.addListener(() => {

    // Create a new tab with the specified URL.
    chrome.tabs.create({ url: "chrome-extension://lfhbffpcihffklieljkgngecbllpalhg/index.html" })
});

// This listener is triggered when a message is received from the content script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "current-tab") {
      // The content script has requested information about the current tab.
      // Send the tab information back to the content script.
      sendResponse({tab: sender.tab});
  }
});