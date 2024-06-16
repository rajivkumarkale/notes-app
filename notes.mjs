import chalk from 'chalk'
import { writeFileSync, readFileSync } from 'fs'

const readNote = (title) => {
    const notes = loadNotes()

    const searchedNote = notes.find((note) => note.title === title)
    if(searchedNote){
        console.log(chalk.yellow.bold(`Title: ${title}`));
        console.log(chalk.yellow.bold(`body: ${searchedNote.body}`));
    }
    else{
        console.log(chalk.red.bold.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.bold("Your Notes::"))
    notes.forEach((note) => {
        console.log(chalk.greenBright.bold(note.title))
    })
}

const addNote = (title, body)  => {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes)

        console.log(chalk.green.bold.inverse('Note added successfuly'))
    }
    else {
        console.log(chalk.red.bold.inverse('Title is already taken, use a new one'))
    }
}

const saveNotes = (notes) => {
    const JSONdata = JSON.stringify(notes)
    writeFileSync('notes.json', JSONdata)
}

const loadNotes = () => {
    try{
        const JSONdata = readFileSync('notes.json').toString();
        return JSON.parse(JSONdata)
    } catch(e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title)

    if (updatedNotes.length !== notes.length) {
        console.log(chalk.green.bold.inverse('Note is removed Successfully'))
        saveNotes(updatedNotes)
    }
    else {
        console.log(chalk.red.bold.inverse(`Note not found`))
    }
}

export {readNote, addNote, removeNote, listNotes}


