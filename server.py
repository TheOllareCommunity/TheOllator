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
from flask import Flask, session, request, redirect, render_template,flash, url_for
from werkzeug.utils import secure_filename
from flask_session import Session
from ClassificationPkg import getClassification
import spotipy
import uuid
import pathlib



# upload file parameters
UPLOAD_FOLDER = '/home/OLLAREGANG/beats'
ALLOWED_EXTENSIONS = {'wav', 'aiff', 'caf', 'flac', 'mp3'}

# upload file format control
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#path to session cache
def session_cache_path():
    return caches_folder + session.get('uuid')

#flask initialization?
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER #

os.environ['SPOTIPY_CLIENT_ID'] = '7ce43cbf9883427e84fa7581dbac0f83'
os.environ['SPOTIPY_CLIENT_SECRET'] = 'b60c4489024d403c911865b67d264d88'
os.environ['SPOTIPY_REDIRECT_URI'] = 'https://OLLAREGANG.pythonanywhere.com/bella/'
os.environ['FLASK_ENV'] = 'development'
projectPath = pathlib.Path(__file__).parent.absolute()  # get path of the project
os.environ['FLASK_APP'] = '/home/OLLAREGANG/mysite/server.py'

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
    return render_template("login.html")


# server method to actually do the login with spotify
@app.route('/login')
def login():
    if not session.get('uuid'):
        # Step 1. Visitor is unknown, give random ID
        session['uuid'] = str(uuid.uuid4())

    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-currently-playing playlist-modify-private',
                                               cache_path=session_cache_path(),
                                               show_dialog=True)

    if request.args.get("code"):
        # Step 3. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    if not auth_manager.get_cached_token():
        # Step 2. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return redirect(auth_url)
        # return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 4. Signed in, display data
    # spotify = spotipy.Spotify(auth_manager=auth_manager)
    # return redirect('/bella')


def sign_out():
    try:
        # Remove the CACHE file (.cache-test) so that a new user can authorize.
        os.remove(session_cache_path())
        session.clear()
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
    return redirect('/')


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


@app.route('/bella/')
def bella():
    return render_template("index.html")


@app.route('/fileUpload', methods=['POST'])
def fileUpload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file', filename=filename));



@app.route('/playlist')
def playlist():
    playlist_url = request.args.get("playlist_url")
    if playlist_url.startswith('spotify:playlist:'):
        songClass = getClassification(playlist_url)
        beat_url = "https://github.com/waddafunk/Rhythmic_Automatic_Composition/blob/main/complete_beats/trapshit" + str(
            songClass) + ".wav?raw=true"
        return redirect(beat_url)

    return "ERROR"


@app.route('/current_user')
def current_user():
    auth_manager = spotipy.oauth2.SpotifyOAuth(cache_path=session_cache_path())
    if not auth_manager.get_cached_token():
        return redirect('/')
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return spotify.current_user()


'''
Following lines allow application to be run more conveniently with
`python backend.py` (Make sure you're using python3)
(Also includes directive to leverage pythons threading capacity.)
'''
if __name__ == '__main__':
    app.run(threaded=True, port=int(os.environ.get("PORT", 8080)))
