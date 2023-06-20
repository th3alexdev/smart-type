// Converts a regular expression object to its string
export function convertRegexToString(shortcutData: any): void {
  if (shortcutData.regex && shortcutData.regex instanceof RegExp) {
    shortcutData.regex = shortcutData.regex.toString();
  }
}

// Converts a string of a regular expression to a RegExp object
export function convertStringToRegex(shortcutData: any): void {
  if (shortcutData.regex && typeof shortcutData.regex === "string") {
    try {
      const regexString = shortcutData.regex;

      // Extracts the flags from the regex string using a regular expression
      const regexFlags = regexString.replace(/.*\/([gimy]*)$/, '$1');

      // Extracts the pattern from the regex string using a regular expression
      const regexPattern = regexString.replace(new RegExp(`^/(.*?)/${regexFlags}$`), '$1');

      // Creates a new RegExp object with the extracted pattern and flags
      shortcutData.regex = new RegExp(regexPattern, regexFlags);
      
      // console.log(shortcutData.regex)
    } catch (error) {
      console.error("Error converting string from regex to RegExp:", error);
    }
  }
}