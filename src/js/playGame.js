import {cards} from "./cards.data.js";

class PlayGame {
  constructor(id) {
    this.cardsDetail = cards;
    this.catId = id;
    this.audioList = this.audioGenerate();
    this.lastAudioList = [];
  };

  audioGenerate() {
    const audio = [];
    this.cardsDetail[this.catId].forEach((element) => {
      audio.push(element.audioSrc);
    });

    return audio;
  }

  newGame() {
    document.querySelector(".start-overlay").classList.remove("active");
    document.querySelector(".start-play").remove();

    this.createRepeateButton();

    const audioPlay = document.getElementById("audio-play");
    audioPlay.play();
    this.repeateAudio();
    this.play();
  };

  audioRandomGenerate() {
    let rnd = Math.floor(Math.random() * Math.floor(this.audioList.length));

    if (this.lastAudioList.length !== this.audioList.length) {
      while (this.lastAudioList.includes(rnd)) {
        rnd = Math.floor(Math.random() * Math.floor(this.audioList.length));
      }
      this.lastAudioList.push(rnd);
      return this.audioList[rnd];
    }
  }

  createRepeateButton() {
    const repeteContainer = document.createElement("div");
    repeteContainer.classList.add("repeate-container");
    const repeateButton = document.createElement("button");
    repeateButton.classList.add("repeate-game");
    repeateButton.innerHTML = "<i class=\"material-icons\">autorenew</i>";
    const audio = document.createElement("audio");
    audio.src = "assets/" + this.audioRandomGenerate();
    audio.id = "audio-play";
    repeteContainer.appendChild(repeateButton);
    repeteContainer.appendChild(audio);
    document.querySelector(".main.wraper").appendChild(repeteContainer);
  }

  repeateAudio() {
    document.querySelector(".repeate-game").addEventListener("click", () => {
      document.getElementById("audio-play").play();
    });
  }

  play() {
    const mode = document.querySelector(".mode-text");
    if (mode.innerText === "Play") {
      document.querySelectorAll(".card-play").forEach((card) => {
        card.addEventListener("click", () => {
          const audio = document.getElementById("audio-play");
          const cardAudio = card.lastChild.src;
          const playAudio = audio.src;
          const attemptaudio = document.getElementById("success-attempt");
          if (cardAudio === playAudio) {
            card.classList.add("victory");
            this.addAttempts(1);
            audio.src = "assets/" + this.audioRandomGenerate();
            attemptaudio.addEventListener("ended", () => {
              if (document.querySelectorAll(".card-play").length != 0) {
                audio.play();
              }
            });
          } else {
            this.addAttempts(0);
          }
        });
      });
    }
  }

  addAttempts(success) {
    const attempts = document.querySelector(".attempts-container");
    const attempt = document.createElement("div");
    attempt.classList.add("attempt");
    if (success) {
      document.getElementById("success-attempt").play();
      attempt.style.backgroundImage = "url(assets/img/star-win.svg)";
      attempt.classList.add("win");
    } else {
      document.getElementById("unsuccess-attempt").play();
      attempt.style.backgroundImage = "url(assets/img/star.svg)";
      attempt.classList.add("over");
    }
    attempts.appendChild(attempt);
    this.showWin();
  }

  showWin() {
    const attempts = document.querySelector(".attempts-container");
    const winCount = document.querySelectorAll(".win").length;
    const overCount = document.querySelectorAll(".over").length;
    const cardContainer = document.querySelector(".cards-container");
    const status = document.createElement("div");
    status.classList.add("game-status");
    const statusImg = document.createElement("img");
    const statusText = document.createElement("span");

    if (winCount === this.cardsDetail[this.catId].length) {
      document.querySelector(".repeate-container").innerHTML = "";
      attempts.innerHTML = "";
      cardContainer.innerHTML = "";
      statusImg.src = "assets/img/success.jpg";
      document.getElementById("win-audio").play();
      statusText.innerText = "This game is yours!";
      status.appendChild(statusImg);
      status.appendChild(statusText);
      cardContainer.appendChild(status);
      setTimeout(()=>{
        window.location = "http://127.0.0.1:5500/";
      }, 3000);
    }

    if (winCount === 8 && overCount > 0) {
      document.querySelector(".repeate-container").innerHTML = "";
      attempts.innerHTML = "";
      cardContainer.innerHTML = "";
      statusImg.src = "assets/img/failure.jpg";
      statusText.innerText = "You lost. Number of wrong answers: " + overCount;
      status.appendChild(statusImg);
      status.appendChild(statusText);
      cardContainer.appendChild(status);
      setTimeout(()=>{
        window.location = "http://127.0.0.1:5500/";
      }, 3000);
    }
  }
}

export {PlayGame};
