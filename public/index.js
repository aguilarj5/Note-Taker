//intitializing required libraries and files
const express = require('express');
const path = require('path');
let notes = require('../db/notes');
const uuid = () => {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
};

//allows use of filesystem methods
const fs = require('fs');

//PORT to be used
const PORT = 3001;

//instance of express to use express methods
const app = express();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//sets the homepage for the note app
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

//allows the notes.html page to be accessed
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, 'notes.html'));
});

//allows the api to be accessed in browser
app.get('/api/notes', (req, res) => {
	res.json(notes);
});

//create new note
app.post('/notes', (req, res) => {
	const newNote = {
		title: req.body.title,
		text: req.body.text,
		note_id: uuid(),
	};

	if (!newNote.title || !newNote.text) {
		return res.status(400).json({ msg: 'Must include Note title and text' });
	}

	notes.push(newNote);
	res.redirect('/notes');

	console.log('posted');
});

//delete existing note
app.delete('/api/notes/:id', (req, res) => {
	res.json(
		(notes = notes.filter((note) => note.note_id !== parseInt(req.params.id)))
	);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
