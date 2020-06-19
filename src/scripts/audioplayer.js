/* eslint-disable no-undef */

class Audioplayer {
  constructor(data) {
    this.data = data;
    this.items = data.querySelectorAll('.playlist__item');
    this.songs = [];

    this.items.forEach((item, index) => {
      this.songs[index] = new Howl({
        src: [item.getAttribute('[data-js-source]')],
      });

      item.addEventListener('click', this.play(index));
    });
  }

  init() {

  }

  play(songID) {
    this.songs[songID].play();
  }

  stop(songID) {
    this.songs[songID].stop();
  }
}

const audioplayer1 = new Audioplayer(document.querySelector('.playlist'));

console.log(audioplayer1);