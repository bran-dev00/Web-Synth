import { Note } from "../types/types";

const notes: Note = [{ name: "C2", duration: "8n" }];

// C,C#,D,D#,E,E#,F,F#,G,G#,A,A#,B,B#
export const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "B#",
];

export const noteOctaves = [2, 3, 4, 5, 6, 7];

export const getNotesByOctave = (start: number, end: number) => {
  if (start < 2 || end > 6) {
    console.error("octave is out of bounds");
  }

  //loop through note names and append the octave number

  const notes: Note[] = [];

  noteNames.forEach((note) => {
    const newNote = { name: note.concat(start.toString()), duration: "8n" };
    notes.push(newNote);
    // console.log(newNote.name);
  });

  return notes;
};

getNotesByOctave(2, 3);

export const keyNoteMap = new Map<string, Note>([
  ["a", { name: "C4", duration: "8n" }],
  ["w", { name: "C#4", duration: "8n" }],
  ["s", { name: "D4", duration: "8n" }],
  ["e", { name: "D#4", duration: "8n" }],
  ["d", { name: "E4", duration: "8n" }],
  ["f", { name: "F4", duration: "8n" }],
  ["t", { name: "F#4", duration: "8n" }],
  ["g", { name: "G4", duration: "8n" }],
  ["y", { name: "G#4", duration: "8n" }],
  ["h", { name: "A4", duration: "8n" }],
  ["u", { name: "A#4", duration: "8n" }],
  ["j", { name: "B4", duration: "8n" }],
  ["k", { name: "C5", duration: "8n" }],
  ["o", { name: "C#5", duration: "8n" }],
  ["l", { name: "D5", duration: "8n" }],
  ["p", { name: "D#5", duration: "8n" }],
  [";", { name: "E5", duration: "8n" }],
]);
