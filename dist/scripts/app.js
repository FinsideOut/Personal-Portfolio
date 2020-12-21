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

//wrap each letter in span
bookText.forEach((line) => {
  let txt = line.innerText;
  let newTxt = txt.replace(/\S/g, function (c) {
    return "<span>" + c + "</span>";
  });
  line.innerHTML = newTxt;
});

//create classes relative to x position on page
let percent = [];
const num = 100;
for (let i = 0; i < num; i++) {
  percent.push((bookPageLeft.offsetWidth / num) * [i]);
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
  elementRight.innerHTML =
    ".right-curve" +
    i +
    "{transform:translateY(" +
    shiftRight +
    ") rotate(" +
    tiltRight +
    ") !important;}";
  header.appendChild(elementLeft);
  header.appendChild(elementRight);
}

//apply relevant class to each letter span on page
function addCurve() {
  bookTextRight.forEach((line) => {
    let spans = line.children;
    for (let i = 0; i < spans.length; i++) {
      for (let j = 0; j < percent.length; j++) {
        if (
          spans[i].offsetLeft + spans[i].offsetWidth / 2 >= percent[j] &&
          spans[i].offsetLeft + spans[i].offsetWidth / 2 <= percent[j + 1]
        ) {
          // let rightAdjust = 50 - j;
          spans[i].classList.add("right-curve" + j);
        }
      }
    }
  });

  bookTextLeft.forEach((line) => {
    let spans = line.children;
    for (let i = 0; i < spans.length; i++) {
      for (let j = 0; j < percent.length; j++) {
        if (
          spans[i].offsetLeft + spans[i].offsetWidth / 2 >= percent[j] &&
          spans[i].offsetLeft + spans[i].offsetWidth / 2 <= percent[j + 1]
        ) {
          spans[i].classList.add("left-curve" + j);
        }
      }
    }
  });
}
addCurve();
// state transition
bookPageRight.onclick = () => {
  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-down");
  bookBg.classList.add("book-bg-zoom");
  body.classList.add("body-zoomed");
  contact.classList.add("hidden");
  bookText.forEach((line) => {
    let spans = line.children;
    for (let i = 0; i < spans.length; i++) {
      spans[i].className = "";
    }
  });
};
logo.onclick = () => {
  bookPageLeft.classList.remove("page-to-center");
  bookPageRight.classList.remove("page-to-down");
  bookBg.classList.remove("book-bg-zoom");
  body.classList.remove("body-zoomed");
  contact.classList.remove("hidden");
  addCurve();
};
