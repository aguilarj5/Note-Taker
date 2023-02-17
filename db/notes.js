const uuid = () => {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
};

const notes = [
	{
		title: 'test title',
		text: 'test text',
		note_id: uuid(),
	},
	{
		title: 'test title2',
		text: 'test text2',
		note_id: uuid(),
	},
];

// possible solution to rendering li elements
// let ulNotes = document.querySelector('.list-group');

// for (let i = 0; i < notes.length; i++) {
// 	let liNote = document.createElement('li');

// 	liNote.innerHTML = notes[i].title + notes[i].text;

// 	ulNotes.appendChild(liNote);
// }

module.exports = notes;
