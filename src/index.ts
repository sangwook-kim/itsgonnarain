const audioContext = new AudioContext();

fetch('laugh.mp3')
.then(res => res.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => console.log('Decoded', audioBuffer))
.catch(e => console.error(e));
