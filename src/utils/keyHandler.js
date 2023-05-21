export const keyHandler = (e) => {
    // e.preventDefault();

    if(e.keyCode === 13) {
      document.execCommand("insertLineBreak", false, null);
    } else if(e.keyCode === 9) {
      document.execCommand("insertText", false, "\t");
    }


}

export const pasteHandler = (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    const processedText = text.replace(/\t/g, "&emsp;");

    document.execCommand("insertHTML", false, processedText);
    
}