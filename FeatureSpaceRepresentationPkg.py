from SpotifyFeatures import SpotifyFeatures
from PlaylistPkg import getFeaturesArray
from db import getFeaturesFromDb

'''
class FeatureSpaceRepresentation:
    Representation of Spotify feature space
    
    getClasses(self):
        Get classes
        return: python array of SpotifyFeatures
'''


class FeatureSpaceRepresentation:
    def __init__(self):
        self._classes = getFeaturesFromDb()


    def getClasses(self):
        return self._classes
