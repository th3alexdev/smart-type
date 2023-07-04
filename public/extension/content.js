let currentTab;
const dashboardURL = "chrome-extension://lfhbffpcihffklieljkgngecbllpalhg/index.html";

// Request the current tab information from the background script
chrome.runtime.sendMessage({ message: "current-tab" }, (response) => {
    currentTab = response.tab;

    // Check if the current tab URL starts with the dashboard URL
    if(currentTab.url.startsWith(dashboardURL)) {

      chrome.storage.sync.get("modifiedShortcuts", (result) => {
        let shortcuts = [];
        const modifiedShortcuts = result.modifiedShortcuts;
        if (modifiedShortcuts) {
          shortcuts.push(modifiedShortcuts);
          // Store the modified shortcuts in the localStorage
          localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      
          // Remove the modified shortcuts from chrome.storage
          chrome.storage.sync.remove("modifiedShortcuts", () => {
            // console.log("Modified shortcuts have been removed from chrome.storage");
          });
        }
      });

      
      // Retrieve the shortcuts data from local storage
      const shortcutsData = localStorage.getItem("shortcuts");
      if(shortcutsData) {
        // Parse the shortcuts data into an object
        let shortcuts = JSON.parse(shortcutsData);

        // Store the shortcuts object in chrome.storage
        chrome.storage.sync.set({ shortcuts }, () => {
          // console.log("Los datos de los atajos se han almacenado en chrome.storage");
        });
      }

      // Retrieve the command from local storage
      const command = localStorage.getItem("defaultCommand");
      if(command) {
        // Store the command in chrome.storage
        chrome.storage.sync.set({ command }, () => {
          // console.log("Los datos de los atajos se han almacenado en chrome.storage");
        });
      }


      // Add a click event listener to the document
      document.addEventListener("click", async (e) => {
        if (e.target.id === "addShortcut" || e.target.id === "saveShortcut") {
          
          // Retrieve the updated shortcuts data from local storage
          let shortcutsData = localStorage.getItem("shortcuts");
          
          if(shortcutsData) {
            // Parse the updated shortcuts data into an object
            const shortcuts = JSON.parse(shortcutsData);

            // Store the updated shortcuts object in chrome.storage
            chrome.storage.sync.set({ shortcuts }, () => {
              // console.log("Los datos de los atajos se han almacenado en chrome.storage");
            });
          }
        }
      });

      // console.log("✔️"); // Success message when inside the dashboard
    }
    // else {
    //   console.log("❌"); // Error message when outside the dashboard
    // }
});
