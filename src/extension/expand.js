let allShortcuts;
let command;

function expandShortcut(target, value, name, commandExpansion) {
    let shortcut = `/${name}`;
    let textInArray;
    let coincidence = false;
  
    let text = value;
    const expansion = commandExpansion;
  
    const regex = /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g
    textInArray = text.match(regex);
  
    if (textInArray !== null) {
      // Check if the shortcut exists in the input text
      coincidence = textInArray.some((word) => word.includes(shortcut));
    } else return;
  
    if (coincidence) {
      // Replace the shortcut with the expansion in the input text
      let index = textInArray.indexOf(shortcut);
      textInArray[index] = expansion;
      target.target.value = textInArray.join(" ");
    }
  }


function handleInputEvent(shortcuts) {
  // Add an input event listener to the document
  document.addEventListener('input', (e) => {
      shortcuts.forEach(shrt => {

        // Call expandShortcut function for each shortcut
        expandShortcut(e, e.target.value, shrt.name, shrt.expansion)
      })
  })
}

// Send message to background.js to get the current tab
chrome.runtime.sendMessage({ message: "current-tab" }, (response) => {
    currentTab = response.tab;

    if(!currentTab.url.startsWith(dashboardURL)) {
        // Retrieve shortcuts from chrome.storage
        chrome.storage.sync.get("shortcuts", (result) => {
            const shortcuts = result.shortcuts;
            allShortcuts = shortcuts;

            // Check if shortcuts were found in chrome.storage
            if (shortcuts) {
              console.log("Shortcuts encontrados en chrome.storage.sync:");
              handleInputEvent(shortcuts);
            } else {
              console.log("No se encontraron atajos en chrome.storage.sync.");
            }
        });
    }
})

