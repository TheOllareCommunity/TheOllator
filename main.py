import pathlib
import time

import pydub
from pydub import playback, effects

from TrackPkg import Track, getTracks
from PlaylistPkg import menu as playlistMenu
from FeaturesPkg import menu as featureMenu
from ClassificationPkg import getClassification


def mainMenu():
    usrinput = input("\ntype \"playlist\" to access PlaylistPkg menu, \"makenoise\" to play a beat,"
                     " \"features\" to access FeaturePkg menu,"
                     "\"get_prediction\" to get playlist prediction, q to quit\n")
    if usrinput == "playlist":
        playlistMenu()
        return True
    elif usrinput == "makenoise":
        playback.play(effects.normalize(outputMix[-1], headroom=3))
        return True
    elif usrinput == "features":
        featureMenu()
        return True
    elif usrinput == "get_prediction":
        getClassification()
        return True
    elif usrinput == "q":
        return False
    else:
        print("Wrong Input")
        rollbackInput = input("type \"q\" to quit, anything else to return to main menu\n")
        if rollbackInput == "q":
            return False
        return True


# begin init
projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
multiTrackPath = pathlib.Path(str(projectPath) + '/multitrack/lofi_1')  # append desired multitrack path
tracks = getTracks(multiTrackPath)
outputMix = []
tracksObjects = []
firstTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(tracks[0]))
mixedAudio = pydub.AudioSegment.from_file(firstTrackPath, format='wav')  # load first track
outputMix.append(mixedAudio)  # append first track
# end init

for index in enumerate(tracks):  # load tracks

    singleTrackPath = pathlib.Path(str(multiTrackPath) + '/{}'.format(index[1]))  # append single track name

    # begin append and mix track
    tracksObjects.append(Track(singleTrackPath))  # store track object

    if index[0] != 0:
        segment = tracksObjects[-1].getPydubTrack()  # get track to overlay
        mix = outputMix[-1].overlay(segment)  # overlay to output mix
        outputMix.append(mix)  # append new mix
    # end append and mix track

print("OLLARE")
time.sleep(1)
print("THE")
time.sleep(1)
print("GANG")
time.sleep(1)

flag = mainMenu()
while flag:
    flag = mainMenu()
