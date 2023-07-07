function expandShortcut({target, value, shrtSymbol, fullCommand, isInput, allShortcuts}) {
    const shrtName = fullCommand.name;
    const shrtExpansion = fullCommand.expansion;
    const shrtRegex = setRegex(shrtSymbol);

    // Construct the shortcut string with the provided symbol and name
    let shortcut = `${shrtSymbol}${shrtName}`;

    let textInArray;
    let coincidence = false;
  
    let text = value;
  
    // console.log(`name -> ${shrtName}`)
    // console.log(`expansion -> ${shrtExpansion}`)
    // console.log(`regex -> ${shrtRegex}`)
    // console.log(`shortcut -> ${shortcut}`)
    
    if (text !== undefined) {
      textInArray = text.match(shrtRegex);
      // console.log(textInArray)
      
      if (textInArray !== null) {
        // Check if the shortcut exists in the input text
        coincidence = textInArray.some((word) => word.includes(shortcut));
      }
    }

    // console.log(`isIn? -> ${coincidence}`)
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
      fullCommand.regex = shrtRegex.toString();

      const shortcuts = allShortcuts;

      // console.log(allShortcuts)
      
      // Save the modified shortcuts to chrome.storage.sync
      chrome.storage.sync.set({ shortcuts })

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
        isInput,
        allShortcuts: shortcuts
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

// Envía un mensaje al script de fondo solicitando los datos de los atajos
chrome.runtime.sendMessage({ action: 'getShortcuts' }, function(response) {
  // Maneja la respuesta del script de fondo con los datos de los atajos
  let shortcuts = response.shortcuts;
  const command = response.command;

  if (shortcuts && command){
    if(!Array.isArray(shortcuts)) {
      shortcuts = [shortcuts];
    }

    if (shortcuts.length > 0) {
      handleInputEvent(shortcuts, command);

      console.log("Shortcuts:");
      shortcuts.forEach((shortcut) => {
        console.log(` ${command}${shortcut.name}`);
      });
    }
  } else {
    console.error("No shortcuts found. Please add shortcuts or refresh the dashboard tab.");
  }
});

function setRegex(command) {
  let regex;
  
  const RegExp = {
      "/": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
      "//": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
      "-": /(\w+|[^\w\s]*\-\w+[^\w\s]*|[^\w\s]+|\s+)/g,
      "--": /(\w+|[^\w\s]*\--\w+[^\w\s]*|[^\w\s]+|\s+)/g,
      "#": /(\w+|[^\w\s]*\#\w+[^\w\s]*|[^\w\s]+|\s+)/g
  }

  regex = RegExp[command];

  return regex;
}
