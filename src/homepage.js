"use strict";

const newPaintingButton = document.getElementById("add-new-painting");
const newPaintingContainer = document.getElementById("submit-painting-form");

let addPainting = false;

//testing

const baseURL = "http://localhost:3000/artworks";

const artContainerKey = document.getElementById("art-container");
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");
const column4 = document.getElementById("column4");

document.addEventListener("DOMContentLoaded", (e) => {
  loadContent();
  newPaintingSubmitListener();

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
  image.src = artPiece.img_url;
  let h6 = document.createElement("h6");
  let b = document.createElement("b");
  let p = document.createElement("p");
  let description = document.createElement("p");
  description.innerText = `${artPiece.description}`;
  let artist =
    artPiece.artist === null
      ? (p.innerText = "Artist Unknown")
      : (p.innerText = `${artPiece.artist}`);

  h6.append(b);
  b.innerText = `${artPiece.art_title}`;

  imageCard.append(image, h6, p);

  if (i % 2 == 0 && i < 50) {
    column1.append(imageCard);
  } else if (i % 2 == 0 && i > 51) {
    column2.append(imageCard);
  } else if (i % 2 != 0 && i < 50) {
    column3.append(imageCard);
  } else {
    column4.append(imageCard);
  }
  startListening(artPiece, image, imageCard, description);
}

function startListening(artPiece, image, imageCard, description) {
  imageCard.addEventListener("click", () => {
    if (imageCard.contains(description)) {
      description.remove();
    } else {
      imageCard.append(description);
    }
  });
}

function newPaintingSubmitListener(){
  document.getElementById("new-painting-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let newPaintingName = document.getElementById("new-artist-name").value
    let newPaintingTitle = document.getElementById("new-painting-title").value
    let newPaintingDescription = document.getElementById("new-painting-description").value
    let newPaintingPrice = document.getElementById("new-painting-price").value
    let newPaintingLink = document.getElementById("new-painting-link").value
    let newPaintingDate = new Date();
    let newPaintingLikes = 0
    let newPainting = {art_title:newPaintingTitle, artist:newPaintingName, date:newPaintingDate, img_url:newPaintingLink,
    description:newPaintingDescription, price:newPaintingPrice, likes:newPaintingLikes}
    postNewPainting(newPainting)
  });
}

function postNewPainting(data={}){
  fetch(baseURL, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }, body: JSON.stringify(data)
}).then(response => response.json()).then(imageGenerator(data));
}