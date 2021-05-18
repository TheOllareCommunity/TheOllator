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
    Gets tracks in a folder
    Args:
        path: path to multitrack folder  
    return: 
        1xN python array containing all wav files in Args:path folder
    
getSplittedTracks()
    Splits tracks in drums and accompainments
    return:
        1x2 python array [
            {"track": drum Track object,
             "letter": letter},
            {"letter": letter,
             "melody": melody Track object,
             "harmony": harmony Track object,
             "bass": bass Track object}
             ]
             
exportMixes(drums, accompainments)
    Overlays all combinations of drums and accompainments and exports .wav files
    Args:
        drums:
            {"track": drum Track object,
             "letter": letter}
        accompainments:
            {"letter": letter,
             "melody": melody Track object,
             "harmony": harmony Track object,
             "bass": bass Track object}
             
generateBeats()
    Generates beats and saves them in Generated_beats directory
        

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


def getSplittedTracks():
    # begin init
    projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
    multiTrackPath = pathlib.Path(str(projectPath) + '/Beats_multitrack')  # append desired multitrack path
    tracks = getTracks(multiTrackPath)
    drums = []
    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    accompainment = []
    # end init

    for index in enumerate(letters):
        dict = {"letter": index[1]}
        for index2 in enumerate(tracks):
            singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index2[1]))  # append single track name
            singleTrackPath_str = str(singleTrackPath)

            if singleTrackPath_str.endswith(index[1] + '_drum.wav'):
                drums.append({"track": Track(singleTrackPath), "letter": index[1]})
            elif singleTrackPath_str.endswith(index[1] + '_melody.wav'):
                dict["melody"] = Track(singleTrackPath)
            elif singleTrackPath_str.endswith(index[1] + '_harmony.wav'):
                dict["harmony"] = Track(singleTrackPath)
            elif singleTrackPath_str.endswith(index[1] + '_bass.wav'):
                dict["bass"] = Track(singleTrackPath)
        accompainment.append(dict)
    return [drums, accompainment]


def exportMixes(drums, accompainments):
    for drum in drums:
        for accompainment in accompainments:
            mix = drum["track"].getPydubTrack().overlay(accompainment["melody"].getPydubTrack())
            mix = mix.overlay(accompainment["harmony"].getPydubTrack())
            mix = mix.overlay(accompainment["bass"].getPydubTrack())
            projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
            generatedBeatsPath = pathlib.Path(str(projectPath) + '/Generated_beats')
            mix.export(str(generatedBeatsPath) + "/Beat" + drum["letter"] + accompainment["letter"] + ".wav",
                       format="wav")


def generateBeats():
    tracks = getSplittedTracks()
    exportMixes(tracks[0], tracks[1])


if __name__ == "__main__":
    generateBeats()
