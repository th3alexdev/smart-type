export const keyHandler = (e: KeyboardEvent ): void => {

    if(e.keyCode === 13) {
      e.preventDefault();
      document.execCommand("insertLineBreak", false, "");
    } else if(e.keyCode === 9) {
      e.preventDefault();
      document.execCommand("insertText", false, "\t");
    }
}

export const pasteHandler = ( e: ClipboardEvent ): void => {
    e.preventDefault();

    const text = e.clipboardData?.getData("text/plain") ?? "";
    const processedText = text.replace(/\t/g, "&emsp;");

    document.execCommand("insertHTML", false, processedText);
    
}