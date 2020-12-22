from FeatureSpaceRepresentationPkg import FeatureSpaceRepresentation
from PlaylistPkg import getPlaylistMidpoint
from sklearn.neighbors import KNeighborsClassifier
import numpy


def getClassification(playlistURI='spotify:playlist:0XgEPjlWTX4g4HjBNhtZIL'):
    midpoint = getPlaylistMidpoint(playlistURI)
    model = KNeighborsClassifier(n_neighbors=1)
    representation = FeatureSpaceRepresentation()
    classes = representation.getClasses()
    numpyMatrix = numpy.zeros((0, 7))
    for index in enumerate(classes):
        npArray = index[1].getNumpyArray()
        numpyMatrix = numpy.vstack((numpyMatrix, npArray))
    labels_gt = numpy.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    model.fit(numpyMatrix, labels_gt)

    labels = model.predict(midpoint.reshape(1, -1))
    print(labels)
    print(midpoint)
    return int(labels)


if __name__ == "__main__":
    getClassification()