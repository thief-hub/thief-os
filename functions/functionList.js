import help from './help.function.js';
import about from './about.function.js';
import man from './man.function.js';
import time from './time.function.js';
import print from './print.function.js';

const list = {
    help,
    about,
    man,
    time,
    print,
}

const functionList = new Map();

for (const [key, value] of Object.entries(list)) {
    functionList.set(key, value);
}

export default functionList;
