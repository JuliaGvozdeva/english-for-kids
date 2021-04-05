import {MainInit} from "./main.js";
import {Mode} from "./pr_cards.js";
import {cards} from "./cards.data.js";

const burgerIcon = document.querySelector(".menu-icon");
const modeButton = document.querySelector(".mode-button");
const modeButtonText = document.querySelector(".mode-text");
const modeButtonIcon = document.querySelector(".mode-icon");
const menuItem = document.querySelectorAll(".menu-item");
const overlay = document.querySelector(".overlay");

burgerIcon.addEventListener("click", function() {
  burgerFunc();
  menuItemListener();
});

overlay.addEventListener("click", function() {
  burgerFunc();
});

modeButton.addEventListener("click", function() {
  changeMode();
});

function burgerFunc() {
  document.querySelector(".menu-icon span").classList.toggle("active");
  document.querySelector(".menu-container").classList.toggle("active");
  overlay.classList.toggle("active");
  burgerIcon.classList.toggle("active");
};

function burgerRemoveFunc() {
  document.querySelector(".menu-icon span").classList.remove("active");
  document.querySelector(".menu-container").classList.remove("active");
  overlay.classList.remove("active");
  burgerIcon.classList.remove("active");
};

function changeMode() {
  modeButton.classList.toggle("play");
  modeButtonIcon.classList.add("active");

  if (!modeButton.classList.contains("play")) {
    burgerIcon.classList.toggle("play");
    menuItem.forEach((item) => {
      item.classList.toggle("play");
    });
    modeButtonText.innerText = "Train";
  } else {
    burgerIcon.classList.toggle("play");
    menuItem.forEach((item) => {
      item.classList.toggle("play");
    });
    modeButtonText.innerText = "Play";
  }

  const hashs = window.location.hash.split("-");
  const id = hashs[hashs.length-1];

  if (window.location.hash.includes("#/category")) {
    changeGameCards(id);
  } else {
    changeCatCardBackground();
  }

  modeButtonIcon.addEventListener("animationend", () => {
    modeButtonIcon.classList.remove("active");
  });
};

function changeGameCards(id) {
  const cardsClass = new Mode(cards);
  cardsClass.cardInit(id);
}

function changeCatCardBackground() {
  document.querySelectorAll(".card-item").forEach((item) => {
    item.classList.toggle("train-active");
    item.classList.toggle("play-active");
  });
}

function menuItemListener() {
  const main = new MainInit();
  const cardsClass = new Mode(cards);

  document.querySelectorAll(".menu-item").forEach((element) => {
    element.addEventListener("click", function() {
      if (element.hasAttribute("category_link")) {
        cardsClass.cardInit(element.parentElement.id);
        document.querySelector(".menu-item.active").classList.remove("active");
        element.classList.add("active");
        burgerRemoveFunc();
      }

      if (element.hasAttribute("main")) {
        document.querySelector(".menu-item.active").classList.remove("active");
        element.classList.add("active");
        main.init();

        if (modeButtonText.innerText === "Play") {
          document.querySelector(".start-overlay").classList.remove("active");
          document.querySelector(".start-play").remove();
        }

        burgerRemoveFunc();
      }
    });
  });
}

export {burgerFunc};

