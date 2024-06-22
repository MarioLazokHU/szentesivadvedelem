let slideIndex = 1;
showSlide(slideIndex);

function nextSlide() {
  showSlide((slideIndex += 1));
}

function prevSlide() {
  showSlide((slideIndex -= 1));
}

function showSlide(n) {
  let slides = document.getElementsByClassName("fb-video");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}