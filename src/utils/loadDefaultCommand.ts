
// Sets the default shortcuts and saves them in local storage
export const setDefaultCommand = (command: string): void => { 
    localStorage.setItem("defaultCommand", command);
}

// Loads shortcuts from local storage
export const loadDefaultCommand = (): string => {
    const defaultCommand = localStorage.getItem("defaultCommand");
    return defaultCommand ? defaultCommand : "";
}
