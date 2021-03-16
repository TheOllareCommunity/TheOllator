import pathlib
import time

import pydub
from pydub import playback, effects

from TrackPkg import Track, getTracks
from PlaylistPkg import menu as playlistMenu
from FeaturesPkg import menu as featureMenu
from ClassificationPkg import getClassification


def mainMenu():
    usrinput = input("\ntype \"playlist\" to access PlaylistPkg menu,"
                     " \"features\" to access FeaturePkg menu,"
                     "\"get_prediction\" to get playlist prediction, q to quit\n")
    if usrinput == "playlist":
        playlistMenu()
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


print("OLLARE")
time.sleep(1)
print("THE")
time.sleep(1)
print("GANG")
time.sleep(1)

flag = mainMenu()
while flag:
    flag = mainMenu()
