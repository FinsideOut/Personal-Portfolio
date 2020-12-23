const bookScreen = document.getElementById("book-screen");
const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
const bookTextRight = document.querySelectorAll(".book-text-right");
const bookTextLeft = document.querySelectorAll(".book-text-left");

const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const contact = document.getElementById("contact");
const logo = document.getElementById("logo-home");
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("HEAD")[0];

const bookBg = document.getElementById("book-bg");
let percent = [];
const num = 100;
for (let i = 0; i < num; i++) {
  const elementLeft = document.createElement("style");
  const elementRight = document.createElement("style");

  let shiftLeft = Math.cos(i * 0.05) * 1.5 + "rem";
  let tiltLeft = Math.sin(i * 0.05) * -15 + "deg";

  let shiftRight = Math.cos(i * 0.05 - 180) * 1.5 + "rem";
  let tiltRight = Math.sin(i * 0.05 - 180) * -15 + "deg";
  elementLeft.innerHTML =
    ".left-curve" +
    i +
    "{transform:translateY(" +
    shiftLeft +
    ") rotate(" +
    tiltLeft +
    ") !important;}";
  elementRight.innerHTML = `.right-curve${i}{transform:translateY(${shiftRight}) rotate(${tiltRight}) !important;}`;
  header.appendChild(elementLeft);
  header.appendChild(elementRight);
  calcWidth();
}
//wrap each letter in span
bookText.forEach((el) => {
  let txt = el.innerText;
  let newTxt = txt.replace(/\S/g, function (c) {
    return "<span>" + c + "</span>";
  });
  let splitWords = newTxt.split(" ");
  for (let i = 0; i < splitWords.length; i++) {
    splitWords[i] = "<div class = 'word'>" + splitWords[i] + "</div>";
  }
  el.innerHTML = splitWords.join(" ");
});

//create classes relative to x position on page

//apply relevant class to each letter span on page
function addCurve() {
  calcWidth();
  bookText.forEach((line) => {
    let words = line.childNodes;
    words.forEach((word) => {
      letters = word.childNodes;
      for (let i = 0; i < letters.length; i++) {
        letterPosRel = letters[i].offsetLeft + letters[i].offsetWidth / 2;
        letterPosAbso = letters[i].getBoundingClientRect().left;
        for (let j = 0; j < percent.length; j++) {
          if (letterPosRel >= percent[j] && letterPosRel <= percent[j + 1]) {
            if (line.classList.contains("book-text-left")) {
              letters[i].classList.add("left-curve" + j);
            } else if (line.classList.contains("book-text-right")) {
              letters[i].classList.add("right-curve" + j);
            }
          }
        }
      }
    });
  });
}
function removeCurve() {
  bookText.forEach((line) => {
    let words = line.childNodes;
    words.forEach((word) => {
      letters = word.childNodes;
      for (let i = 0; i < letters.length; i++) {
        letters[i].className = "";
      }
    });
  });
}
let showBook = true;
let fired = 0;
const lead = document.getElementById("lead");
const aspiring = document.getElementById("aspiring");
const educator = document.getElementById("educator");
const engineer = document.getElementById("engineer");
const musician = document.getElementById("musician");
const services = document.getElementById("services");
const work = document.getElementById("work");
const cv = document.getElementById("cv");
logo.classList.add("transition");
lead.classList.add("transition");
educator.classList.add("transition");
engineer.classList.add("transition");
musician.classList.add("transition");
services.classList.add("transition");
aspiring.classList.add("transition");
work.classList.add("transition");
cv.classList.add("transition");
addCurve();

function homeScreen() {
  console.log("home");
  // logo.classList.remove("shifted-down");
  lead.classList.remove("lead-full");
  aspiring.classList.remove("aspiring");
  educator.classList.remove("educator-full");
  engineer.classList.remove("engineer-full");
  musician.classList.remove("musician-full");
  services.classList.remove("services-full");
  work.classList.remove("work-full");
  cv.classList.remove("cv-full");
  bookPageRight.addEventListener("transitionend", revert);
}
function revert() {
  console.log("revert");
  bookPageLeft.classList.remove("page-to-center");
  bookPageRight.classList.remove("page-to-down");
  bookBg.classList.remove("book-bg-zoom");
  body.classList.remove("body-zoomed");
  contact.classList.remove("hidden");
  addCurve();
  bookPageRight.removeEventListener("transitionend", revert);
}
function fullScreen() {
  console.log("full");
  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-down");
  bookBg.classList.add("book-bg-zoom");
  body.classList.add("body-zoomed");
  contact.classList.add("hidden");
  removeCurve();
  bookPageLeft.addEventListener("transitionend", shift);
}
function shift() {
  bookPageLeft.removeEventListener("transitionend", shift);
  lead.classList.add("lead-full");
  aspiring.classList.add("aspiring-full");
  educator.classList.add("educator-full");
  engineer.classList.add("engineer-full");
  musician.classList.add("musician-full");
  services.classList.add("services-full");
  work.classList.add("work-full");
  cv.classList.add("cv-full");
}
// state transition
bookPageRight.onclick = () => {
  changeState();
};
logo.onclick = () => {
  changeState();
};

function changeState() {
  if (showBook) {
    fullScreen();
  } else if (!showBook) {
    homeScreen();
  }
  showBook = !showBook;
}

function calcWidth() {
  for (let i = 0; i < num; i++) {
    percent.push((bookPageLeft.offsetWidth / num) * [i]);
  }
}
