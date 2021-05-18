from PlaylistPkg import getFeaturesArray
import sqlite3
from SpotifyFeatures import SpotifyFeatures


def startDb():
    global con
    global cur
    con = sqlite3.connect('db/db.db')
    cur = con.cursor()

    print("DB started")


# ---------------------DB UPDATE TEST

# call this function to add beats to the DB
def updateDb(playlistID='spotify:playlist:1Rd3nbOXI3Jlui4lmv4GGH'):
    songs = getFeaturesArray(playlistID)

    for song in songs:
        harmonyID = song.getName()[5]
        drumsID = song.getName()[4]
        harmony_folderPath = "Beat" + harmonyID
        drums_folderPath = "Beat" + drumsID

        # checks that the harmonyID is unique
        cur.execute("SELECT ID_Harmony FROM Harmony WHERE ID_Harmony=?", harmonyID)
        if not cur.fetchall():
            cur.execute("INSERT INTO Harmony(ID_Harmony, FolderPath) VALUES(?, ?)", (harmonyID, harmony_folderPath))

        # checks that the drumsID is unique
        cur.execute("SELECT ID_Drums FROM Drums WHERE ID_Drums=?", drumsID)
        if not cur.fetchall():
            cur.execute("INSERT INTO Drums(ID_Drums, FolderPath) VALUES(?, ?)", (drumsID, drums_folderPath))

        # checks that the combination of harmony and drums aren't repeated
        cur.execute("SELECT ID_Beat FROM Beat WHERE ID_Drums=? AND ID_Harmony=?", (drumsID, harmonyID))
        if not cur.fetchall():
            cur.execute(
                "INSERT INTO Beat(ID_Harmony, ID_Drums, Valence, Energy, Mode, Danceability) VALUES(?, ?, ?, ?, ? ,?)",
                (harmonyID, drumsID, song.getValence(), song.getEnergy(), song.getMode(),
                 song.getDanceability()))

    # cur.execute("SELECT * FROM Beat")
    # print(cur.fetchall())

    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    con.commit()


def getFeaturesFromDb():
    cur.execute("SELECT ID_Beat, Energy, Valence, Danceability, Mode  FROM Beat")  # db response
    songs = cur.fetchall()
    features = []
    for song in songs:
        songName = str(song[0])
        energy = song[1]
        valence = song[2]
        tempo = 120
        danceability = song[3]
        mode = song[4]
        features.append(SpotifyFeatures(songName, energy, valence, tempo, danceability, mode))

    return features


def getMIDIfromBeatID(beatID=None):
    harmonyPath = None
    drumPath = None
    print("===============================================")
    print(beatID)
    if beatID != None:
        cur.execute("SELECT FolderPath from Harmony WHERE Harmony.ID_Harmony = (SELECT ID_Harmony from Beat where ID_Beat=?)", (str(beatID),))
        harmonyPath = cur.fetchall()
        cur.execute("SELECT FolderPath from Drums WHERE Drums.ID_Drums = (SELECT ID_Drums from Beat where ID_Beat=?)", (str(beatID),))
        drumPath = cur.fetchall()
        print(harmonyPath)
        print(drumPath)
    return (harmonyPath, drumPath)
