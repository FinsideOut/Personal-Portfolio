const bookText = document.querySelectorAll(".book-text-right, .book-text-left");
homeButton = document.getElementById("go-home");

// const bookTextRight = document.querySelectorAll(".book-text-right");
// const bookTextLeft = document.querySelectorAll(".book-text-left");
const bookPageRight = document.getElementById("right-page");
const bookPageLeft = document.getElementById("left-page");
const contact = document.getElementById("sub-screen");
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("HEAD")[0];
const bookBg = document.getElementById("book-bg");
const logo = document.getElementById("logo-home");
const lead = document.getElementById("lead");
const aspiring = document.getElementById("aspiring");
const educator = document.getElementById("educator");
const educatorTitle = document.getElementById("educator-title");
const engineer = document.getElementById("engineer");
const engineerTitle = document.getElementById("engineer-title");
const developer = document.getElementById("developer");
const developerTitle = document.getElementById("developer-title");
const services = document.getElementById("services");
const servicesTitle = document.getElementById("services-title");
const work = document.getElementById("work");
const workTitle = document.getElementById("work-title");
const cv = document.getElementById("cv");
const cvTitle = document.getElementById("cv-title");
const cvContent = document.getElementById("cv-content");

const educatorContent = document.getElementById("educator-content");
const engineerContent = document.getElementById("engineer-content");
const developerContent = document.getElementById("developer-content");
// const servicesContent = document.getElementById("services-content");
const workContent = document.getElementById("work-content");
const content = document.querySelectorAll(".hidden");

// global vars
let percent = [];
const num = 100;
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
function calcWidth() {
  for (let i = 0; i < num; i++) {
    percent.push((bookPageLeft.offsetWidth / num) * [i]);
  }
}

// state transition
// cvTitle.onclick = () => {
//   changeState();
// };
logo.onclick = () => {
  changeState();
};
addCurve();
let isFull = false;
function changeState() {
  if (!isFull) {
    toFullScreen();
  } else if (isFull) {
    toHomeScreen();
  }
  isFull = !isFull;
}

function toFullScreen() {
  if (document.body.scrollTop > 0) {
    $("html, body").animate(
      {
        scrollTop: $("body").offset().top,
      },
      800
    );
  }
  removeCurve();
  contact.classList.add("hidden");
  body.classList.add("body-full");
  bookBg.classList.add("book-bg-full");
  bookBg.addEventListener("transitionend", shiftHeadersToFull);
}
function shiftHeadersToFull() {
  homeButton.classList.add("obscure");
  bookBg.removeEventListener("transitionend", shiftHeadersToFull);
  logo.classList.add("logo-full");
  lead.classList.add("lead-full");
  aspiring.classList.add("aspiring-full");
  educator.classList.add("educator-full");
  educatorTitle.classList.add("enlarge-title");
  engineerTitle.classList.add("enlarge-title");
  developerTitle.classList.add("enlarge-title");
  workTitle.classList.add("enlarge-title");
  servicesTitle.classList.add("enlarge-title");
  // educator.classList.add("enlarge-title");
  // console.log(educatorTitle);
  engineer.classList.add("engineer-full");
  developer.classList.add("developer-full");

  services.classList.add("services-full");

  work.classList.add("work-full");

  cv.classList.add("cv-full");
  cvTitle.classList.add("enlarge-title");

  bookPageLeft.classList.add("page-to-center");
  bookPageRight.classList.add("page-to-center");

  logo.addEventListener("transitionend", addFullWidth);
}
const rightNav = document.getElementById("right-nav");
const heroContainer = document.querySelector(".hero-container");
const items = document.querySelectorAll(".hidden");

function addFullWidth(e) {
  if (e.propertyName == "transform") {
    logo.removeEventListener("transitionend", addFullWidth);
    bookPageLeft.classList.add("full-width");
    rightNav.classList.add("right-nav-full");
    bookPageRight.classList.add("full-width");
    heroContainer.classList.add("shown");
  }
}
function toHomeScreen() {
  homeButton.classList.remove("obscure");

  educatorTitle.classList.remove("enlarge-title");
  engineerTitle.classList.remove("enlarge-title");
  developerTitle.classList.remove("enlarge-title");
  workTitle.classList.remove("enlarge-title");
  servicesTitle.classList.remove("enlarge-title");
  cvTitle.classList.remove("enlarge-title");

  items.forEach((item) => {
    item.classList.remove("shown");
  });
  // educatorContent.classList.remove("shown");
  // engineerContent.classList.remove("shown");
  // developerContent.classList.remove("shown");
  // servicesContent.classList.remove("shown");
  // workContent.classList.remove("shown");
  // cvContent.classList.remove("shown");
  bookPageLeft.classList.remove("full-width");
  bookPageRight.classList.remove("full-width");
  rightNav.classList.remove("right-nav-full");

  bookPageLeft.classList.remove("page-to-center");
  bookPageRight.classList.remove("page-to-center");
  logo.classList.remove("logo-full");
  lead.classList.remove("lead-full");
  aspiring.classList.remove("aspiring-full");
  educator.classList.remove("educator-full");
  engineer.classList.remove("engineer-full");
  educator.classList.remove("educator-full");
  developer.classList.remove("developer-full");
  services.classList.remove("services-full");
  work.classList.remove("work-full");
  cv.classList.remove("cv-full");
  aspiring.addEventListener("transitionend", revertBook);
}
function revertBook() {
  aspiring.removeEventListener("transitionend", revertBook);
  addCurve();
  contact.classList.remove("hidden");
  body.classList.remove("body-full");
  bookBg.classList.remove("book-bg-full");
  // heroContainer.classList.remove("shown");
}

//from traversy mdeia

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight * 4 || document.documentElement.clientHeight * 4) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach((item) => {
    if (isFull) {
      if (isInViewport(item)) {
        item.classList.add("shown");
      }
    }
  });

window.addEventListener("load", run);
window.addEventListener("resize", run);
window.addEventListener("scroll", run);

const educatorIconRight = document.getElementById("educator-icon-right");
const educatorIconCenter = document.getElementById("educator-icon-center");
const educatorIconLeft = document.getElementById("educator-icon-left");
const moreInfoRight = document.getElementById("more-info-right");
const moreInfoLeft = document.getElementById("more-info-left");
const moreInfoCenterLeft = document.getElementById("more-info-center-left");
const moreInfoCenterRight = document.getElementById("more-info-center-right");
const educatorBgContainer = document.querySelector(".educator-bg-container");
const educatorBgs = document.querySelectorAll(".educator-bg");
const educatorText = document.querySelector(".educator-text-container");
const educatorWrapper = document.querySelector(".educator-icons-container");
educatorWrapper.addEventListener("mouseover", (e) => {
  educatorText.classList.add("obscure");
  educatorTitle.classList.add("obscure");
  engineerTitle.classList.add("obscure");
  engineerContent.classList.add("obscure");
  aspiring.classList.add("obscure");
  educatorBgContainer.classList.add("normalize");
});
educatorWrapper.addEventListener("mouseout", (e) => {
  educatorText.classList.remove("obscure");
  educatorTitle.classList.remove("obscure");
  engineerTitle.classList.remove("obscure");
  engineerContent.classList.remove("obscure");

  aspiring.classList.remove("obscure");
  educatorBgContainer.classList.remove("normalize");
});
educatorIconRight.addEventListener("mouseover", (e) => {
  educatorIconCenter.classList.add("obscure");
  educatorIconLeft.classList.add("obscure");
  moreInfoRight.classList.add("normalize");
  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.add("educator-bg-right-" + [i]);
  }
});
educatorIconRight.addEventListener("mouseout", (e) => {
  educatorIconCenter.classList.remove("obscure");
  educatorIconLeft.classList.remove("obscure");
  moreInfoRight.classList.remove("normalize");

  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.remove("educator-bg-right-" + [i]);
  }
});

educatorIconLeft.addEventListener("mouseover", (e) => {
  educatorIconCenter.classList.add("obscure");
  educatorIconRight.classList.add("obscure");
  moreInfoLeft.classList.add("normalize");
  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.add("educator-bg-left-" + [i]);
  }
});
educatorIconLeft.addEventListener("mouseout", (e) => {
  educatorIconCenter.classList.remove("obscure");
  educatorIconRight.classList.remove("obscure");
  moreInfoLeft.classList.remove("normalize");
  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.remove("educator-bg-left-" + [i]);
  }
});
educatorIconCenter.addEventListener("mouseover", (e) => {
  educatorIconLeft.classList.add("obscure");
  educatorIconRight.classList.add("obscure");
  moreInfoCenterLeft.classList.add("normalize");
  moreInfoCenterRight.classList.add("normalize");
  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.add("educator-bg-center-" + [i]);
  }
});
educatorIconCenter.addEventListener("mouseout", (e) => {
  educatorIconLeft.classList.remove("obscure");
  educatorIconRight.classList.remove("obscure");
  moreInfoCenterLeft.classList.remove("normalize");
  moreInfoCenterRight.classList.remove("normalize");
  for (let i = 0; i < educatorBgs.length; i++) {
    educatorBgs[i].classList.remove("educator-bg-center-" + [i]);
  }
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
const engineerText = document.getElementById("engineer-text");
const softSkills = document.querySelector(".soft-skills");
const technicalSkills = document.querySelector(".technical-skills");
graphIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", (e) => {
    e.target.classList.remove("obscure");
    graphTitle.classList.add("obscure");
    LabelX.classList.add("obscure");
    LabelY.classList.add("obscure");
    engineerTitle.classList.add("obscure");
    engineerText.classList.add("obscure");
    educatorContent.classList.add("obscure");
    softSkills.classList.add("obscure");
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
    engineerTitle.classList.remove("obscure");
    engineerText.classList.remove("obscure");
    educatorContent.classList.remove("obscure");
    softSkills.classList.remove("obscure");
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
const discs = document.querySelectorAll(".soft-skills-disc");
softSkills.addEventListener("mouseover", (e) => {
  // console.log(discs);
  technicalSkills.classList.add("obscure");
  developerTitle.classList.add("obscure");
  developerContent.classList.add("obscure");
  discs.forEach((disc) => {
    disc.classList.add("disc-enlarge");
  });
});
softSkills.addEventListener("mouseout", (e) => {
  technicalSkills.classList.remove("obscure");
  developerTitle.classList.remove("obscure");
  developerContent.classList.remove("obscure");
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
const developerCards = document.querySelectorAll(".developer-card");
const developerBgs = document.querySelectorAll(".developer-bg");
const devWrapper = document.querySelector(".developer-wrapper");
const developerText = document.getElementById("developer-text");
const servicesContent = document.getElementById("services-content");
const dbgSize = 700;
const incriment = 100;
// console.log(devWrapper.children);
developerCards.forEach((card) => {
  card.addEventListener("mouseover", (e) => {
    card.children[0].classList.add("normalize");
    developerText.classList.add("obscure");
    developerTitle.classList.add("obscure");
    servicesTitle.classList.add("obscure");
    servicesContent.classList.add("obscure");
    engineerContent.classList.add("obscure");
    if (card.classList.contains("dev-left")) {
      card.parentElement.children[1].classList.add("obscure");
      card.parentElement.children[2].classList.add("obscure");
    } else if (card.classList.contains("dev-center")) {
      card.parentElement.children[0].classList.add("obscure");
      card.parentElement.children[2].classList.add("obscure");
    } else if (card.classList.contains("dev-right")) {
      card.parentElement.children[0].classList.add("obscure");
      card.parentElement.children[1].classList.add("obscure");
    }
  });
  card.addEventListener("mouseout", (e) => {
    card.children[0].classList.remove("normalize");
    developerText.classList.remove("obscure");
    developerTitle.classList.remove("obscure");
    servicesTitle.classList.remove("obscure");
    servicesContent.classList.remove("obscure");
    engineerContent.classList.remove("obscure");
    card.children[0].children[1].style.transform = "none";
    // console.log(mouseX, mouseY);
    card.children[0].children[2].style.transform = "none";
    card.parentElement.children[0].classList.remove("obscure");
    card.parentElement.children[1].classList.remove("obscure");
    card.parentElement.children[2].classList.remove("obscure");
  });
  card.addEventListener("mousemove", (e) => {
    let rect = card.children[0].children[0].getBoundingClientRect();
    let mouseX = e.clientX - rect.left - 350;
    let mouseY = e.clientY - rect.top - 350;
    if (mouseX / 2 >= incriment - 40) {
      shiftX = incriment - 40;
    } else if (mouseX / 2 <= -incriment + 40) {
      shiftX = -incriment + 40;
    } else {
      shiftX = mouseX / 2;
    }
    if (mouseY / 2 >= incriment - 40) {
      shiftY = incriment - 40;
    } else if (mouseY / 2 <= -incriment + 40) {
      shiftY = -incriment + 40;
    } else {
      shiftY = mouseY / 2;
    }
    card.children[0].children[1].style.transform =
      "translate(" + shiftX / 2 + "px," + shiftY / 2 + "px)";
    // console.log(mouseX, mouseY);
    card.children[0].children[2].style.transform =
      "translate(" + shiftX + "px," + shiftY + "px)";
    // card.children[1].style.transform =
    //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
    // card.children[2].style.transform =
    //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
    // // console.log(mouseX, mouseY);
    // card.children[3].style.transform =
    //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
    // card.children[4].style.transform =
    //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
  });
});

const servicesCardsContainer = document.getElementById("service-cards");
const servicesBg = document.getElementById("services-bg");
const servicesText = document.getElementById("services-text");
const serviceCards = document.querySelectorAll(".service-card");
const servicesBgs = document.querySelectorAll(".services-bg");
const enquire = document.querySelector(".enquire-link");
serviceCards.forEach((card) => {
  card.addEventListener("mouseover", (e) => {
    enquire.classList.add("obscure");
    servicesTitle.classList.add("obscure");
    servicesText.classList.add("obscure");
    workContent.classList.add("obscure");
    workTitle.classList.add("obscure");
    developerContent.classList.add("obscure");
    if (card.classList.contains("services-left")) {
      serviceCards[1].classList.add("obscure");
      serviceCards[2].classList.add("obscure");
    } else if (card.classList.contains("services-center")) {
      serviceCards[0].classList.add("obscure");
      serviceCards[2].classList.add("obscure");
    } else if (card.classList.contains("services-right")) {
      serviceCards[0].classList.add("obscure");
      serviceCards[1].classList.add("obscure");
    }
  });
});
serviceCards.forEach((card) => {
  card.addEventListener("mouseout", (e) => {
    enquire.classList.remove("obscure");
    servicesTitle.classList.remove("obscure");
    servicesText.classList.remove("obscure");
    workContent.classList.remove("obscure");
    workTitle.classList.remove("obscure");
    developerContent.classList.remove("obscure");
    serviceCards[0].classList.remove("obscure");
    serviceCards[1].classList.remove("obscure");
    serviceCards[2].classList.remove("obscure");
  });
});
serviceCards[0].addEventListener("mouseover", () => {
  servicesBg.classList.add("service-wrapper-left");
  servicesBgs[0].classList.add("service-top");
  servicesBgs[1].classList.add("service-right");
  servicesBgs[2].classList.add("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.add("services-blue-" + [i]);
  }
});
serviceCards[0].addEventListener("mouseout", () => {
  servicesBg.classList.remove("service-wrapper-left");

  servicesBgs[0].classList.remove("service-top");
  servicesBgs[1].classList.remove("service-right");
  servicesBgs[2].classList.remove("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.remove("services-blue-" + [i]);
  }
});
serviceCards[1].addEventListener("mouseover", () => {
  servicesBg.classList.add("service-wrapper-center");

  servicesBgs[1].classList.add("service-top");
  servicesBgs[2].classList.add("service-right");
  servicesBgs[0].classList.add("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.add("services-green-" + [i]);
  }
});
serviceCards[1].addEventListener("mouseout", () => {
  servicesBg.classList.remove("service-wrapper-center");

  servicesBgs[1].classList.remove("service-top");
  servicesBgs[2].classList.remove("service-right");
  servicesBgs[0].classList.remove("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.remove("services-green-" + [i]);
  }
});
serviceCards[2].addEventListener("mouseover", () => {
  servicesBg.classList.add("service-wrapper-right");

  servicesBgs[2].classList.add("service-top");
  servicesBgs[0].classList.add("service-right");
  servicesBgs[1].classList.add("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.add("services-red-" + [i]);
  }
});
serviceCards[2].addEventListener("mouseout", () => {
  servicesBg.classList.remove("service-wrapper-right");

  servicesBgs[2].classList.remove("service-top");
  servicesBgs[0].classList.remove("service-right");
  servicesBgs[1].classList.remove("service-left");
  for (let i = 0; i < servicesBgs.length; i++) {
    servicesBgs[i].classList.remove("services-red-" + [i]);
  }
});
enquire.addEventListener("mouseover", () => {
  servicesTitle.classList.add("obscure");
  servicesText.classList.add("obscure");
  workContent.classList.add("obscure");
  workTitle.classList.add("obscure");
  serviceCards.forEach((card) => {
    card.classList.add("obscure");
  });
  servicesBg.classList.add("service-wrapper-bottom");
  servicesBgs[2].classList.add("service-top");
  servicesBgs[0].classList.add("service-right");
  servicesBgs[1].classList.add("service-left");
  servicesBgs[0].classList.add("services-red-" + [0]);
  servicesBgs[1].classList.add("services-green-" + [0]);
  servicesBgs[2].classList.add("services-blue-" + [0]);
});
enquire.addEventListener("mouseout", () => {
  serviceCards.forEach((card) => {
    card.classList.remove("obscure");
  });
  servicesTitle.classList.remove("obscure");
  servicesText.classList.remove("obscure");
  workContent.classList.remove("obscure");
  workTitle.classList.remove("obscure");

  servicesBg.classList.remove("service-wrapper-bottom");
  servicesBgs[2].classList.remove("service-top");
  servicesBgs[0].classList.remove("service-right");
  servicesBgs[1].classList.remove("service-left");

  servicesBgs[0].classList.remove("services-red-" + [0]);
  servicesBgs[1].classList.remove("services-green-" + [0]);
  servicesBgs[2].classList.remove("services-blue-" + [0]);
});

const workBgs = document.querySelectorAll(".work-bg");
const workBg = document.querySelectorAll(".work-bg-container");
const workTexts = document.querySelectorAll(".work-piece-text");
const workImgs = document.querySelectorAll(".work-piece-img");
const workItems = document.querySelectorAll(".work-piece");
const workText = document.getElementById("work-text");
const judeImg = document.getElementById("jude-img");
const johnImg = document.getElementById("john-img");
const newsImg = document.getElementById("news-img");
judeImg.addEventListener("click", () => {
  var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
  var URL = "https://condescending-chandrasekhar-4d7ab6.netlify.app/";
  // var win = window.open(URL, "_blank", strWindowFeatures);
  window.open(URL, "_blank", strWindowFeatures);
});
johnImg.addEventListener("click", () => {
  var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
  var URL = "https://sharp-minsky-00b8d2.netlify.app/";
  // var win = window.open(URL, "_blank", strWindowFeatures);
  window.open(URL, "_blank", strWindowFeatures);
});
newsImg.addEventListener("click", () => {
  var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
  var URL = "https://clever-albattani-a31680.netlify.app/";
  // var win = window.open(URL, "_blank", strWindowFeatures);
  window.open(URL, "_blank", strWindowFeatures);
});

workItems.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    item.classList.add("target");
    workTitle.classList.add("obscure");
    cvTitle.classList.add("obscure");
    cvContent.classList.add("obscure");
    workText.classList.add("obscure");
    servicesContent.classList.add("obscure");
    console.log(e.target);
    for (let i = 0; i < workItems.length; i++) {
      if (!workItems[i].classList.contains("target")) {
        workItems[i].classList.add("obscure");
      }
    }
  });
});
workItems.forEach((item) => {
  item.addEventListener("mouseout", (e) => {
    item.classList.remove("target");
    cvTitle.classList.remove("obscure");
    cvContent.classList.remove("obscure");
    workTitle.classList.remove("obscure");
    // cvTitle.classList.remove("obscure");
    workText.classList.remove("obscure");
    servicesContent.classList.remove("obscure");
    for (let i = 0; i < workItems.length; i++) {
      // if (!workItems[i].classList.contains("target")) {
      workItems[i].classList.remove("obscure");
    }
  });
});
// console.log(workImgs[0].parentElement.children[1].children[1]);
workTexts.forEach((text) => {
  const bgContainer = text.parentElement.children[1].children[1];
  text.addEventListener("mouseover", (e) => {
    bgContainer.classList.add("normalize");
    if (text.parentElement.classList.contains("reverse")) {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.add("reverse-work-text-hover-" + [i]);
      }
    } else {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.add("work-text-hover-" + [i]);
      }
    }
  });
});
workTexts.forEach((text) => {
  const bgContainer = text.parentElement.children[1].children[1];
  text.addEventListener("mouseout", (e) => {
    bgContainer.classList.remove("normalize");
    if (text.parentElement.classList.contains("reverse")) {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.remove(
          "reverse-work-text-hover-" + [i]
        );
      }
    } else {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.remove("work-text-hover-" + [i]);
      }
    }
  });
});
workImgs.forEach((img) => {
  const bgContainer = img.parentElement.children[1].children[1];
  img.addEventListener("mouseover", (e) => {
    bgContainer.classList.add("normalize");
    if (img.parentElement.classList.contains("reverse")) {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.add("work-img-hover-" + [i]);
      }
    } else {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.add("work-img-hover-" + [i]);
      }
    }
  });
});
workImgs.forEach((img) => {
  const bgContainer = img.parentElement.children[1].children[1];
  img.addEventListener("mouseout", (e) => {
    bgContainer.classList.remove("normalize");
    if (img.parentElement.classList.contains("reverse")) {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.remove("work-img-hover-" + [i]);
      }
    } else {
      for (let i = 0; i < bgContainer.childElementCount; i++) {
        bgContainer.children[i].classList.remove("work-img-hover-" + [i]);
      }
    }
  });
});

let heroNum = 500;
for (let i = 0; i < heroNum; i++) {
  let newDisc = document.createElement("div");
  newDisc.classList.add("hero-disc");
  heroContainer.appendChild(newDisc);
}
const heroDiscs = document.querySelectorAll(".hero-disc");
window.addEventListener("mousemove", (e) => {
  // console.log("move");
  if (window.scrollY < 500) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left - rect.width / 2; //x position within the element.
    var y = e.clientY - rect.top;
    // console.log(x, y);
    makeFlower(x / 100000, y / 2);
  } //y position within the element.
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    heroContainer.classList.remove("shown");
  }
});
// makeFlower();
// makeFlower();
function makeFlower(modifier, color) {
  // console.log(modifier);
  let opac = 1;
  let R = 0;
  let ratio = 0.6180339;
  let theta = 360 * ratio;
  let x;
  let y;
  ratio = ratio + modifier;
  for (let i = 0; i < heroDiscs.length; i++) {
    x = R * Math.cos(theta * (Math.PI / 180));
    // x = 400;
    y = R * Math.sin(theta * (Math.PI / 180));
    heroDiscs[i].style.transform = "translateX(" + x + "px)";
    heroDiscs[i].style.transform += "translateY(" + y + "px)";
    // heroDiscs[i].style.transform += "translatey(x)";
    heroDiscs[i].style.opacity = opac;
    heroDiscs[i].style.backgroundColor =
      "rgba(" + [i] + "," + color + "," + (255 - color) + ",0.5)";
    R += 1;
    if (theta > 360) {
      theta -= 360;
    }
    theta += 360 * ratio;
    opac -= 0.002;
  }
}
$(".nav-link").on("click", function (e) {
  if (this.hash !== "" && isFull === false) {
    changeState();
    e.preventDefault();
    const hash = this.hash;
    setTimeout(function () {
      console.log(hash);
      console.log(hash, $(hash).offset().top - 100);
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 100,
        },
        1000
      );
    }, 1500);
    // console.log(hash, $(hash).offset().top - 100);
  }
  // window.scrollBy(0, window.innerHeight / 2);
});
homeButton.addEventListener("mouseover", () => {
  homeButton.classList.add("normalize");
});
homeButton.addEventListener("mouseout", () => {
  homeButton.classList.remove("normalize");
});
$("#go-home, .nav-link-full").click(function () {
  if (isFull && window.scrollY > 0) {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000,
      function () {
        console.log("wtf");
        setTimeout(function () {
          changeState();
        }, 200);
      }
    );
  } else if (isFull && window.scrollY === 0) {
    changeState();
  }
});

// homeButton.addEventListener("click", () => {
//   // $("html, body").animate(
//   //   { scrollTop: 0 },
//   //   { duration: 1000, complete: changeState() }
//   // );
// });
// $("html, body")
//   .animate(
//     {
//       scrollTop: 0,
//     },
//     {
//       easing: alert("start ani"),
//     },
//     duration
//   )
//   .promise()
//   .done(changeState());
