import { Note, OctaveGroup } from "../types/types";

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
];

export const whiteKeyNames = ["C", "D", "E", "F", "G", "A", "B"];
export const blackKeyNames = ["C#", "D#", "F#", "G#", "A#"];

//Offset Positions
export const blackKeyPositions = new Map([
  ["C#", 0],
  ["D#", 1],
  ["F#", 3],
  ["G#", 4],
  ["A#", 5],
]);

export const noteOctaves = [2, 3, 4, 5, 6, 7];

export const getNotesByOctave = (start: number, end: number): Note[] => {
  if (start < 2 || end > 6) {
    console.error("octave is out of bounds");
    return [];
  }

  //loop through note names and append the octave number
  const notes: Note[] = [];

  for (let octave = start; octave <= end; octave++) {
    noteNames.forEach((noteName) => {
      const newNote: Note = {
        name: `${noteName}${octave}`,
        duration: "8n",
      };
      notes.push(newNote);
    });
  }

  // console.log(notes);
  return notes;
};

export const getOctaveGroups = (start: number, end: number): OctaveGroup[] => {
  if (start < 2 || end > 6) {
    console.error("octaves out of bounds");
    return [];
  }

  const octaveGroups: OctaveGroup = [];

  for (let octave = start; octave <= end; octave++) {
    const allNotes: Note[] = [];
    const whiteKeys: Note[] = [];
    const blackKeys: Note[] = [];

    noteNames.forEach((noteName) => {
      const note: Note = {
        name: `${noteName}${octave}`,
        duration: "8n",
      };

      allNotes.push(note);
      if (noteName.includes("#")) {
        blackKeys.push(note);
      } else {
        whiteKeys.push(note);
      }
    });

    octaveGroups.push({
      octave,
      whiteKeys,
      blackKeys,
      allNotes,
    });
  }

  return octaveGroups;
};

export const getBlackKeyOffset = (
  blackKeyNote: string,
  whiteKeyWidth: number = 50,
  octaveIndex: number = 0,
): number => {
  const blackKeyWidth = whiteKeyWidth - 15;

  const blackKeyOffset = whiteKeyWidth - blackKeyWidth / 2;

  //Just the note name
  const noteName = blackKeyNote.replace(/\d+$/, "");

  const whiteKeyPosition = blackKeyPositions.get(noteName);
  console.log("whiteKeyPosition: ", whiteKeyPosition);

  if (whiteKeyPosition === undefined) {
    console.error(`Invalid black Key: ${blackKeyNote}`);
    return 0;
  }

  //Calculate offset
  const octaveOffset = octaveIndex * whiteKeyNames.length * whiteKeyWidth;
  const positionOffset = whiteKeyPosition * whiteKeyWidth + blackKeyOffset;

  return octaveOffset + positionOffset;
};

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
