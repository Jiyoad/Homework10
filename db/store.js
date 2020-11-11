const util = require("util");
const fs = require("fs");
// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// creates a Store class (function constructor)
class Store {

  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
        // here you will write a function that uses the above read function and parses the notes from the file 
      let parsedNotes;
      // If notes isn't an array or can't be turned into one, send back a new empty array
        parsedNotes = [].concat(JSON.parse(notes));
      
      return parsedNotes;
    });
    
  }

  addNote(newNote) {
    // set up variables with our notes data here
    const { title, text } = newNote;
    console.log(newNote);

// Add a unique id to the note using uuid package
    const noteId = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the noteId
    return this.getNotes()
        .then( notes => [...notes, noteId])
        .then(newNotes => this.write(newNotes))
        .then(() => noteId);
        
  }
  

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
    // take the notes, filter out each note so that passed in
    // note is the only one left.
    .then(notes => notes.filter(note => note.id !== id))
    // leaves only the filtered notes
    .then(remainingNotes => this.write(remainingNotes))
  }

 }
// exports the Store class, constructed above.
module.exports = new Store();