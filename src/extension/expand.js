function expandShortcut({target, value, shrtSymbol, fullCommand, isInput}) {
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
    if (text !== undefined) {
      textInArray = text.match(regex);
  
      if (textInArray !== null) {
        // Check if the shortcut exists in the input text
        coincidence = textInArray.some((word) => word.includes(shortcut));
      }
    }

    if (coincidence) {
      // Replace the shortcut with the expansion in the input text
      let index = textInArray.indexOf(shortcut);
      textInArray[index] = shrtExpansion;


      if(isInput) target.target.value = textInArray.join(" ");
      else target.target.innerHTML = textInArray.join(" ");

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
  // Define a function to expand the shortcut
  function expandShortcutForElement(target, value, isInput) {
    shortcuts.forEach((shrt) => {
      expandShortcut({
        target: { target }, // Wrap the target in an object to match the previous function signature
        shrtSymbol: command,
        fullCommand: shrt,
        value,
        isInput
      });
    });
  }

  // Add an input event listener to the document
  document.addEventListener('input', (e) => {
    expandShortcutForElement(e.target, e.target.value, true);
  })

  document.querySelectorAll('[contenteditable="true"]').forEach((element) => {
    element.addEventListener('input', (e) => {
      expandShortcutForElement(e.target, e.target.innerHTML, false);
    });
  });
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

