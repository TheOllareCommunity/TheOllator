from FeatureSpaceRepresentationPkg import FeatureSpaceRepresentation
from PlaylistPkg import getPlaylistMidpoint
from sklearn.neighbors import KNeighborsClassifier
import numpy
from db import startDb

'''
getClassification(playlistURI='spotify:playlist:0XgEPjlWTX4g4HjBNhtZIL')
    Performs classification of the playlist
    NB: FeatureSpaceRepresentation playlist id should be different from the id of the 
        playlist to be classified
    Args:
        playlistURI uri of the playlist to classify
        
    return: 1x1 numpy.array containing index of FeatureSpaceRepresentation class selected  
'''

def getClassification(playlistId='spotify:playlist:0XgEPjlWTX4g4HjBNhtZIL'):
    startDb()
    midpoint = getPlaylistMidpoint(playlistId)
    model = KNeighborsClassifier(n_neighbors=1)
    representation = FeatureSpaceRepresentation()
    classes = representation.getClasses()
    numpyMatrix = numpy.zeros((0, 5)) #da rendere più generico (estrai la lunghezza dall'array di features)
    labels_gt = numpy.array([])
    for index in enumerate(classes):
        npArray = index[1].getNumericFeatures()
        numpyMatrix = numpy.vstack((numpyMatrix, npArray))
        labels_gt = numpy.append(labels_gt, index[0])
    model.fit(numpyMatrix, labels_gt)

    labels = model.predict(midpoint.reshape(1, -1))
    return int(labels) + 302 #offset ID_Beat


if __name__ == "__main__":
    getClassification()
