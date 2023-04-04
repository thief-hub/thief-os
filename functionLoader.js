
const os = {
    functions: new Map(),
    promiseResolve: null,
    promiseReject: null,
    say: (message) => {
        console.log(message);
    }
}

os.load = () => {
    return new Promise(async (resolve, reject) => {
        import('./functions/functionList.js').then((module) => {
            os.functions = module.default;
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}

os.run = function (data) {
    const args = data.split(' ');
    const command = args.shift().toLowerCase();

    if (!this.functions.has(command)) {
        this.next('function doesnt exist');
        return;
    }

    if (this.functions.get(command).arguments !== -1) {
            
        if (args.length > this.functions.get(command).arguments) {
        os.next('too many arguments');
        return;
        }

        if (args.length < this.functions.get(command).arguments) {
            os.next('not enough arguments');
            return;
        }
    }

    try {
        if (args[0] === '-h') {
            this.next(this.functions.get(command).description);
            return;
        }

        this.functions.get(command).execute(this, args, os.functions);
    }
    catch (error) {
        say(error);
    }

}

os.load();
export default os;
