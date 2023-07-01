function expandShortcut({target, commandName, commandRegex, value, name, commandExpansion}) {
    let shortcut = `${commandName}${name}`;
    // console.log(shortcut)

    let textInArray;
    let coincidence = false;
  
    let text = value;
    const expansion = commandExpansion;
  
    const regex = convertStringToRegex(commandRegex);
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


function handleInputEvent(shortcuts, command) {
  // Add an input event listener to the document
  document.addEventListener('input', (e) => {
      shortcuts.forEach(shrt => {

        // Call expandShortcut function for each shortcut
        expandShortcut({ 
          target: e, 
          commandName: command,
          commandRegex: shrt.regex,
          value: e.target.value, 
          name: shrt.name,
          commandExpansion: shrt.expansion
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
              console.log("Shortcuts encontrados en chrome.storage.sync:");
              handleInputEvent(shortcuts, command);
            } else {
              console.log("No se encontraron atajos en chrome.storage.sync.");
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