function expandShortcut({target, value, shrtSymbol, fullCommand}) {
    const shrtName = fullCommand.name;
    const shrtExpansion = fullCommand.expansion;
    const shrtRegex = fullCommand.regex;

    // Construct the shortcut string with the provided symbol and name
    let shortcut = `${shrtSymbol}${shrtName}`;

    let textInArray;
    let coincidence = false;
  
    let text = value;
  
    // Convert the shortcut regex string to a RegExp object
    const regex = convertStringToRegex(shrtRegex);
    textInArray = text.match(regex);
  
    if (textInArray !== null) {
      // Check if the shortcut exists in the input text
      coincidence = textInArray.some((word) => word.includes(shortcut));
    } else return;
  
    if (coincidence) {
      // Replace the shortcut with the expansion in the input text
      let index = textInArray.indexOf(shortcut);
      textInArray[index] = shrtExpansion;
      target.target.value = textInArray.join(" ");

      // Increment the timesUsed count and set lastUsedDate to current date
      fullCommand.timesUsed++;
      fullCommand.lastUsedDate = new Date;
      fullCommand.lastUsedDate = fullCommand.lastUsedDate.toISOString();

      const modifiedShortcuts = fullCommand;
      
      // Save the modified shortcuts to chrome.storage.sync
      chrome.storage.sync.set({ modifiedShortcuts })

      // console.log(fullCommand)
    }
}


function handleInputEvent(shortcuts, command) {
  // Add an input event listener to the document
  document.addEventListener('input', (e) => {
      shortcuts.forEach(shrt => {

        // Call expandShortcut function for each shortcut
        expandShortcut({ 
          target: e, 
          value: e.target.value, 
          shrtSymbol: command,
          fullCommand: shrt
        })
      })
  })
}

// Send message to background.js to get the current tab
chrome.runtime.sendMessage({ message: "current-tab" }, (response) => {
    currentTab = response.tab;

    if(!currentTab.url.startsWith(dashboardURL)) {
        // Retrieve shortcuts from chrome.storage
        chrome.storage.sync.get(["shortcuts","command"], (result) => {
            const shortcuts = result.shortcuts;
            const command = result.command;

            allShortcuts = shortcuts;

            // Check if shortcuts were found in chrome.storage
            if (shortcuts) {
              // console.log("Shortcuts encontrados en chrome.storage.sync:");
              handleInputEvent(shortcuts, command);
            } else {
              // console.log("No se encontraron atajos en chrome.storage.sync.");
            }
        });
    }
})


function convertStringToRegex(regex) {
  if (typeof regex === "string") {
    try {
      const regexString = regex;

      // Extracts the flags from the regex string using a regular expression
      const regexFlags = regexString.replace(/.*\/([gimy]*)$/, '$1');

      // Extracts the pattern from the regex string using a regular expression
      const regexPattern = regexString.replace(new RegExp(`^/(.*?)/${regexFlags}$`), '$1');

      // Creates a new RegExp object with the extracted pattern and flags
      regex = new RegExp(regexPattern, regexFlags);
      
      return regex;
      
    } catch (error) {
      console.error("Error converting string from regex to RegExp:", error);
    }
  }
}

