// This listener is triggered when the extension button is clicked.
chrome.action.onClicked.addListener(() => {
  // Create a new tab with the specified URL.
  chrome.tabs.create({ url: "chrome-extension://lfhbffpcihffklieljkgngecbllpalhg/index.html" })
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === 'sendVariable' && request.action === 'sendCommand') {
  const currentTabUrl = sender.tab.url;
  // console.log(currentTabUrl)

  const shortcuts = request.data
  const command = request.command

  // console.log('shortcuts ', shortcuts);
  // console.log('commands ', command);
  // console.log('current url: ', currentTabUrl);

  // Check if the current tab URL starts with the dashboard URL
  if(!currentTabUrl.startsWith(dashboardURL)) {

    chrome.storage.sync.get(["shortcuts","command"], (result) => {
      const shortcuts = result.shortcuts;
      const command = result.command;

      // Check if shortcuts were found in chrome.storage
      if (shortcuts) {
        // console.log(shortcuts)
        handleInputEvent(shortcuts, command);
      }
  });
  }
}
});

chrome.storage.sync.get(['shortcuts', 'command'], function(result) {
  // Maneja los valores obtenidos
  const shortcuts = result.shortcuts;
  const command = result.command;

  // Realiza las acciones necesarias con los valores obtenidos
  console.log('Shortcuts:', shortcuts);
  console.log('Command:', command);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Comprueba la acción solicitada por el mensaje
  if (request.action === 'getShortcuts') {
    // Obtiene los datos de los atajos desde chrome.storage.sync
    chrome.storage.sync.get(['shortcuts', 'command'], function(result) {
      // Envia los datos de los atajos al script de contenido
      sendResponse({ shortcuts: result.shortcuts, command: result.command });
    });

    // Indica que se enviará una respuesta asincrónica
    return true;
  }
});