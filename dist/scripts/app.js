let screenWidth = $(window).width();
let percent30 = Math.floor((screenWidth / 10) * 3);
let percent40 = Math.floor((screenWidth / 10) * 4);
let percent50 = Math.floor(screenWidth / 2);
let percent60 = Math.floor((screenWidth / 10) * 6);
let percent70 = Math.floor((screenWidth / 10) * 7);
let percent80 = Math.floor((screenWidth / 10) * 8);
let percent90 = Math.floor((screenWidth / 10) * 9);

const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
const bookTextRight = document.querySelectorAll(".book-text-right");
const bookTextLeft = document.querySelectorAll(".book-text-left");

const bookScreen = document.getElementById("book-screen");
const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const bookBg = document.getElementById("book-bg");

bookScreen.onclick = () => {
  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-down");
  bookBg.classList.add("book-bg-zoom");
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
    if (getPos(spans[i]).x > percent70) {
      spans[i].classList.add("blue");
    }
  }
});

bookTextLeft.forEach((line) => {
  let spans = line.children;
  for (let i = 0; i < spans.length; i++) {
    if (getPos(spans[i]).x < percent30) {
      spans[i].classList.add("red");
    }
  }
});

window.onclick = () => {
  // console.log("remove");
  bookText.forEach((line) => {
    let spans = line.children;
    // console.log(spans);
    for (let i = 0; i < spans.length; i++) {
      span = spans[i];
      // console.log(span);
      span.removeAttribute("class");
    }
  });
};
// window.onscroll = addCurve();
// // find position of each span
function getPos(el) {
  // needs to be relative to #book screen
  // yay readability
  for (
    var lx = 0, ly = 0;
    el != null;
    lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
  );
  return { x: lx, y: ly };
}
// // https://stackoverflow.com/questions/288699/get-the-position-of-a-div-span-tag
