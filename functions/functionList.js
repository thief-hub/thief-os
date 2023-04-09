import help from './help.function.js';
import about from './about.function.js';
import man from './man.function.js';
import time from './time.function.js';
import print from './print.function.js';
import clear from './clear.function.js';
import repo from './repo.function.js';
import curl from './curl.function.js';
import rev from './rev.function.js';
import ls from './ls.function.js';
import cd from './cd.function.js';
import mkdir from './mkdir.function.js';
import cat from './cat.function.js';
import touch from './touch.function.js';

const list = {
    help,
    about,
    man,
    time,
    print,
    clear,
    repo,
    curl,
    rev,
    ls,
    cd,
    mkdir,
    cat,
    touch
}

const functionList = new Map();

for (const [key, value] of Object.entries(list)) {
    Object.defineProperty(value, "source", {value: `default/${key}.function.js`, writable: false});
    functionList.set(key, value);
}

export default functionList;
