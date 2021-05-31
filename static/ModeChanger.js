 /**
   * Set the mode
   * @param {Integer} mode mode i want to apply: 0=ionian, 1=dorian, 2=phrygian, 3=lydian, 4=mixolydian, 5=aeolian, 6=locrian
   * @param {CharacterData} tonality tonality of the midi file
   * @param {Integer} note note to adapt to the mode
   */

function setMode(mode, tonality, note){
    var allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var intervals = [0,2,4,5,7,9,11];
    var scale = [];
    if (typeof(note) === "string"){
        note = note.substr(0, note.length - 1);
    }
        
    tonality = allNotes.indexOf(tonality)-intervals[mode];
    tonality < 0 ? tonality += 12: 0;
    for (j = 0; j < 7; j++) {
        scale[j] = intervals[j] + tonality;
        scale[j] = scale[j] % 12;
    } 
    if(scale.includes(note % 12) == false)
        note += 1;

    return note;    
}