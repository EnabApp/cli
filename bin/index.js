#! /usr/bin/env node

import figlet from "figlet";
import gradient from "gradient-string";
import consola from 'consola'
import commands from '../src/commands.json' assert { type: "json" };
import Table from 'cli-table'
import * as cmdRunners from '../src/commands/index.js'


/* Printing the name of Enab in the console. */
figlet("E n a b", (err, data) => {
    console.log(gradient.cristal(data));
});

await new Promise(resolve => setTimeout(resolve, 100));


const command = commands.find(command => command.command == process.argv[2])
if (!command){
    consola.error('Please choose one of the following commands:')
    const table = new Table({ head: ['COMMAND', 'DESCRIPTION'] });
    table.push(...commands.map(cmd => [`enab ${cmd.command}`, cmd.title]))
    console.log(table.toString());
    process.exit(1);
}

// Process function with arguments
cmdRunners[command.function]()


