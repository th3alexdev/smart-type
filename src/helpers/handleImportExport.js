import Manager from "../classes/ShortcutsManager";
import { Shortcut } from "../classes/Shortcut";
import notify from "../utils/notify";

export function handleImportExport(cta, allShortcuts, setAllShortcuts) {
    if (cta === 'Import') {
        // Create an input element of type "file"
        const fileInput = document.createElement("input"); 
        fileInput.type = "file";

        // Specify that the file input should only accept JSON files
        fileInput.accept = ".json";

        // Add an event listener to handle the file change event
        fileInput.addEventListener("change", handleFileChange);

        // Simulate a click on the file input element to open the file selection dialog
        fileInput.click();

    } else if (cta === 'Export') {
        // console.log(allShortcuts)
        // Convert the "allShortcuts" array to a JSON string with 2-space indentation
        const json = JSON.stringify(
            allShortcuts.map(shortcut => ({
            ...shortcut,
            regex: shortcut.regex.toString()  // Convert the regex to a string
            })),
            null,
            2
        );
        

        // Create a Blob object representing the JSON data, with the MIME type "application/json"
        const blob = new Blob([json], { type: "application/json" });

        // Create a unique URL for the Blob object using the createObjectURL method
        const url = URL.createObjectURL(blob);

        // Create a new <a> element and set its "href" attribute to the generated URL
        const link = document.createElement("a");
        link.href = url;

        // Set the "download" attribute to specify the filename for the downloaded file
        link.download = "smart-type_shortcuts.json";

        // Simulate a click on the link element to trigger the download
        link.click();
    }
}

const handleFileChange = (e) => {
    // Get the selected file by the user
    const file = e.target.files[0];

    // Create a FileReader object to read the file content
    const reader = new FileReader();

    // Get the content of the file read by FileReader
    reader.onload = (event) => {
    const content = event.target.result;

    // Parse the JSON content into a JavaScript object
    try {
        const shortcutsData = JSON.parse(content);

        // Convert the imported shortcuts into instances of the Shortcut class
        const shortcuts = shortcutsData.map((shortcutData) => {
        const { regex, ...otherData } = shortcutData;

        // Convert the regex string into a RegExp object, if it exists
        const regexObj = regex ? new RegExp(regex) : undefined;

        // Create a new instance of the Shortcut class
        return new Shortcut({ ...otherData, regex: regexObj });
        });

        console.log(shortcuts)

        Manager.importShortcuts(shortcuts);
        // setAllShortcuts(Manager.getAllShortcuts)


        notify("Shortcuts imported successfully", "📥")

    } catch (error) {
        console.error("Error al importar los shortcuts:", error);
    }

    };

    // Read the file content as text using FileReader
    reader.readAsText(file);
};
