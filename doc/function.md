# Functions

Functions are the core of the OS. They are the programs that the user can run.

Functions are stored in the `functions` folder. Each function is a separate file with the `.function.js` extension.

---

<!-- TOC -->

* [Functions](#functions)
    * [Create a new function](#create-a-new-function)
    * [Save Data](#save-data)
* [API](#api)
    * [args](#args)
    * [this Object](#this-object)
        * [this.storage](#thisstorage)
            * [this.storage.get](#thisstorageget)
            * [this.storage.set](#thisstorageset)
            * [this.storage.delete](#thisstoragedelete)
            * [this.storage.has](#thisstoragehas)
        * [this.name](#thisname)
        * [this.description](#thisdescription)
        * [this.execute](#thisexecute)
        * [this.source](#thissource)
        * [this.nameSpace](#thisnamespace)
        * [this.arguments](#thisarguments)
    * [os](#os)
        * [os.ask](#osask)
        * [os.say](#ossay)
        * [os.next](#osnext)
        * [os.wd](#oswd)

<!-- TOC -->

---

## Create a new function

1. Create a new file in the `functions` folder with name `yourNewFunction.function.js`

2. Add the following code to the file

```js
export default {
    name: "function name",
    description: "function description",
    arguments: ["file", ["option1", "option2", "option3"]],
    execute: async (os, args) => {
        // Your code here
    },
};
```

3. Add the function to `functions/functionList.js`

```js
import yourNewFunction from "./functions/yourNewFunction.function.js";
```

and add it to the array

```js
const arr = [
    // ...
    "./YourName.function.js"
]
```

In the `execute` function you can use the `os` and `args` parameters.

Through the `os` parameter you have access to the following functions:

- `os.ask` - wait for user input
- `os.say` - print text to user
- `os.next` - last message to end function

The `args` parameter is an array of arguments passed to the function.

## Save Data

Each function has its own data storage. You can save data in the following way:

```js
this.storage.set("key", "value");
```

Other available functions:

```js
this.storage.get("key");
this.storage.delete("key");
this.storage.has("key");
```

<br>

## Log Data

You can log data to the file system.

```js
os.logger.info("info message");
os.logger.warn("warn message");
os.logger.error("error message");
os.logger.debug("debug message");
```

---

# API

## this Object

### this.storage

This is a storage for the function. It is a key-value store, and it is unique for each function.

It stores the data in `/var/opt/` and creates a new file for each function.

<br>

#### this.storage.get

```js
this.storage.get("key");
```

Get value by key.

<br>

#### this.storage.set

```js
this.storage.set("key", "value");
```

Set value by key.

<br>

<br>

#### this.storage.delete

```js
this.storage.delete("key");
```

Delete value by key.

<br>

#### this.storage.has

```js
this.storage.has("key");
```

Check if key exists.

<br>

### this.name

```js
this.name;
```

Name of the function.


<br>

### this.description

```js
this.description;
```

Description of the function.

<br>

### this.execute

```js
this.execute(os, args)
{
    // Your code here
}
```

Entry point of the function.

- args - array of arguments passed to the function

<br>

### this.source

```js
this.source;
```

Path to the origin of the function.

- Read only

<br>

### this.nameSpace

```js
this.nameSpace;
```

Name space of the function.

- Read only

<br>

### this.arguments

```js
this.arguments = ["file", ["option1", "option2", "option3"]]
```

Optional, to use the autocompletion feature.

Possible values:

- "file" - file name
- "path" - file path
- "apps" - list of apps
- ["option1", "option2", "option3"] - list of options

## os

### os.ask (Deprecated)

```js
const string = await os.ask("question");
```

Wait for user input.

### os.say (Deprecated)

```js
os.say("text");
```

Print text to user.

### os.next (Deprecated)

```js
os.next("last message");
```

Last message to end function.

### os.dialog

#### os.dialog.ask

```js
const string = await os.dialog.ask("question");
```

Wait for user input.

#### os.dialog.say

```js
os.dialog.say("text");
```

Print text to user.

#### os.dialog.next

```js
os.dialog.next("last message");
```

Last message to end function.

#### os.dialog.typewriter

```js
os.dialog.typewriter("text", totalTime);
```

Print text to user with typewriter effect.

#### os.dialog.clear

```js
os.dialog.clear();
```

Clear the screen.

#### os.dialog.wait

```js
await os.dialog.wait(time);
```

Wait for a specified time.

### os.dialog.upload

```js
const file = await os.dialog.upload("filetype");
```

Upload a file.

### os.dialog.download

```js
await os.dialog.download(data, "filename");
```

Download a file.


### os.dialog.askYesNo

```js
const bool = await os.dialog.askYesNo("question");
```

Ask a yes/no question.

### os.wd

the current working directory

See also: [filesystem.md](./filesystem.md)

### os.fs

the filesystem

See also: [filesystem.md](./filesystem.md)

### os.logger

the logger

See also: [logger.md](./logger.md)