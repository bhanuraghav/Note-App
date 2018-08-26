console.log('Starting notes.js');

const fs = require("fs");

var fetchNotes = () => {
	try{
			var notesString = fs.readFileSync("notes-data.json");
			return JSON.parse(notesString);
	} catch(err){
		return [];
	}

};

var saveNotes = (notes) => {
	fs.writeFileSync("notes-data.json", JSON.stringify(notes));
     
};

var addNote = (title , body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	
	var duplicateNotes = notes.filter((note) => note.title === title
	);

	// console.log(duplicateNotes);
	// var duplicateNotes = notes.filter((note) => {
	// 	return note.title === title;
	// });

	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}


  // console.log('Adding Note ', title , body);
};

var getAll = () => {
	return fetchNotes();

}

var getNote = (title) => {
	var notes = fetchNotes();
	var foundNote = notes.filter((note) => note.title === title );
	return foundNote[0];
}

var removeNote = (title) => {
	// console.log("Removing notes ", title);
	//fetch notes
	var notes = fetchNotes();

	//filter notes , removing the one with title of argument
	var filterNotes = notes.filter( (note) => note.title!== title);

	// save the new array
	saveNotes(filterNotes);
	return notes.length !== filterNotes.length;

}


var logNote = (note) => {
		debugger;
		console.log("---");
		console.log(`Title : ${note.title}`);
		console.log(`Body : ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
