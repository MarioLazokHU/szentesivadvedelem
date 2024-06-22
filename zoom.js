var clicked = false;

function handleClick() {
  if (!clicked) {
    this.classList.add("zoomed");
    clicked = true;
  } else {
    this.classList.remove("zoomed");
    clicked = false;
  }
}

var images = document.querySelectorAll(".gallerypics");
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", handleClick);
}
