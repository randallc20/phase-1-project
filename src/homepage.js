"use strict";
const newPaintingButton = document.getElementById("add-new-painting");
const newPaintingContainer = document.getElementById("submit-painting-form");

let addPainting = false;

//testing 

let baseURL = "http://localhost:3000/artworks";

const artContainerKey = document.getElementById("art-container");
const evenA = document.getElementById("even-a");
const oddA = document.getElementById("odd-a");
const evenB = document.getElementById("even-b");
const oddB = document.getElementById("odd-b");

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
  let image = document.createElement("img");
  image.src = artPiece.img_url;

  if (i % 2 == 0 && i < 50) {
    evenA.append(image);
  } else if (i % 2 == 0 && i > 51) {
    evenB.append(image);
  } else if (i % 2 != 0 && i < 50) {
    oddA.append(image);
  } else {
    oddB.append(image);
  }
}
