"""
Prerequisites
    pip3 install spotipy Flask Flask-Session
    // from your [app settings](https://developer.spotify.com/dashboard/applications)
    export SPOTIPY_CLIENT_ID=client_id_here
    export SPOTIPY_CLIENT_SECRET=client_secret_here
    export SPOTIPY_REDIRECT_URI='http://127.0.0.1:8080' // must contain a port
    // SPOTIPY_REDIRECT_URI must be added to your [app settings](https://developer.spotify.com/dashboard/applications)
    OPTIONAL
    // in development environment for debug output
    export FLASK_ENV=development
    // so that you can invoke the app outside of the file's directory include
    export FLASK_APP=/path/to/spotipy/examples/app.py

    // on Windows, use `SET` instead of `export`
Run app.py
    python3 -m flask run --port=8080
    NOTE: If receiving "port already in use" error, try other ports: 5000, 8090, 8888, etc...
        (will need to be updated in your Spotify app and SPOTIPY_REDIRECT_URI variable)
"""

import os
from flask import Flask, jsonify, session, request, redirect, render_template, flash, url_for, send_from_directory
import numpy
from werkzeug.utils import secure_filename
from flask_session import Session
from ClassificationPkg import getClassification
from db import getMIDIfromBeatID, getFeaturesFromBeatID
from SpotifyFeatures import SpotifyFeatures, getMidpoint
import spotipy
import uuid
import pathlib

# upload file parameters
UPLOAD_FOLDER = 'MIDIuploaded'
INTERPOLATION_FOLDER = 'MIDIuploaded/interpolations'
ALLOWED_EXTENSIONS = {'wav', 'aiff', 'caf', 'flac', 'mp3', 'mid'}


# upload file format control
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# path to session cache
def session_cache_path():
    return caches_folder + session.get('uuid')


# flask initialization?
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  #

projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

caches_folder = './.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)


# the main page is the login page
@app.route('/')
def index():
    return render_template("index.html")


@app.route('/playlists')
def playlists():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user_playlists()


@app.route('/currently_playing')
def currently_playing():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    track = spotify.current_user_playing_track()
    if not track is None:
        return track
    return "No track currently playing."


@app.route('/home/')
def home():
    return render_template("index.html")

@app.route('/featureSelection')
def featureSelection():
    return render_template("FeaturesRecap.html")
    

@app.route('/DAW/')
def MIDI_player():
    return render_template("DAW.html")


@app.route('/community')
def communityPage():
    return render_template('community.html')


@app.route('/fileUpload', methods=['POST'])
def fileUpload():
    if request.method == 'POST':
        # checks the file's origin form
        if 'fileInput' not in request.files:
            flash('No file part')
            return redirect(url_for('.communityPage', result=-2))

        file = request.files['fileInput']
        artistName = request.form['artist_name']
        beatName = request.form['beat_name']
        artistPage = request.form['artist_page']

        if file.filename == '':
            flash('No selected file')
            return redirect(url_for('.communityPage', result=-2))

        if file and allowed_file(file.filename):
            print("file allowed")
            filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            # write file containing beat info
            with open(UPLOAD_FOLDER + '/' + artistName + '_' + beatName + '.txt', 'w') as f:
                f.write(
                    'artist :' + artistName + '\n' + 'beatName :' + beatName + '\n' + 'artist link :'
                    + artistPage + "\n" + 'path :' + os.path.join(UPLOAD_FOLDER, filename))
            # to open uploaded file
            # return redirect(url_for('uploaded_file', filename=filename));
            return redirect(url_for('.index', result=1))


@app.route('/playlistForm')
def playlistForm():
    playlist_url = request.args.get("playlist_url")
    if playlist_url.startswith('spotify:playlist:'):
        beatID = getClassification(playlist_url)
        features = getFeaturesFromBeatID(beatID)

        return redirect(url_for('.featureSelection', energy = features[0], valence = features[1], danceability = features[2], mode = features[3], beatID = beatID))

    return redirect(url_for('.index', result=-1))


#è necessario passare beatID a openDaw per ricavare i midi, openDAW chiamata da featuresRecap 

@app.route('/openDAW')
def openDaw():
    
    energy = int(request.args.get("Energy"))/100
    valence = int(request.args.get("Valence"))/100
    danceability = int(request.args.get("Danceability"))/100
    mode = int(request.args.get("Mode"))/100

    # dalle features vogliamo getSongID
    
    midpoint = numpy.array([energy, valence, 120, danceability, mode])
    beatID = getClassification(midpoint = midpoint)

    messages = getMIDIfromBeatID(beatID)
    return render_template('DAW.html', harmonyPath=str(messages[0]), drumsPath=str(messages[1]))

@app.route('/current_user')
def current_user():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user()


@app.route('/interpolationUploader/<beatName>', methods=['POST'])
def interpolationUploader(beatName):
    # f = request.files['file']
    f = request.data
    if request.method == 'POST' and f:
        newFile = open(os.path.join(INTERPOLATION_FOLDER, beatName), "wb")
        # write to file
        for byte in f:
            newFile.write(byte.to_bytes(1, byteorder='big'))
        # f.save(os.path.join(INTERPOLATION_FOLDER, "test.mid"))
        return 'file uploaded successfully'


'''
Following lines allow application to be run more conveniently with
`python backend.py` (Make sure you're using python3)
(Also includes directive to leverage pythons threading capacity.)
'''
if __name__ == '__main__':
    app.run(threaded=True, port=int(os.environ.get("PORT", 8080)))
