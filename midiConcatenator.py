import midi

file1 = "/Users/PilvioSol/Desktop/TheOllator/static/MIDI_2bar/BeatA_drum_2bar.mid"
file2 = "/Users/PilvioSol/Desktop/TheOllator/static/MIDI_2bar/BeatB_drum_2bar.mid"

pattern1 = midi.read_midifile(file1)
#print(pattern1)
pattern2 = midi.read_midifile(file2)

tracker = midi.Track()
pattern = midi.Pattern()
pattern.resolution=96


''''for track in pattern1:
    tracker.append(track)

for track in pattern2:
    tracker.append(track)'''

for track in pattern1:
    for event in track[:-1]:
        tracker.append(event)

for track in pattern2:
    for event in track[3:-1]:
        tracker.append(event)

#print(tracker)
pattern.append(tracker)
print(pattern)

midi.write_midifile('sound.mid', pattern)


