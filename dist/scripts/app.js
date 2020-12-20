const bookScreen = document.getElementById("book-screen");
const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
const bookTextRight = document.querySelectorAll(".book-text-right");
const bookTextLeft = document.querySelectorAll(".book-text-left");

const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const bookBg = document.getElementById("book-bg");
const conntact = document.getElementById("contact");
const body = document.getElementsByTagName("body")[0];

bookScreen.onclick = () => {
  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-down");
  bookBg.classList.add("book-bg-zoom");
  body.classList.add("body-zoomed");
  conntact.classList.add("hidden");
};

bookText.forEach((line) => {
  let txt = line.innerText;
  let newTxt = txt.replace(/\w/g, function (c) {
    return "<span>" + c + "</span>";
  });
  line.innerHTML = newTxt;
});

bookTextRight.forEach((line) => {
  let spans = line.children;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].offsetLeft > percents[5]) {
      spans[i].classList.add("blue");
    }
  }
});

bookTextLeft.forEach((line) => {
  let spans = line.children;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].offsetLeft < percents[5]) {
      spans[i].classList.add("red");
      // console.log(spans[0].offsetLeft + spans[0].innerText);
    }
  }
});

window.onclick = () => {
  bookText.forEach((line) => {
    let spans = line.children;
    for (let i = 0; i < spans.length; i++) {
      span = spans[i];
      span.removeAttribute("class");
    }
  });
};
