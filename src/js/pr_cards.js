import {PlayGame} from "./playGame.js";
import {cards} from "./cards.data.js";

class Mode {
  constructor(cards) {
    this.cards = cards;
  }

  cardInit(id) {
    const mode = document.querySelector(".mode-text");
    const cardContainer = document.querySelector(".cards-container");
    cardContainer.innerHTML = "";

    if (mode.innerText === "Train") {
      if (document.querySelector(".repeate-container")) {
        document.querySelector(".repeate-container").remove();
      }
      this.createTrainCard(id, cardContainer);
      this.setListenerForTrainCard();
    } else if (mode.innerText === "Play") {
      this.createPlayModeCard(id, cardContainer);
      this.createStartButton();
      this.setListenerForPlayCard(id);
    }
  }

  createTrainCard(id, cardContainer) {
    this.cards[id].forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card-train");
      card.setAttribute("data-card-id", item.word);
      card.append(this.createFrontCard(item));
      card.append(this.createBackCard(item));
      cardContainer.appendChild(card);
    });
  }

  createPlayModeCard(id, cardContainer) {
    this.cards[id].forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card-play");
      card.setAttribute("data-card-id", item.word);
      card.append(this.createPlayCard(item));
      cardContainer.appendChild(card);
    });
  }

  createFrontCard(item) {
    const fragment = document.createDocumentFragment();

    const cardFront = document.createElement("div");
    cardFront.classList.add("front");

    const cardImg = document.createElement("div");
    cardImg.classList.add("card-train_img");
    const img = document.createElement("img");
    img.src = "/assets/" + item.image;
    cardImg.appendChild(img);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-name");
    const span = document.createElement("span");
    span.innerText = item.word;
    const audio = document.createElement("audio");
    audio.src = "/assets/" + item.audioSrc;
    cardTitle.appendChild(span);
    cardTitle.appendChild(audio);

    const refresh = document.createElement("div");
    refresh.classList = "refresh-button_word";
    refresh.innerHTML = "<i class=\"material-icons\">autorenew</i>";

    cardFront.appendChild(cardImg);
    cardFront.appendChild(cardTitle);
    cardFront.appendChild(refresh);

    fragment.appendChild(cardFront);
    return fragment;
  }

  createBackCard(item) {
    const fragment = document.createDocumentFragment();

    const cardBack = document.createElement("div");
    cardBack.classList.add("back");

    const cardTitleBack = document.createElement("div");
    cardTitleBack.classList.add("card-name");
    cardTitleBack.innerText = item.translation;

    const cardImgBack = document.createElement("div");
    cardImgBack.classList.add("card-item_img");
    const imgBack = document.createElement("img");
    imgBack.src = "/assets/" + item.image;
    cardImgBack.appendChild(imgBack);

    cardBack.appendChild(cardImgBack);
    cardBack.appendChild(cardTitleBack);

    fragment.appendChild(cardBack);
    return fragment;
  }

  createPlayCard(item) {
    const fragment = document.createDocumentFragment();
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-play_img");
    const img = document.createElement("img");
    img.src = "/assets/" + item.image;
    cardImg.appendChild(img);

    const audio = document.createElement("audio");
    audio.src = "/assets/" + item.audioSrc;

    fragment.appendChild(cardImg);
    fragment.appendChild(audio);
    return fragment;
  }

  createStartButton() {
    const startButton = document.createElement("button");
    startButton.classList.add("start-play");
    startButton.innerText += "Play";
    document.querySelector(".start-overlay").classList.toggle("active");
    document.querySelector(".main.wraper").appendChild(startButton);
  }

  setListenerForPlayCard(id) {
    document.querySelector(".start-play").addEventListener("click", ()=> {
      const playGame = new PlayGame(id);
      playGame.newGame();
    });
  }

  setListenerForTrainCard() {
    document.querySelectorAll(".refresh-button_word").forEach((element) => {
      element.addEventListener("click", function() {
        const trainCard = element.parentElement.parentElement;
        const backCard = element.parentElement.parentElement.lastChild;
        trainCard.classList.add("active");
        backCard.addEventListener("mouseleave", () => {
          trainCard.classList.remove("active");
        });
      });
    });

    document.querySelectorAll(".front").forEach((element) => {
      element.addEventListener("click", function(e) {
        const eClass = e.target.className;
        if (eClass !== "refresh-button_word" && eClass !== "material-icons") {
          const frontChilds = element.childNodes;
          frontChilds.forEach((child) => {
            if (child.className == "card-name") {
              const cardAudio = child.lastChild;
              cardAudio.play();
            }
          });
        }
      });
    });
  }
}

export {Mode};
