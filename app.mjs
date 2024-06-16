import chalk from "chalk"
import yargs_package from "yargs"
import {hideBin} from "yargs/helpers"
import { readNote, addNote, removeNote, listNotes } from "./notes.mjs"

const yargs = yargs_package(hideBin(process.argv))

yargs.version('0.0.1')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Note Details',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe:'Title of the note to remove',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})


yargs.command({
    command:'read',
    describe:'Read the note',
    builder: {
        title:{
            describe: 'Title of the note to read',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'List all notes',
    handler() {
        listNotes()
    }
})

yargs.parse()
