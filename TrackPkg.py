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


def getDrums(path):
    tracks_collection = [f for f in os.listdir(path) if f.endswith('drums.wav')]
    return tracks_collection


def getMelodies(path):
    tracks_collection = [f for f in os.listdir(path) if f.endswith('melody.wav')]
    return tracks_collection


def getBass(path):
    tracks_collection = [f for f in os.listdir(path) if f.endswith('bass.wav')]
    return tracks_collection


def getHarmony(path):
    tracks_collection = [f for f in os.listdir(path) if f.endswith('harmony.wav')]
    return tracks_collection


def splitTracks():
    projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
    multiTrackPath = pathlib.Path(str(projectPath) + '/Beats_multitrack')  # append desired multitrack path
    tracks = getTracks(multiTrackPath)
    print(tracks)
    outputMix = []
    drums = []
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
    accompainment = []
    for index in enumerate(letters):
        dict = {"letter": index[1]}
        for index2 in enumerate(tracks):
            singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index2[1]))  # append single track name
            singleTrackPath_str = str(singleTrackPath)
            # print(singleTrackPath_str)

            if singleTrackPath_str.endswith(index[1] + '_drum.wav'):
                # print(singleTrackPath)
                drums.append({"track": Track(singleTrackPath), "letter": index[1]})
            elif singleTrackPath_str.endswith(index[1] + '_melody.wav'):
                dict["melody"] = Track(singleTrackPath)
            elif singleTrackPath_str.endswith(index[1] + '_harmony.wav'):
                dict["harmony"] = Track(singleTrackPath)
            elif singleTrackPath_str.endswith(index[1] + '_bass.wav'):
                dict["bass"] = Track(singleTrackPath)
        accompainment.append(dict)
    exportMixes(drums, accompainment)


def exportMixes(drums, accompainments):
    for drum in drums:
        for accompainment in accompainments:
            mix = drum["track"].getPydubTrack().overlay(accompainment["melody"].getPydubTrack())
            mix = mix.overlay(accompainment["harmony"].getPydubTrack())
            mix = mix.overlay(accompainment["bass"].getPydubTrack())
            play(mix)
            input("hjc")


    '''print(drums[0])
    for index2 in enumerate(tracks):
        singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index2[1]))  # append single track name
        singleTrackPath_str = str(singleTrackPath)
        if 'drum' not in singleTrackPath_str and 'A_' in singleTrackPath_str:
            print(singleTrackPath)
            segment = tracksObjects[-1].getPydubTrack()  # get track to overlay
            mix = outputMix[-1].overlay(segment)  # overlay to output mix
            outputMix.append(mix)  # append new mix

    play(mix)'''


if __name__ == "__main__":
    splitTracks()
