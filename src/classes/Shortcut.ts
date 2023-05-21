export default class Shortcut {
    private name: string;
    private shortcut: string;
    private description: string;
    private expansion: string;
    private dateCreated: Date;
    private lastUsedDate: undefined | number;
    private timesUsed: number;

    constructor({
        name,
        shortcut = "/",
        description,
        expansion
    }: {
        name: string;
        shortcut?: string;
        description: string;
        expansion: string
    })  {

        if (!name) {
            throw new Error("Shorcut name is required");
        }

        this.name = name;
        this.shortcut = shortcut;
        this.description = description;
        this.expansion = expansion;
        this.dateCreated = new Date();
        this.lastUsedDate = undefined;
        this.timesUsed = 0;
    }

    expandShortcut( target: HTMLElement, command: string ): void {

        let shortcut = `${this.shortcut}${command}`

        let textInArray: RegExpMatchArray | null;
        let coincidence: boolean = false;
        
        let text = target.innerText;
        const expansion = this.expansion;

        if(!(target && text)) return
        
        // textInArray = text.match(/(\w+|[^\w\s]*\w+[^\w\s]*|\s+)/gi);
        
        textInArray = text.match(/(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/gi);
        
        if(textInArray !== null) {
            coincidence = textInArray.some(word => word.includes(shortcut));
        
        } else return

        // console.log(textInArray)

        if(coincidence) {
            let index = textInArray.indexOf( shortcut );
        
            textInArray[index] = expansion;  
            target.innerText = textInArray.join(" ");
        }
    }
}

