const util = require('util');
const fs = require('fs');
const uniqid = require('uniqid');
const writeFileAsync = util.promisify(fs.writeFile)
const readFileAsync = util.promisify(fs.readFile)

class Note {
    readNotes(){
        return readFileAsync('/db/db.json', 'utf8');
    };
    writeNotes(note){
        return writeFileAsync('/db/db.json', JSON.stringify(note));
    };
    getNotes(){
        return this.readNotes().then((notes)=>{
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            }catch(err){
                console.log('Failed to get notes')
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }
    addNote(note){
        const {title, text} = note;
        if (!title || !text){
            return new Error('Please input note content!');
        }
        const newNote = {
            title,
            text,
            id: uniqid()
        };
        return this.getNotes()
        .then ((notes) => [...notes, newNote])
        .then((noteUpdate) => this.writeNotes(noteUpdate))
        .then(()=>{
            newNote;
        })
    }
}

module.exports = new Note();