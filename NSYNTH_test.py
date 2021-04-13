#@title Install

#@markdown Install magenta, define some helper functions, and download the model. This transfers a lot of data and _should take a minute or two_.

# Install Magenta
print('Copying data from GCS...')


# Get default MIDI (Bach Prelude)

MIDI_SONG_DEFAULT = '/Users/PilvioSol/Desktop/TheOllator/content/gansynth/midi/bach.mid'

MIDI_RIFF_DEFAULT = '/Users/PilvioSol/Desktop/TheOllator/content/gansynth/midi/riff-default.mid'


import os
from google.colab import files
import librosa
from magenta.models.nsynth.utils import load_audio
from magenta.models.gansynth.lib import flags as lib_flags
from magenta.models.gansynth.lib import generate_util as gu
from magenta.models.gansynth.lib import model as lib_model
from magenta.models.gansynth.lib import util
import matplotlib.pyplot as plt
import note_seq
from note_seq.notebook_utils import colab_play as play
import numpy as np
import tensorflow.compat.v1 as tf

tf.disable_v2_behavior()

# File IO
download = files.download

def upload():
  '''Upload a .wav file.'''
  filemap = files.upload()
  file_list = []
  for key, value in filemap.iteritems():
    fname = os.path.join('/content/gansynth/midi', key)
    with open(fname, 'w') as f:
      f.write(value)
      print('Writing {}'.format(fname))
    file_list.append(fname)
  return file_list

# GLOBALS
CKPT_DIR = 'gs://magentadata/models/gansynth/acoustic_only'
output_dir = '/content/gansynth/samples'
BATCH_SIZE = 16
SR = 16000

# Make an output directory if it doesn't exist
OUTPUT_DIR = util.expand_path(output_dir)
if not tf.gfile.Exists(OUTPUT_DIR):
  tf.gfile.MakeDirs(OUTPUT_DIR)

# Load the model
tf.reset_default_graph()
flags = lib_flags.Flags({
    'batch_size_schedule': [BATCH_SIZE],
    'tfds_data_dir': "gs://tfds-data/datasets",
})
model = lib_model.Model.load_from_path(CKPT_DIR, flags)

# Helper functions
def load_midi(midi_path, min_pitch=36, max_pitch=84):
  """Load midi as a notesequence."""
  midi_path = util.expand_path(midi_path)
  ns = note_seq.midi_file_to_sequence_proto(midi_path)
  pitches = np.array([n.pitch for n in ns.notes])
  velocities = np.array([n.velocity for n in ns.notes])
  start_times = np.array([n.start_time for n in ns.notes])
  end_times = np.array([n.end_time for n in ns.notes])
  valid = np.logical_and(pitches >= min_pitch, pitches <= max_pitch)
  notes = {'pitches': pitches[valid],
           'velocities': velocities[valid],
           'start_times': start_times[valid],
           'end_times': end_times[valid]}
  return ns, notes

def get_envelope(t_note_length, t_attack=0.010, t_release=0.3, sr=16000):
  """Create an attack sustain release amplitude envelope."""
  t_note_length = min(t_note_length, 3.0)
  i_attack = int(sr * t_attack)
  i_sustain = int(sr * t_note_length)
  i_release = int(sr * t_release)
  i_tot = i_sustain + i_release  # attack envelope doesn't add to sound length
  envelope = np.ones(i_tot)
  # Linear attack
  envelope[:i_attack] = np.linspace(0.0, 1.0, i_attack)
  # Linear release
  envelope[i_sustain:i_tot] = np.linspace(1.0, 0.0, i_release)
  return envelope

def combine_notes(audio_notes, start_times, end_times, velocities, sr=16000):
  """Combine audio from multiple notes into a single audio clip.

  Args:
    audio_notes: Array of audio [n_notes, audio_samples].
    start_times: Array of note starts in seconds [n_notes].
    end_times: Array of note ends in seconds [n_notes].
    sr: Integer, sample rate.

  Returns:
    audio_clip: Array of combined audio clip [audio_samples]
  """
  n_notes = len(audio_notes)
  clip_length = end_times.max() + 3.0
  audio_clip = np.zeros(int(clip_length) * sr)

  for t_start, t_end, vel, i in zip(start_times, end_times, velocities, range(n_notes)):
    # Generate an amplitude envelope
    t_note_length = t_end - t_start
    envelope = get_envelope(t_note_length)
    length = len(envelope)
    audio_note = audio_notes[i, :length] * envelope
    # Normalize
    audio_note /= audio_note.max()
    audio_note *= (vel / 127.0)
    # Add to clip buffer
    clip_start = int(t_start * sr)
    clip_end = clip_start + length
    audio_clip[clip_start:clip_end] += audio_note

  # Normalize
  audio_clip /= audio_clip.max()
  audio_clip /= 2.0
  return audio_clip

# Plotting tools
def specplot(audio_clip):
  p_min = np.min(36)
  p_max = np.max(84)
  f_min = librosa.midi_to_hz(p_min)
  f_max = 2 * librosa.midi_to_hz(p_max)
  octaves = int(np.ceil(np.log2(f_max) - np.log2(f_min)))
  bins_per_octave = 36
  n_bins = int(bins_per_octave * octaves)
  C = librosa.cqt(audio_clip, sr=SR, hop_length=2048, fmin=f_min, n_bins=n_bins, bins_per_octave=bins_per_octave)
  power = 10 * np.log10(np.abs(C)**2 + 1e-6)
  plt.matshow(power[::-1, 2:-2], aspect='auto', cmap=plt.cm.magma)
  plt.yticks([])
  plt.xticks([])

print('And...... Done!')





#@title Choose a MIDI file

#@markdown Upload a MIDI file _(.mid, single instrument)_ for audio synthesis, or use the provided default. You can find lots of free MIDI files [online](http://www.midiworld.com/files/).

midi_file = "Bach Prelude (Default)" #@param ["Bach Prelude (Default)", "Upload your own"]

midi_path = MIDI_SONG_DEFAULT
if midi_file == "Upload your own":
  try:
    file_list = upload()
    midi_path = file_list[0]
  except Exception as e:
    print('Upload Cancelled')

ns, notes = load_midi(midi_path)
print('Loaded {}'.format(midi_path))
note_seq.plot_sequence(ns)




#@title Generate random interpolation 🎵
#@markdown Select the number of seconds to take in interpolating between each random instrument. Larger numbers will have slower and smoother interpolations.

seconds_per_instrument = 5 #@param {type:"slider", min:1, max:10, step:1}

#@markdown This cell plays and displays a [Constant-Q spectrogram](https://en.wikipedia.org/wiki/Constant-Q_transform) of the synthesized audio.

# Distribute latent vectors linearly in time
z_instruments, t_instruments = gu.get_random_instruments(
    model, notes['end_times'][-1], secs_per_instrument=seconds_per_instrument)

# Get latent vectors for each note
z_notes = gu.get_z_notes(notes['start_times'], z_instruments, t_instruments)

# Generate audio for each note
print('Generating {} samples...'.format(len(z_notes)))
audio_notes = model.generate_samples_from_z(z_notes, notes['pitches'])

# Make a single audio clip
audio_clip = combine_notes(audio_notes,
                           notes['start_times'],
                           notes['end_times'],
                           notes['velocities'])

# Play the audio
print('\nAudio:')
play(audio_clip, sample_rate=SR)
print('CQT Spectrogram:')
specplot(audio_clip)