
export default function initPlayer(playerWrapper) {
  const audio = playerWrapper.querySelector('.bird__audio');
  const duration = playerWrapper.querySelector('.duration')
  const sliderAudio = playerWrapper.querySelector('.timebar__line')
  const currentTime = playerWrapper.querySelector('.current-time')
  const btnPlay = playerWrapper.querySelector('.audio-player__button')
  const btnVolume = playerWrapper.querySelector('.btn-volume')
  const volumeSlider = playerWrapper.querySelector('.volume-slider')
  const progress = playerWrapper.querySelector('.timebar__progress')

  let playState = 'play';
  let muteState = 'unmute';

  audioEvent(audio)
  sliderEvent(sliderAudio)
  playAudio(btnPlay)
  muteAudio(btnVolume)
  sliderEvent(sliderAudio)
  changeVolume(volumeSlider)

  // uptade audio time
  setInterval(() => {
    currentTime.textContent = convertTime(audio.currentTime)
    progress.style.width = audio.currentTime / audio.duration * 100 + "%";
  }, 500);

  function audioEvent(elem) {
    elem.addEventListener('loadedmetadata', () => {
      showDuration()
    });
    elem.addEventListener('timeupdate', () => {
      sliderAudio.value = Math.floor(audio.currentTime);
    })

    if (audio.readyState > 0) {
      showDuration();
      setEndSleder()
    } else {
      audio.addEventListener('loadedmetadata', () => {
        showDuration();
        setEndSleder()
      })
    }
  }

  function sliderEvent(elem) {
    elem.addEventListener('input', () => {
      currentTime.textContent = convertTime(sliderAudio.value);
    })

    elem.addEventListener('change', () => {
      audio.currentTime = sliderAudio.value;
    })

    elem.addEventListener('click', e => {
      const sliderWidth = window.getComputedStyle(sliderAudio).width
      const timeToSeek = e.offsetX / parseInt(sliderWidth) * audio.duration
      audio.currentTime = timeToSeek
    }, false)
  }

  function convertTime(secs) {
    const min = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    const returnedSec = sec < 10 ? `0${sec}` : `${sec}`;
    return `0${min}:${returnedSec}`;
  }

  function showDuration() {
    duration.textContent = convertTime(audio.duration);
  }

  function setEndSleder() {
    sliderAudio.max = Math.floor(audio.duration);
  }
  //mute audio
  function muteAudio(btn) {
    btn.addEventListener('click', () => {
      if (muteState === 'unmute') {
        audio.muted = true;
        muteState = 'mute';
        btnVolume.firstElementChild.classList.toggle('active')
        btnVolume.lastElementChild.classList.toggle('active')
      } else {
        audio.muted = false;
        muteState = 'unmute';
        btnVolume.firstElementChild.classList.toggle('active')
        btnVolume.lastElementChild.classList.toggle('active')
      }
    })
  }

  // play audio
  function playAudio(btn) {
    btn.addEventListener('click', () => {
      if (playState === 'play') {
        audio.play();
        playState = 'pause';
        btn.firstElementChild.classList.toggle('pause')
        btn.lastElementChild.classList.toggle('pres')
      } else {
        playState = 'play';
        audio.pause()
        btn.firstElementChild.classList.toggle('pause')
        btn.lastElementChild.classList.toggle('pres')
      }
    })
  }

  //change volume
  function changeVolume(slider) {
    slider.addEventListener("change", function (e) {
      audio.volume = e.currentTarget.value / 100;
    })

  }
}