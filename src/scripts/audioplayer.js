/* eslint-disable no-undef */

/**
 * fetchData
 *
 * Ruft Daten asynchron von der angegebenen URL ab
 *
 */
async function fetchData(apiURL, parseJSON = true) {
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  let data = null;
  if (parseJSON) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  return data;
}

/**
 * Audio-Player
 */
class Audioplayer {
  constructor(data) {
    this.data = data;
    this.items = data.querySelectorAll('.playlist__item');
    this.songs = [];

    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      this.songs[index] = new Howl({
        src: [item.getAttribute('data-js-source')],
      });

      item.addEventListener('click', () => {
        this.switchState(index);
      });
    });
  }

  switchState(songID) {
    if (this.items[songID].classList.contains('playlist__item--playing')) {
      this.stop(songID);
    } else {
      this.play(songID);
    }
  }

  play(songID) {
    this.songs.forEach((song, id) => {
      this.stop(id);
    });

    this.songs[songID].play();
    this.items[songID].classList.add('playlist__item--playing');
  }

  stop(songID) {
    this.songs[songID].stop();

    this.items[songID].classList.remove('playlist__item--playing');
  }
}

// const audioplayer1 = new Audioplayer(document.querySelector('.playlist'));

// console.log(audioplayer1);


const dataURL = './json/playlist.json';

(async () => {
  const dataContent = await fetchData(dataURL);

  const mustacheElement = document.querySelector('[data-js-playlist-mustache]');
  const templateURL = mustacheElement.getAttribute('data-js-playlist-mustache');
  const dataTemplate = await fetchData(templateURL, false);
  const renderedSection = Mustache.render(dataTemplate, {
    songs: dataContent,
  });
  mustacheElement.innerHTML = renderedSection;

  const playlists = document.querySelectorAll('[data-js-playlist-mustache]');

  console.log(playlists);

  playlists.forEach((playlist) => {
    new Audioplayer(playlist);
  });
})().catch((error) => {
  console.log('error', error);
});
