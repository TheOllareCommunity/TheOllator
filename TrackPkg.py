import os
import pathlib
import librosa
import pydub
from pydub import playback
from pydub.playback import play

'''
CLASS Track:
    Class representing a track to play
        __init__(self, path):
            Args:
                path: path to wav file   
        STANDARD GETTERS
        play(self):
            play track
getTracks(path):
    Gets tracs in a folder
    Args:
        path: path to multitrack folder
        
    return: 1xN python array containing all wav files in Args:path folder
'''


class Track:
    def __init__(self, path):
        self._path = path  # path to wav file
        self._signal, self._rate = librosa.load(path, sr=None, mono=False)  # librosa array (for analisys only)
        self._pydubTrack = pydub.AudioSegment.from_file(path, format='wav')  # track to play back

    def getPydubTrack(self):
        return self._pydubTrack

    def getSignal(self):
        return self._signal

    def getSampleRate(self):
        return self._rate

    def getPath(self):
        return self._path

    def play(self):  # play track
        playback.play(self._pydubTrack)


def getTracks(path):  # returns list of all wav files in "path" directory
    tracks_collection = [f for f in os.listdir(path) if f.endswith('.wav')]
    return tracks_collection


# print(getTracks("/Users/PilvioSol/Desktop/Prova"))

# prova = Track("/Users/PilvioSol/Desktop/Prova/BeatA_drum.wav").play()
# prova = Track("/Users/PilvioSol/Desktop/Prova/BeatA_melody.wav").play()

projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
multiTrackPath = pathlib.Path(str(projectPath) + '/Beats_multitrack')  # append desired multitrack path
tracks = getTracks(multiTrackPath)
print(tracks)
outputMix = []
drums =[]
tracksObjects = []
firstTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(tracks[0]))
mixedAudio = pydub.AudioSegment.from_file(firstTrackPath, format='wav')  # load first track
outputMix.append(mixedAudio)  # append first track
# end init

'''
for index in enumerate(tracks):  # load tracks

    singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index[1]))  # append single track name

    # begin append and mix track
    tracksObjects.append(Track(singleTrackPath))  # store track object

    if index[0] != 0:
        segment = tracksObjects[-1].getPydubTrack()  # get track to overlay
        mix = outputMix[-1].overlay(segment)  # overlay to output mix
        outputMix.append(mix)  # append new mix
    # end append and mix track

print(outputMix)
#play(mix)
mix.export("/Generated_beats/mixed_sounds.mp3", format="mp3")
'''
letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
for index in enumerate(letters):
    for index2 in enumerate(tracks):
            singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index2[1]))  # append single track name
            singleTrackPath_str = str(singleTrackPath)
            #print(singleTrackPath_str)

            if singleTrackPath_str == (
                '/Users/PilvioSol/Desktop/TheOllator/Beats_multitrack/Beat' + str(index[1]) + '_drum.wav'):
                #print(singleTrackPath)
                drums.append(singleTrackPath)
                tracksObjects.append(Track(singleTrackPath))


print(drums[0])
for index2 in enumerate(tracks):
    singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index2[1]))  # append single track name
    singleTrackPath_str = str(singleTrackPath)
    if 'drum' not in singleTrackPath_str and 'A_' in singleTrackPath_str:
        print(singleTrackPath)
        segment = tracksObjects[-1].getPydubTrack()  # get track to overlay
        mix = outputMix[-1].overlay(segment)  # overlay to output mix
        outputMix.append(mix)  # append new mix


play(mix)


#print(tracksObjects)



'''   
for index in enumerate(tracks):
    singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index[1]))  # append single track name
    singleTrackPath_str= str(singleTrackPath)
    if singleTrackPath_str.endswith('_drum'):
'''
