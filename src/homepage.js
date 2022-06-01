"use strict";

const newPaintingButton = document.getElementById("add-new-painting");
const newPaintingContainer = document.getElementById("submit-painting-form");

let addPainting = false;

let baseURL = "http://localhost:3000/artworks";

const artContainerKey = document.getElementById("art-container");
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");
const column4 = document.getElementById("column4");

document.addEventListener("DOMContentLoaded", (e) => {
  loadContent();

  e.preventDefault();

  newPaintingButton.addEventListener("click", () => {
    // hide & seek with the form
    addPainting = !addPainting;
    if (addPainting) {
      newPaintingContainer.style.display = "block";
    } else {
      newPaintingContainer.style.display = "none";
    }
  });
});

function loadContent() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((artPiece, i) => {
        imageGenerator(artPiece, i);
      });
    });
}

function imageGenerator(artPiece, i) {
  let imageCard = document.createElement("div");
  imageCard.classList.add("card");

  let image = document.createElement("img");
  let h4 = document.createElement()

  image.src = artPiece.img_url;
  startListening(artPiece, image);

  if (i % 2 == 0 && i < 50) {
    column1.append(image);
  } else if (i % 2 == 0 && i > 51) {
    column2.append(image);
  } else if (i % 2 != 0 && i < 50) {
    column3.append(image);
  } else {
    column4.append(image);
  }
}

function startListening(artPiece, image) {
  image.addEventListener("click", () => {
    console.log(artPiece);
  });
}
