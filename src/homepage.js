"use strict";

let baseURL = "http://localhost:3000/artworks";

const artContainerKey = document.getElementById("art-container");
const evenColumnKey = document.getElementById("even");
const oddColumnKey = document.getElementById("odd");

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});

function loadContent() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((artPiece, i) => {
        imageGenerator(artPiece, i);
      });
    });
}

function imageGenerator(artPiece, i) {
  let image = document.createElement("img");
  image.src = artPiece.img_url;

  if (i % 2 == 0) {
    evenColumnKey.append(image);
  } else {
    oddColumnKey.append(image);
  }
}
