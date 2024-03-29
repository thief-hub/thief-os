import {CommandLine, Dialog} from './utils/dialog.js'
import functionLoader from "./functionLoader.js";
import {FileSystem, WorkingDirectory} from "./filesystem/FileSystem.js";

/**
 * The terminal class
 */
export class Terminal {
    /**
     * The HTML element of the terminal
     * @type {HTMLElement}
     */
    div = null;

    /**
     * All sessions of the terminal
     */
    // static sessions = [];

    /**
     * The current working directory
     * @type {WorkingDirectory}
     */
    wd = null;

    /**
     * History of the terminal
     * @type {String[]}
     */
    history = [];

    historyPointer = 0;

    static instance = null;

    /**
     * This creates a new Session
     * @constructor
     *
     */
    constructor() {

        //Spawn the terminal
        // TODO: Make this a function

        if (Terminal.instance === null) {
            Terminal.instance = this;
        } else {
            return Terminal.instance;
        }

        CommandLine.terminal = this;

        // Saves the session
        // Terminal.sessions.push(this);
    }

    /**
     * Initialize the terminal and start the main loop
     * @returns {Promise<void>}
     */
    async init() {
        Dialog.globalInstance.say("Welcome to the terminal 龴ↀ◡ↀ龴", {newline: false});
        this.loadHistory();
        await this.loop();
    }

    /**
     * Push a new input to the history
     * @param input {string}
     */
    pushHistory(input) {
        const index = this.history.indexOf(input);
        if (index !== -1) {
            this.history.splice(index, 1);
        }
        this.history.push(input);
        this.saveHistory();
    }

    /**
     * Clear the history
     */
    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    /**
     * Save the history to the filesystem
     */
    saveHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        file.setData(JSON.stringify(this.history));
    }

    /**
     * Load the history from the filesystem
     */
    loadHistory() {
        const wwd = new WorkingDirectory();
        wwd.goDirByPath("var");
        const file = wwd.getOrCreateFile("history.json");
        const data = file.getData();
        if (data === "") return;
        this.history = JSON.parse(data);
    }


    /**
     * The main loop of the terminal
     * @returns {Promise<void>}
     */
    async loop() {
        const lines = document.getElementById("lines");
        while (true) {
            this.historyPointer = this.history.length;
            const config = {autoComplete: "apps", history: true};
            if (lines.innerHTML === "") config.newline = false;
            const input = await Dialog.globalInstance.ask(`${this.wd.getPathAsString() || ""} >`, config);
            try {
                // save output of last command
                this.pushHistory(input);
                await functionLoader.run(input);
            } catch (e) {
                console.log(e);
                Dialog.globalInstance.say(e.message);
            }
        }
    }

}