"use strict";

const newPaintingButton = document.getElementById("add-new-painting");
const newPaintingContainer = document.getElementById("submit-painting-form");

let addPainting = false;

const baseURL = "http://localhost:3000/artworks";

// Image layout
const artContainerKey = document.getElementById("art-container");
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");
const column4 = document.getElementById("column4");

// On Load - bringing in images, adding event listener to form display
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

// Loading content function
function loadContent() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((artPiece, i) => {
        imageGenerator(artPiece, i);
      });
    });
}

// Sample pagination
// monstersURL + `?_limit=${limit}` + `&_page=${page}`

function imageGenerator(artPiece, i) {
  let imageCard = document.createElement("div");
  // Btn Div elements
  let btnContainer = document.createElement("div");
  let likeBtn = document.createElement("button");
  likeBtn.innerHTML = `Like ❤️`;
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";

  btnContainer.append(likeBtn, deleteBtn);
  // Button listeners
  likeButton(artPiece, likeBtn);
  deleteButton(artPiece, deleteBtn, imageCard);

  // Card production / appending
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

  imageCard.append(image, btnContainer, h6, p);

  // Determines where the card is placed on the page
  if (i % 2 == 0 && i < 50) {
    column1.append(imageCard);
  } else if (i % 2 == 0 && i > 51) {
    column2.append(imageCard);
  } else if (i % 2 != 0 && i < 50) {
    column3.append(imageCard);
  } else {
    column4.append(imageCard);
  }

  // Passes data to the card toggle function
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

// POST new painting function listener
function newPaintingSubmitListener() {
  document
    .getElementById("new-painting-form")
    .addEventListener("submit", (e) => {
      //e.preventDefault();
      let newPaintingName = document.getElementById("new-artist-name").value;
      let newPaintingTitle =
        document.getElementById("new-painting-title").value;
      let newPaintingDescription = document.getElementById(
        "new-painting-description"
      ).value;
      let newPaintingPrice =
        document.getElementById("new-painting-price").value;
      let newPaintingLink = document.getElementById("new-painting-link").value;
      let newPaintingDate = new Date();
      let newPaintingLikes = 0;
      let newPainting = {
        art_title: newPaintingTitle,
        artist: newPaintingName,
        date: newPaintingDate,
        img_url: newPaintingLink,
        description: newPaintingDescription,
        price: newPaintingPrice,
        likes: newPaintingLikes,
      };
      postNewPainting(newPainting);
    });
}
// What posts and appends the new data based on initial response
function postNewPainting(data = {}) {
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(imageGenerator(data));
}

function likeButton(artPiece, likeBtn) {
  likeBtn.addEventListener("click", () => {
    let newLikes = parseInt(artPiece.likes) + 1;
    let data = {
      likes: newLikes,
    };
    // console.log(newLikes);
    fetch(baseURL + `/${artPiece.id}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        likeBtn.innerHTML = newLikes + ' ❤️';
      });
  });
}

function deleteButton(artPiece, deleteBtn, imageCard) {
  let deleteCard = imageCard;
  deleteBtn.addEventListener("click", () => {
    fetch(baseURL + `/${artPiece.id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        deleteCard.remove();
      });
  });
}
