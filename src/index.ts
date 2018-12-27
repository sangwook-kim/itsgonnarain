const audioContext = new AudioContext();
const sourceNodes = [ undefined, undefined ];
/*
const sourceNodes = [
  audioContext.createBufferSource(),
  audioContext.createBufferSource(),
];
*/
let audiobuffer;

const $playBtn = <HTMLInputElement> document.querySelector('.play');
const $stopBtn = <HTMLInputElement> document.querySelector('.stop');

const loopstart = 4.98;
const loopend = 7.93;
const playbackrate = 1.004;

const init = () => {
  loadSource();
  initEvents();
};

const initEvents = () => {
  $playBtn.addEventListener('click', () => {
    // play
    sourceNodes.forEach((sourceNode, i) => {
      runSystem(i);
    });
    $playBtn.disabled = true;
    $stopBtn.disabled = false;
  });

  $stopBtn.addEventListener('click', () => {
    // stop
    sourceNodes.forEach(sourceNode => {
      sourceNode.stop();
    });
    $playBtn.disabled = false;
    $stopBtn.disabled = true;
  });
};

const loadSource = () => {
  fetch('laugh.mp3')
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    onLoadSource(audioBuffer);
  })
  .catch(e => console.error(e));
};

const onLoadSource = (audioBuffer) => {
  audiobuffer = audioBuffer;
  $playBtn.disabled = false;
};

const runSystem = (index) => {
  sourceNodes[index] = audioContext.createBufferSource();
  const panNode = audioContext.createStereoPanner();
  sourceNodes[index].loopStart = loopstart;
  sourceNodes[index].loopEnd = loopend;
  sourceNodes[index].loop = true;
  sourceNodes[index].buffer = audiobuffer;

  sourceNodes[index].connect(panNode);
  panNode.connect(audioContext.destination);

  panNode.pan.value = index > 0 ? index : -1;
  sourceNodes[index].playbackRate.value = index > 0 ? playbackrate : 1;
  sourceNodes[index].start(0, loopstart);
}

init();
