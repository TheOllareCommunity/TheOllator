from FeaturesPkg import SpotifyFeatures


class FeatureSpaceRepresentation:
    def __init__(self):
        self._classes = []

        class0 = SpotifyFeatures(0.5, -9, 0.2, 0.3, 95, 0.6, 4)
        class1 = SpotifyFeatures(0.47, -8, 0.3, 0.4, 89, 0.4, 4)
        class2 = SpotifyFeatures(0.6, -7, 0.1, 0.2, 140, 0.1, 4)
        class3 = SpotifyFeatures(0.55, -7.5, 0.15, 0.15, 140, 0.2, 4)
        class4 = SpotifyFeatures(0.428, -8.28, 0.149, 0.333, 100, 0.88, 4)
        class5 = SpotifyFeatures(0.6, -8, 0.1, 0.5, 115, 0.4, 4)
        class6 = SpotifyFeatures(0.35, -10, 0.4, 0.4, 130, 0.5, 4)
        class7 = SpotifyFeatures(0.25, -4.5, 0.2, 0.6, 128, 0.7, 4)
        class8 = SpotifyFeatures(0.7, -8, 5, 0.8, 105, 0.45, 4)
        class9 = SpotifyFeatures(0.5, -6, 5, 0.1, 170, 0.5, 4)
        class10 = SpotifyFeatures(0.4, -7, 0.05, 0.7, 130, 0.35, 4)
        class11 = SpotifyFeatures(0.35, -9, 0.25, 0.5, 140, 0.6, 4)
        self._classes.append(class0)
        self._classes.append(class1)
        self._classes.append(class2)
        self._classes.append(class3)
        self._classes.append(class4)
        self._classes.append(class5)
        self._classes.append(class6)
        self._classes.append(class7)
        self._classes.append(class8)
        self._classes.append(class9)
        self._classes.append(class10)
        self._classes.append(class11)

    def getClasses(self):
        return self._classes
