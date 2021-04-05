import {mainCategories} from "./categories.data.js";
import {cards} from "./cards.data.js";
import {Mode} from "./pr_cards.js";

class MainInit {
  constructor() {}

  init() {
    const cards = document.querySelector(".cards-container");
    let id = 0;
    cards.innerHTML = "";

    mainCategories.forEach((element) => {
      const card = document.createElement("a");
      card.classList.add("card-item");
      card.href = "#/category-" + id;
      card.id = id;

      const mode = document.querySelector(".mode-text");
      if (mode.innerText === "Train") {
        if (card.classList.contains("play-active")) {
          card.classList.remove("play-active");
        } else if (!card.classList.contains("train-active")) {
          card.classList.toggle("train-active");
        }
      } else if (mode.innerText === "Play") {
        if (card.classList.contains("train-active")) {
          card.classList.remove("train-active");
        } else if (!card.classList.contains("play-active")) {
          card.classList.toggle("play-active");
        }
      }

      const cardImg = document.createElement("div");
      cardImg.classList.add("card-img");
      const img = document.createElement("img");
      img.src = "/assets/" + element.imgPath;
      cardImg.appendChild(img);

      const cardTitle = document.createElement("div");
      cardTitle.classList.add("card-name");
      cardTitle.innerText = element.name;

      card.appendChild(cardImg);
      card.appendChild(cardTitle);
      cards.appendChild(card);
      id++;
    });

    this.startListener();
  }

  startListener() {
    const cardsClass = new Mode(cards);
    document.querySelectorAll(".card-item").forEach((element) => {
      element.addEventListener("click", function() {
        cardsClass.cardInit(element.id);
        document.querySelector(".menu-item.active").classList.remove("active");
        document.getElementById(element.id).firstChild.classList.add("active");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const main = new MainInit();
  main.init();
});

export {MainInit};

