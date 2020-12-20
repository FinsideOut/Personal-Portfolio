const bookScreen = document.getElementById("book-screen");
const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
const bookTextRight = document.querySelectorAll(".book-text-right");
const bookTextLeft = document.querySelectorAll(".book-text-left");

const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const conntact = document.getElementById("contact");
const body = document.getElementsByTagName("body")[0];

const bookBg = document.getElementById("book-bg");

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

// bookTextRight.forEach((line) => {
//   let spans = line.children;
//   for (let i = 0; i < spans.length; i++) {
//     if (spans[i].offsetLeft > percents[5]) {
//       spans[i].classList.add("blue");
//     }
//   }
// });
const test = bookPageLeft.offsetWidth / 3;
bookTextLeft.forEach((line) => {
  let spans = line.children;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].offsetLeft < test) {
      spans[i].classList.add("red");
    }
  }
});
const test2 = bookPageRight.offsetWidth / 3;
bookTextRight.forEach((line) => {
  let spans = line.children;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].offsetLeft > test2) {
      spans[i].classList.add("blue");
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
