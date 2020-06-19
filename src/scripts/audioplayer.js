/* eslint-disable no-undef */

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

const audioplayer1 = new Audioplayer(document.querySelector('.playlist'));

console.log(audioplayer1);
