# Online version of the application
[OLLAREGANG.pythonanywhere.com](https://OLLAREGANG.pythonanywhere.com)


# The Ollator - overview
The Ollator is a full stack system which allows singers or rap / hip hop music fans to quickly get a beat for their music projects or just for fun. The idea of The Ollator is to give the possibility to the user to get a beat that resembles his/her taste exploting a machine learning algorithm with low effort. The user can create a playlist of songs that he/she likes on Spotify, upload the URI of that into the main page of The Ollator, let the system perform the operations needed to get the most similar beat and play with its parameter through the Graphical User Interface.
 
 
# How to use it
To get the URI link just go to the "share" option of a playlist and select "Copy URI Spotify" (make sure to press "alt" to make the "copy URI" option available):
<img width="926" alt="URI" src="https://user-images.githubusercontent.com/57909529/118052315-ceb4ae00-b382-11eb-82f2-01cb7b61a035.png">


Then just upload the link in the box and click "Submit"
<img width="1440" alt="Home" src="https://user-images.githubusercontent.com/57909529/118052361-df652400-b382-11eb-9a1a-0861c9db0124.png">

 

# Dataset and Database
The beats proposed by the system are, at now, entirely produced by us (see future developments for incoming implementations). The dataset consists in 100 beats derived from 10 beats whose harmonic and percussive splits are re-combined and exported. The beats are then uploaded on Spotify in order to extract the features to make the mapping with the midpoint of the playlist loaded from the user (better explained in next section). The beats are listenable at the playlist https://open.spotify.com/playlist/1Rd3nbOXI3Jlui4lmv4GGH?si=bee6acfc62b6497e.
As protocol for music information we used the wel known MIDI. Since the beats will be splitted in percussive and harmonic parts, in the making of the beats we divided each one in 4 midi files: drum.mid, harmony.mid, melody.mid and bass.mid. Every midi file is saved in our database in order to be selected in the re-synthesis section.


# Machine Learning
Spotify for developers gives the permission to access to many audio features for every track present in the database. We exploited them to build our feature space: a multi-dimensional one where each of our 100 beats represent a point. Then we perform the same operation for the songs that compose the playlist loaded by the user and we calculate their "mid-point". The last passage consists in plugging the midpoint inside the feature space populated by our beats and compute the nearest one that is, indeed, the beat that resembles better the entire playlist of the user. Once the nearest beat is found, we query the database for the midi files that constitutes it so that the re-synthesis can be performed and manipulated through the user interface.

# Synthesis and User Interface
In this phase each of the 4 midi file is separately synthesized and controlled with an effect-chain. For this purpose we used [Tone.js](https://tonejs.github.io/) library that permits us to use a wide variety of synthetic instrument such as oscillators, sampler, .. and effects such as distortion, chorus, LFOs,..
<img width="1440" alt="NEWGUI" src="https://user-images.githubusercontent.com/57909529/122616101-0b627c00-d08a-11eb-8248-a5b48a7be5f6.png">

The User Interface is vertically divided in the four components of each beat. Each division has a module made up of a 2D pad and five knobs. The user can play with them finding out the effect of each knob or pad and discovering new sounds and combinations. 
At the bottom we have the adjustable BPM, the play/pause button and the trigger of our new implementation explained in a further section "Generative Drums" below in this README. Furthermore we give the opportunity to record the voice over the beat with the dedicated button. Once the user has finished the recording, a pop-up will arise and he/she will have the chance to listen to it and eventually download it.



# Technologies used
The Ollator is made up of several technologies and languages. Following the workflow:
* [Ableton Live](https://www.ableton.com/) for the production of beats;
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for the feature extraction;
* [Python](https://www.python.org/) for the machine learning algorithm and for the re-combination of beats;
* [Python Anywhere](https://www.pythonanywhere.com/) to build the server structure;
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) to manage client-server communication;
* [SQLite](https://www.sqlite.org/index.html) for the database structure;
* [Tone js](https://tonejs.github.io/) for the web audio synthesis and managment;
* [p5.js](https://p5js.org/) to implement processing in javascript.

# Growing Community!
We give the possibility to upload beats in the main page of The Ollator with the aim of creating a community of producers whose beats can be selected to be used (and downloaded / purchased) in the system. With the growing of the community, the dataset will enlarge widening the variance of the beats and carrying the system to better classification results. Furthermore this will give the possibility to producers who upload their tracks to appear in users' searches (the artist's page related to the beat will be mentioned to our users). To do that just fill the form linked to the main page of the Ollator and follow the instructions.
<img width="1440" alt="Upload" src="https://user-images.githubusercontent.com/57909529/118052435-015ea680-b383-11eb-895f-949a47c1e72a.png">


# Generative Drums
Finally our latest feature is out. We implemented a generative algorithm based on Magenta's [MusicVAE](https://magenta.tensorflow.org/music-vae) that can be anbled with the third button placed at bottom right of the GUI. This algorithm trigger a script that starts a drum loop different from the "basic" one or better, that extends the "basic" one interpolating it with another one choosed randomly from our database. The new loop starts identically at the basic one for 2 bars, then starts a 8-bar interpolation from the first drum loop to the second one, 2 bars of the second drum-loop and finally another 8-bars interpolation from the second drum loop to the first one. All this passages repeated along time. This smooth, continuous transition makes the beat lively but pleasent and can be triggered any time the user wants, performing the interpolation with the starting drum loop and every different time with another one within our dataset.



# Future developments
  - Possibility to choose more than one beat to be played. Since the dataset at now consists of 100 beats that are combination of 10 beats, choosing more than one beat to listen/manipulate will lead to similar beats (for example, the 2 nearest beat would probablt have the same harmonic content or the same rithmic content). So this issue is dependent from the previous point. Having a wider dataset will head also to this possibility;
  - Sound improvement. We will improve the sound quality with the implementation of further libraries and sounds;
  - Development of stand-alone application. The audio quality is now bounded with the fact that we are manipulating it via web. With the development of an application we will overcome this issue and also give a more user friendly way of using The Ollator;
  - Within the application: give the possibility to change and costumize effects.

# For Developers: how to use the code
1. clone the repository on your computer
2. open the folder with an editor
3. install all the packages needed
4. run the script "server.py"
5. open the local host on your browser (Chrome is reccomended)
6. have fun!

Or simply go to the online version of the application

[OLLAREGANG.pythonanywhere.com](https://OLLAREGANG.pythonanywhere.com)
 
