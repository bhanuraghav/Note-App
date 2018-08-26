console.log("Staring app.js");

const fs = require("fs"),
	  _ = require("lodash"),
	  yargs = require("yargs");


const notes = require("./notes");

const titleOption = {
			describe: 'Title of note',
			demand : true,
			alias : 't'
};
const bodyOption = {
			describe: 'Body of note',
			demand : true,
			alias : 'b'
};
const argv = yargs
	.command('add','Add a new Note',{
		title:titleOption,
		body: bodyOption
	})
	.command('list','List all Notes')
	.command('read','Read a Note',{
		title:titleOption
	})
	.command('remove','Remove a Note',{
		title: titleOption
	})
	
	.help()
	.argv;
// console.log("Results : ", notes.add(9,-2));
// console.log(_.isString("Andrew"));
// console.log(_.isString("hello"));

var command = process.argv[2];
console.log(process.argv);
console.log("command : ",command);
console.log("Yargs : ",argv);


if(command === "add" ){
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log("Note Created");
		notes.logNote(note);

	}
	else{
		console.log("Note title taken");

	}

} else if(command === "list"){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes.`);
	allNotes.forEach((note) => notes.logNote(note)); 

} else if(command === "read"){
	var note=notes.getNote(argv.title);
	if(note){
		console.log("Note Found");
		notes.logNote(note);	
	}
	else{
		console.log("Note not found");
	}

} else if(command === "remove"){
	var noteRemoved=notes.removeNote(argv.title);
	var message = noteRemoved ? "Notes removed" : "No note removed";
	console.log(message);

} else{
	console.log("command not recognised");
}
 