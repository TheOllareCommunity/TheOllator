import csv
import py_midicsv as pm


file1= 'C:\\Users\\eugep\\Desktop\\EUGE\\MAE\\Creative Programming\\Progetto\\Ollator\\TheOllator\\static\\MIDI_2bar\\BeatA_drum_2bar.mid';
file2= 'C:\\Users\\eugep\\Desktop\\EUGE\\MAE\\Creative Programming\\Progetto\\Ollator\\TheOllator\\static\\MIDI_2bar\\BeatB_drum_2bar.mid';

# Load the MIDI file and parse it into CSV format
csv_string1 = pm.midi_to_csv(file1)
csv_string1=csv_string1[:-2]

csv_string2 = pm.midi_to_csv(file2)
csv_string2=csv_string2[5:]

with open("converted1.csv", "w") as f:
    f.writelines(csv_string1)

with open("converted2.csv", "w") as f:
    f.writelines(csv_string2)



with open("converted2.csv") as f_in, open("outfile.csv", 'w') as f_out:
    # Write header unchanged
    header = f_in.readline()
    f_out.write(header)

    length = sum(1 for row in csv.reader(f_in))

    check = 0
    # Transform the rest of the lines for line in f_in:
    for r in csv.reader(f_in):
        index = 0
        check = check + 1;
        for column in r:
            if column == ' End_of_file':
                f_out.write(column)
            elif check == length-1 and index == 1:
                f_out.write('0')
            elif index != 1:
                f_out.write(column+', ')
            else:
                f_out.write(str(int(column) + 768)+', ')
            index=index+1;
            if index == 6:
                f_out.write('\n')
            if column==' End_track':
                f_out.write('\n')




    csv_final = csv_string1 + f_out;
    print(csv_final)


with open("example_final.csv", "w") as f:
    f.writelines(csv_final)





midi_object = pm.csv_to_midi(csv_final);

# Save the parsed MIDI file to disk
with open("concatenated_file.mid", "wb") as output_file:
    midi_writer = pm.FileWriter(output_file)
    midi_writer.write(midi_object)








'''


with open("converted2.csv", "w") as f:
    f.writelines(csv_string2)

with open("converted2.csv", "r") as f:
    for r in csv.reader(f):
        r[1]=768;

cv=pd.read_csv('file1_converted1.csv')

ac=pd.read_csv('file2_converted2.csv')

merged=pd.concat([cv, ac]);

csv_final=merged.to_csv('csv_final.csv');

midi_object = pm.csv_to_midi(csv_final);


pattern1 = midi.read_midifile(file1)
pattern2 = midi.read_midifile(file2)
pattern = midi.Pattern()

for track in pattern1:
    pattern.append(track)

for track in pattern2:
    pattern.append(track)
midi.write_midifile('sound.mid', pattern)'''