import pathlib
import time

import pydub
from pydub import playback, effects

from TrackPkg import Track, getTracks
from PlaylistPkg import menu as playlistMenu
from SpotifyFeatures import menu as featureMenu
from ClassificationPkg import getClassification
from server import con


def mainMenu():
    usrinput = input("\ntype \"playlist\" to access PlaylistPkg menu,"
                     " \"features\" to access FeaturePkg menu,"
                     "\"get_prediction\" to get playlist prediction, q to quit\n")
    if usrinput == "1":
        playlistMenu()
        return True
    elif usrinput == "2":
        featureMenu()
        return True
    elif usrinput == "3":
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


flag = mainMenu()
while flag:
    flag = mainMenu()

con.close()
