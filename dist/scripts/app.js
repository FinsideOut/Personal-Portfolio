const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
// const bookTextRight = document.querySelectorAll(".book-text-right");
// const bookTextLeft = document.querySelectorAll(".book-text-left");
const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const contact = document.getElementById("contact");
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("HEAD")[0];
const bookBg = document.getElementById("book-bg");
const logo = document.getElementById("logo-home");
const lead = document.getElementById("lead");
const aspiring = document.getElementById("aspiring");
const educator = document.getElementById("educator");
const engineer = document.getElementById("engineer");
const developer = document.getElementById("developer");
const services = document.getElementById("services");
const work = document.getElementById("work");
const cv = document.getElementById("cv");

const educatorContent = document.getElementById("educator-content");
const content = document.querySelectorAll(".hidden");

// global vars
let percent = [];
const num = 100;
let showBook = true;
let fired = 0;

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

logo.classList.add("transition");
lead.classList.add("transition");
educator.classList.add("transition");
engineer.classList.add("transition");
developer.classList.add("transition");
services.classList.add("transition");
aspiring.classList.add("transition");
work.classList.add("transition");
cv.classList.add("transition");
addCurve();

function homeScreen() {
  console.log("home");
  logo.classList.remove("logo-full");
  lead.classList.remove("lead-full");
  aspiring.classList.remove("aspiring-full");
  educator.classList.remove("educator-full");
  engineer.classList.remove("engineer-full");
  developer.classList.remove("developer-full");
  services.classList.remove("services-full");
  work.classList.remove("work-full");
  cv.classList.remove("cv-full");
  bookPageRight.addEventListener("transitionend", revertToHome);
  content.forEach((section) => {
    section.classList.remove("shown");
  });
}
function revertToHome() {
  bookPageRight.removeEventListener("transitionend", revertToHome);
  bookPageLeft.classList.remove("page-to-center");
  bookPageRight.classList.remove("page-to-down");
  bookBg.classList.remove("book-bg-zoom");
  body.classList.remove("body-zoomed");
  contact.classList.remove("hidden");
  addCurve();
}
function fullScreen() {
  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-down");
  bookBg.classList.add("book-bg-zoom");
  body.classList.add("body-zoomed");
  contact.classList.add("hidden");
  removeCurve();
  bookPageLeft.addEventListener("transitionend", shiftHeaders);
}
function shiftHeaders() {
  bookPageLeft.removeEventListener("transitionend", shiftHeaders);
  logo.classList.add("logo-full");
  lead.classList.add("lead-full");
  aspiring.classList.add("aspiring-full");
  educator.classList.add("educator-full");
  engineer.classList.add("engineer-full");
  developer.classList.add("developer-full");
  services.classList.add("services-full");
  work.classList.add("work-full");
  cv.classList.add("cv-full");
  // bookPageLeft.addEventListener("transitionend", addContent);

  // content.forEach((section) => {
  //   section.classList.add("shown");
  // });
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

//from traversy mdeia
const items = document.querySelectorAll(".hidden");

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight * 2 || document.documentElement.clientHeight * 2) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach((item) => {
    if (!showBook) {
      if (isInViewport(item)) {
        item.classList.add("shown");
      }
    }
  });

window.addEventListener("load", run);
window.addEventListener("resize", run);
window.addEventListener("scroll", run);

educatorIconRight = document.getElementById("educator-icon-right");
educatorIconCenter = document.getElementById("educator-icon-center");
educatorIconLeft = document.getElementById("educator-icon-left");
moreInfoRight = document.getElementById("more-info-right");
moreInfoLeft = document.getElementById("more-info-left");
moreInfoCenterLeft = document.getElementById("more-info-center-left");
moreInfoCenterRight = document.getElementById("more-info-center-right");

educatorIconRight.addEventListener("mouseover", (e) => {
  educatorIconCenter.classList.add("obscure");
  educatorIconLeft.classList.add("obscure");
  moreInfoRight.classList.add("normalize");
});
educatorIconRight.addEventListener("mouseout", (e) => {
  educatorIconCenter.classList.remove("obscure");
  educatorIconLeft.classList.remove("obscure");
  moreInfoRight.classList.remove("normalize");
});

educatorIconLeft.addEventListener("mouseover", (e) => {
  educatorIconCenter.classList.add("obscure");
  educatorIconRight.classList.add("obscure");
  moreInfoLeft.classList.add("normalize");
});
educatorIconLeft.addEventListener("mouseout", (e) => {
  educatorIconCenter.classList.remove("obscure");
  educatorIconRight.classList.remove("obscure");
  moreInfoLeft.classList.remove("normalize");
});
educatorIconCenter.addEventListener("mouseover", (e) => {
  educatorIconLeft.classList.add("obscure");
  educatorIconRight.classList.add("obscure");
  moreInfoCenterLeft.classList.add("normalize");
  moreInfoCenterRight.classList.add("normalize");
});
educatorIconCenter.addEventListener("mouseout", (e) => {
  educatorIconLeft.classList.remove("obscure");
  educatorIconRight.classList.remove("obscure");
  moreInfoCenterLeft.classList.remove("normalize");
  moreInfoCenterRight.classList.remove("normalize");
});

const graphIcons = document.querySelectorAll(".graph-icon");
const graphTexts = document.querySelectorAll(".graph-icon-text");
const graphBgs = document.querySelectorAll(".graph-icon-bg");
const graphTitle = document.querySelector(".graph-title");
const LabelX = document.querySelector(".x-label");
const LabelY = document.querySelector(".y-label");
const graphContent = document.querySelector(".graph-content");
const graphArrowUp = document.querySelector(".up-arrow");
const graphArrowRight = document.querySelector(".right-arrow");
console.log(graphIcons);

graphIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", (e) => {
    e.target.classList.remove("obscure");
    graphTitle.classList.add("obscure");
    LabelX.classList.add("obscure");
    LabelY.classList.add("obscure");
    graphContent.classList.add("obscure-borders");
    graphArrowUp.classList.add("obscure-arrow-up");
    graphArrowRight.classList.add("obscure-arrow-right");
    e.target.parentElement.childNodes[1].classList.add("normalize");
    e.target.parentElement.childNodes[3].classList.add("shown");
    e.target.parentElement.childNodes[7].classList.add("shown");
    graphIcons.forEach((icon) => {
      if (e.target.classList !== icon.classList) {
        icon.classList.add("obscure");
        icon.parentElement.childNodes[1].classList.remove("normalize");
        icon.parentElement.childNodes[3].classList.remove("shown");
        icon.parentElement.childNodes[7].classList.remove("shown");
      }
    });
  });
});
graphIcons.forEach((icon) => {
  icon.addEventListener("mouseout", (e) => {
    graphTitle.classList.remove("obscure");
    LabelX.classList.remove("obscure");
    LabelY.classList.remove("obscure");
    graphContent.classList.remove("obscure-borders");
    graphArrowUp.classList.remove("obscure-arrow-up");
    graphArrowRight.classList.remove("obscure-arrow-right");
    e.target.parentElement.childNodes[1].classList.remove("normalize");
    e.target.parentElement.childNodes[3].classList.remove("shown");
    e.target.parentElement.childNodes[7].classList.remove("shown");
    graphIcons.forEach((icon) => {
      icon.classList.remove("obscure");
    });
  });
});
const softSkills = document.querySelector(".soft-skills");
const discs = document.querySelectorAll(".soft-skills-disc");
softSkills.addEventListener("mouseover", (e) => {
  // console.log(discs);
  discs.forEach((disc) => {
    disc.classList.add("disc-enlarge");
  });
});
softSkills.addEventListener("mouseout", (e) => {
  discs.forEach((disc) => {
    disc.classList.remove("disc-enlarge");
  });
});
softSkills.addEventListener("mousemove", (e) => {
  let incriments = [];
  let discStyles = [];
  let foundCenterDisc = false;

  for (let i = 0; i < discs.length; i++) {
    incriments.push(
      (document.documentElement.clientWidth / discs.length) * (i + 1)
    );
    if (e.clientX <= incriments[i]) {
      discStyles.push(true);
      if (e.clientX >= incriments[i - 1]) {
        discs.forEach((disc) => {
          for (let j = 0; j < discs.length; j++) {
            disc.classList.remove("disc-color-" + j);
          }
          disc.classList.add("disc-color-" + i);
        });
      }
    } else {
      discStyles.push(false);
    }
  }
  for (let i = 0; i < discs.length; i++) {
    if (foundCenterDisc === true) {
      discStyles[i] = discStyles[i - 1] - 1;
    }
    if (discStyles[i] === true) {
      foundCenterDisc = true;
      discStyles[i] = 12;
    }
  }
  for (let i = discStyles.length - 1; i > -1; i--) {
    if (discStyles[i] === false) {
      discStyles[i] = discStyles[i + 1] - 1;
    }
  }
  for (let i = 0; i < discStyles.length; i++) {
    for (let j = 0; j < discStyles.length; j++) {
      discs[i].classList.remove("disc-opacity-" + discStyles[j]);
    }
    discs[i].classList.add("disc-opacity-" + discStyles[i]);
  }
});
