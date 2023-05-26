export class Shortcut {
    private name: string;
    private shortcut: string;
    private description: string;
    private expansion: string;
    private dateCreated: Date;
    private lastUsedDate: undefined | Date;
    private timesUsed: number;
    private regex: RegExp

    constructor({
        name,
        shortcut = "/",
        description,
        expansion,
        regex = /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g
    }: {
        name: string;
        shortcut?: string;
        description: string;
        expansion: string;
        regex?: RegExp
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
        this.regex = regex
    }

    expandShortcut( target: HTMLElement, command: string ): void {

        let shortcut = `${this.shortcut}${command}`

        console.log(`${this.shortcut} -> ${command}`)
        
        let textInArray: RegExpMatchArray | null;
        let coincidence: boolean = false;
        
        let text = target.innerText;
        const expansion = this.expansion;

        if(!(target && text)) return
        
        // textInArray = text.match(/(\w+|[^\w\s]*\w+[^\w\s]*|\s+)/gi);
        
        textInArray = text.match(this.regex);
        
        if(textInArray !== null) {
            coincidence = textInArray.some(word => word.includes(shortcut));
        
        } else return

        // console.log(textInArray)

        if(coincidence) {
            let index = textInArray.indexOf( shortcut );
        
            textInArray[index] = expansion;  
            target.innerText = textInArray.join(" ");

            this.timesUsed++;
            this.lastUsedDate = new Date;
            // console.log(this.lastUsedDate)
        }
    }

    formatTime(date: Date): string {
        const diff = Math.floor((Date.now() - date) / 1000); 

        if (diff < 60) {
          return `${diff}s`;
        } else if (diff < 3600) {
          return `${Math.floor(diff / 60)}m`;
        } else {
          return `${Math.floor(diff / 86400)}d`;
        }
    }

    setShortcut( command: string ) {
        const RegExp = {
            "/": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "//": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "-": /(\w+|[^\w\s]*\-\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "--": /(\w+|[^\w\s]*\--\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "#": /(\w+|[^\w\s]*\#\w+[^\w\s]*|[^\w\s]+|\s+)/g
        }
    
        this.shortcut = command;
        this.regex = RegExp[command];
    }

    get getName(): string {
        return this.name;
    }

    get getShortcut(): string {
        return this.shortcut;
    }

    get getDescription(): string {
        return this.description;
    }

    get getExpansion(): string {
        return this.expansion;
    }

    set setName( name: string ) {
        this.name = name;
    }

    set setDescription( description: string ) {
        this.description = description;
    }

    set setExpansion( expansion: string ) {
        this.expansion = expansion;
    }
}

