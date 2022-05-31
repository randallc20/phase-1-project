"use strict"
const newPaintingButton = document.getElementById("add-new-painting");
const newPaintingContainer = document.getElementById("submit-painting-form");

let addPainting = false;

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    newPaintingButton.addEventListener("click", () => {
        // hide & seek with the form
        addPainting = !addPainting
        if (addPainting) {
          newPaintingContainer.style.display = "block";
        } else {
          newPaintingContainer.style.display = "none";
        }
    });
  });