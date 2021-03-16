from FeaturesPkg import SpotifyFeatures
from PlaylistPkg import getFeaturesArray

'''
class FeatureSpaceRepresentation:
    Representation of Spotify feature space
    
    getClasses(self):
        Get classes
        return: python array of SpotifyFeatures
'''


class FeatureSpaceRepresentation:
    def __init__(self, playlistId='spotify:playlist:4qisgl4gzT7ATcUbJKZirO'):
        self._classes = getFeaturesArray(playlistId)

    def getClasses(self):
        return self._classes
