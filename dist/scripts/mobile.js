console.log("mobile");
// // //from traversy mdeia
const preloader = document.getElementById("preloader");
window.onload = () => {
  preloader.classList.add("fade-out");
};
// // const isInViewport = (el) => {
// //   const rect = el.getBoundingClientRect();
// //   return (
// //     rect.top >= 0 &&
// //     rect.left >= 0 &&
// //     rect.bottom <=
// //       (window.innerHeight * 4 || document.documentElement.clientHeight * 4) &&
// //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
// //   );
// // };

// // const run = () =>
// //   items.forEach((item) => {
// //     if (isInViewport(item)) {
// //       item.classList.add("shown");
// //     }
// //   });

// // window.addEventListener("load", run);
// // window.addEventListener("resize", run);
// // window.addEventListener("scroll", run);
const heroContainer = document.getElementById("hero-container");
const engineerContent = document.getElementById("engineer-content");
const educatorContent = document.getElementById("educator-content");
const developerContent = document.getElementById("developer-content");
const servicesContent = document.getElementById("services-content");
const workContent = document.getElementById("work-content");
const cvContent = document.getElementById("cv-content");
const contactContent = document.getElementById("contact-content");
const aspiring = document.getElementById("aspiring");

let heroNum = 500;
for (let i = 0; i < heroNum; i++) {
  let newDisc = document.createElement("div");
  newDisc.classList.add("hero-disc");
  heroContainer.appendChild(newDisc);
}
const heroDiscs = document.querySelectorAll(".hero-disc");
const mainNav = document.querySelector("#main-nav");
const navLocation = document.querySelector("#nav-location");
const screenWidth = window.matchMedia("(max-width: 640px)");
let x = 0;
let y = 0;
makeFlower(0, 0);
heroContainer.classList.add("shown");

if (!screenWidth.matches) {
  window.addEventListener("scroll", (e) => {
    let x = window.scrollY;
    let y = 200;
    makeFlower(x / 500000, y / 2);
    handleNav();
  });
} else {
  heroDiscs.forEach((disc) => {
    disc.classList.add("mobile-disc-transition");
  });
  let position = "top";
  let prevPosition = position;
  window.addEventListener("scroll", (e) => {
    heroContainer.classList.add("shown");
    if (window.scrollY == 0) {
      position = "top";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    }
    if (
      window.scrollY >= aspiring.offsetTop - 100 &&
      window.scrollY < engineerContent.offsetTop - 100
    ) {
      // console.log("aspire");
      position = "aspire";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (
      window.scrollY >= engineerContent.offsetTop - 100 &&
      window.scrollY < developerContent.offsetTop - 100
    ) {
      position = "engine";
      // console.log("engine");
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (
      window.scrollY >= developerContent.offsetTop - 100 &&
      window.scrollY < servicesContent.offsetTop - 100
    ) {
      position = "developer";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (
      window.scrollY >= servicesContent.offsetTop - 100 &&
      window.scrollY < workContent.offsetTop - 100
    ) {
      position = "service";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (
      window.scrollY >= workContent.offsetTop - 100 &&
      window.scrollY < cvContent.offsetTop - 100
    ) {
      position = "work";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (
      window.scrollY >= cvContent.offsetTop - 100 &&
      window.scrollY < contactContent.offsetTop - 100
    ) {
      position = "cv";
      if (prevPosition !== position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    } else if (window.scrollY >= cvContent.offsetTop - 100) {
      position = "contact";
      if (prevPosition != position) {
        x = Math.random(-0.005, 0.005);
        y = Math.random(0, 255);
      }
      prevPosition = position;
    }
    console.log(y * 255);
    makeFlower(x, y * 255);
    handleNav();
  });
}

var lastPoint = null; //global
var lastPoint = null; //global
function handleNav(e) {
  // small mobile
  if (window.scrollY >= navLocation.offsetTop) {
    if (screenWidth.matches) {
      mainNav.classList.add("fixed-nav-mobile");
      aspiring.classList.add("fixed-nav-compensate-mobile");
    } else {
      mainNav.classList.add("fixed-nav");
      aspiring.classList.add("fixed-nav-compensate");
    }
    // mainNav.classList.add("vanish");
  } else {
    // console.log("revert");
    mainNav.classList.remove("fixed-nav-mobile");
    aspiring.classList.remove("fixed-nav-compensate-mobile");
    mainNav.classList.remove("fixed-nav");
    aspiring.classList.remove("fixed-nav-compensate");
    mainNav.classList.remove("vanish");
  }
  var currentPoint = window.scrollY;
  if (lastPoint != null && lastPoint < currentPoint) {
    //swiped down
    if (window.scrollY >= navLocation.offsetTop) {
      mainNav.classList.add("vanish");
      // console.log("you scrolled up");
    }
  } else if (lastPoint != null && lastPoint > currentPoint) {
    //swiped up
    mainNav.classList.remove("vanish");
    // console.log("you scrolled down");
  }

  lastPoint = currentPoint;
}

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     heroContainer.classList.remove("shown");
//   } else {
//     heroContainer.classList.add("shown");
//   }
// });
// makeFlower();
// makeFlower();
function makeFlower(modifier, color) {
  // console.log(modifier, color);

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
// const titles = document.querySelectorAll(".section-title");
// const educatorIconRight = document.getElementById("educator-icon-right");
// const educatorIconCenter = document.getElementById("educator-icon-center");
// const educatorIconLeft = document.getElementById("educator-icon-left");
// const moreInfoRight = document.getElementById("more-info-right");
// const moreInfoLeft = document.getElementById("more-info-left");
// const moreInfoCenterLeft = document.getElementById("more-info-center-left");
// const moreInfoCenterRight = document.getElementById("more-info-center-right");
// const educatorBgContainer = document.querySelector(".educator-bg-container");
// const educatorBgs = document.querySelectorAll(".educator-bg");
// const educatorText = document.querySelector(".educator-text-container");
// const educatorWrapper = document.querySelector(".educator-icons-container");
// educatorWrapper.addEventListener("mouseover", (e) => {
//   educatorText.classList.add("obscure");
//   titles[0].classList.add("obscure");
//   engineerContent.classList.add("obscure");
//   aspiring.classList.add("obscure");
//   educatorBgContainer.classList.add("normalize");
// });
// educatorWrapper.addEventListener("mouseout", (e) => {
//   educatorText.classList.remove("obscure");
//   titles[0].classList.remove("obscure");
//   engineerContent.classList.remove("obscure");
//   aspiring.classList.remove("obscure");
//   educatorBgContainer.classList.remove("normalize");
// });
// educatorIconRight.addEventListener("mouseover", (e) => {
//   educatorIconCenter.classList.add("obscure");
//   educatorIconLeft.classList.add("obscure");
//   moreInfoRight.classList.add("normalize");
//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.add("educator-bg-right-" + [i]);
//   }
// });
// educatorIconRight.addEventListener("mouseout", (e) => {
//   educatorIconCenter.classList.remove("obscure");
//   educatorIconLeft.classList.remove("obscure");
//   moreInfoRight.classList.remove("normalize");

//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.remove("educator-bg-right-" + [i]);
//   }
// });

// educatorIconLeft.addEventListener("mouseover", (e) => {
//   educatorIconCenter.classList.add("obscure");
//   educatorIconRight.classList.add("obscure");
//   moreInfoLeft.classList.add("normalize");
//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.add("educator-bg-left-" + [i]);
//   }
// });
// educatorIconLeft.addEventListener("mouseout", (e) => {
//   educatorIconCenter.classList.remove("obscure");
//   educatorIconRight.classList.remove("obscure");
//   moreInfoLeft.classList.remove("normalize");
//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.remove("educator-bg-left-" + [i]);
//   }
// });
// educatorIconCenter.addEventListener("mouseover", (e) => {
//   educatorIconLeft.classList.add("obscure");
//   educatorIconRight.classList.add("obscure");
//   moreInfoCenterLeft.classList.add("normalize");
//   moreInfoCenterRight.classList.add("normalize");
//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.add("educator-bg-center-" + [i]);
//   }
// });
// educatorIconCenter.addEventListener("mouseout", (e) => {
//   educatorIconLeft.classList.remove("obscure");
//   educatorIconRight.classList.remove("obscure");
//   moreInfoCenterLeft.classList.remove("normalize");
//   moreInfoCenterRight.classList.remove("normalize");
//   for (let i = 0; i < educatorBgs.length; i++) {
//     educatorBgs[i].classList.remove("educator-bg-center-" + [i]);
//   }
// });

// const graphIcons = document.querySelectorAll(".graph-icon");
// const graphTexts = document.querySelectorAll(".graph-icon-text");
// const graphBgs = document.querySelectorAll(".graph-icon-bg");
// const graphTitle = document.querySelector(".graph-title");
// const LabelX = document.querySelector(".x-label");
// const LabelY = document.querySelector(".y-label");
// const graphContent = document.querySelector(".graph-content");
// const graphArrowUp = document.querySelector(".up-arrow");
// const graphArrowRight = document.querySelector(".right-arrow");
// const engineerText = document.getElementById("engineer-text");
// const softSkills = document.querySelector(".soft-skills");
// const technicalSkills = document.querySelector(".technical-skills");
// graphIcons.forEach((icon) => {
//   icon.addEventListener("mouseenter", (e) => {
//     e.target.classList.remove("obscure");
//     graphTitle.classList.add("obscure");
//     LabelX.classList.add("obscure");
//     LabelY.classList.add("obscure");
//     titles[1].classList.add("obscure");
//     engineerText.classList.add("obscure");
//     educatorContent.classList.add("obscure");
//     softSkills.classList.add("obscure");
//     graphContent.classList.add("obscure-borders");
//     graphArrowUp.classList.add("obscure-arrow-up");
//     graphArrowRight.classList.add("obscure-arrow-right");
//     e.target.parentElement.childNodes[1].classList.add("normalize");
//     e.target.parentElement.childNodes[3].classList.add("shown");
//     e.target.parentElement.childNodes[7].classList.add("shown");
//     graphIcons.forEach((icon) => {
//       if (e.target.classList !== icon.classList) {
//         icon.classList.add("obscure");
//         icon.parentElement.childNodes[1].classList.remove("normalize");
//         icon.parentElement.childNodes[3].classList.remove("shown");
//         icon.parentElement.childNodes[7].classList.remove("shown");
//       }
//     });
//   });
// });
// graphIcons.forEach((icon) => {
//   icon.addEventListener("mouseout", (e) => {
//     graphTitle.classList.remove("obscure");
//     LabelX.classList.remove("obscure");
//     LabelY.classList.remove("obscure");
//     titles[1].classList.remove("obscure");
//     engineerText.classList.remove("obscure");
//     educatorContent.classList.remove("obscure");
//     softSkills.classList.remove("obscure");
//     graphContent.classList.remove("obscure-borders");
//     graphArrowUp.classList.remove("obscure-arrow-up");
//     graphArrowRight.classList.remove("obscure-arrow-right");
//     e.target.parentElement.childNodes[1].classList.remove("normalize");
//     e.target.parentElement.childNodes[3].classList.remove("shown");
//     e.target.parentElement.childNodes[7].classList.remove("shown");
//     graphIcons.forEach((icon) => {
//       icon.classList.remove("obscure");
//     });
//   });
// });
// const discs = document.querySelectorAll(".soft-skills-disc");
// softSkills.addEventListener("mouseover", (e) => {
//   // console.log(discs);
//   technicalSkills.classList.add("obscure");
//   titles[1].classList.add("obscure");
//   developerContent.classList.add("obscure");
//   discs.forEach((disc) => {
//     disc.classList.add("disc-enlarge");
//   });
// });
// softSkills.addEventListener("mouseout", (e) => {
//   technicalSkills.classList.remove("obscure");
//   titles[1].classList.remove("obscure");
//   developerContent.classList.remove("obscure");
//   discs.forEach((disc) => {
//     disc.classList.remove("disc-enlarge");
//   });
// });
// softSkills.addEventListener("mousemove", (e) => {
//   let incriments = [];
//   let discStyles = [];
//   let foundCenterDisc = false;

//   for (let i = 0; i < discs.length; i++) {
//     incriments.push(
//       (document.documentElement.clientWidth / discs.length) * (i + 1)
//     );
//     if (e.clientX <= incriments[i]) {
//       discStyles.push(true);
//       if (e.clientX >= incriments[i - 1]) {
//         discs.forEach((disc) => {
//           for (let j = 0; j < discs.length; j++) {
//             disc.classList.remove("disc-color-" + j);
//           }
//           disc.classList.add("disc-color-" + i);
//         });
//       }
//     } else {
//       discStyles.push(false);
//     }
//   }
//   for (let i = 0; i < discs.length; i++) {
//     if (foundCenterDisc === true) {
//       discStyles[i] = discStyles[i - 1] - 1;
//     }
//     if (discStyles[i] === true) {
//       foundCenterDisc = true;
//       discStyles[i] = 12;
//     }
//   }
//   for (let i = discStyles.length - 1; i > -1; i--) {
//     if (discStyles[i] === false) {
//       discStyles[i] = discStyles[i + 1] - 1;
//     }
//   }
//   for (let i = 0; i < discStyles.length; i++) {
//     for (let j = 0; j < discStyles.length; j++) {
//       discs[i].classList.remove("disc-opacity-" + discStyles[j]);
//     }
//     discs[i].classList.add("disc-opacity-" + discStyles[i]);
//   }
// });
// const developerCards = document.querySelectorAll(".developer-card");
// const developerBgs = document.querySelectorAll(".developer-bg");
// const devWrapper = document.querySelector(".developer-wrapper");
// const developerText = document.getElementById("developer-text");
// const scrollFromDeveloper = document.getElementById("scroll-from-developer");
// const dbgSize = 700;
// const incriment = 100;
// // console.log(devWrapper.children);
// developerCards.forEach((card) => {
//   card.addEventListener("mouseover", (e) => {
//     card.children[0].classList.add("normalize");
//     developerText.classList.add("obscure");
//     scrollFromDeveloper.classList.add("obscure");
//     titles[2].classList.add("obscure");
//     // titles[3].classList.add("obscure");
//     servicesContent.classList.add("obscure");
//     engineerContent.classList.add("obscure");
//     if (card.classList.contains("dev-left")) {
//       card.parentElement.children[1].classList.add("obscure");
//       card.parentElement.children[2].classList.add("obscure");
//     } else if (card.classList.contains("dev-center")) {
//       card.parentElement.children[0].classList.add("obscure");
//       card.parentElement.children[2].classList.add("obscure");
//     } else if (card.classList.contains("dev-right")) {
//       card.parentElement.children[0].classList.add("obscure");
//       card.parentElement.children[1].classList.add("obscure");
//     }
//   });
//   card.addEventListener("mouseout", (e) => {
//     card.children[0].classList.remove("normalize");
//     developerText.classList.remove("obscure");
//     titles[2].classList.remove("obscure");
//     scrollFromDeveloper.classList.remove("obscure");

//     // titles[3].classList.remove("obscure");
//     servicesContent.classList.remove("obscure");
//     engineerContent.classList.remove("obscure");
//     card.children[0].children[1].style.transform = "none";
//     // console.log(mouseX, mouseY);
//     card.children[0].children[2].style.transform = "none";
//     card.parentElement.children[0].classList.remove("obscure");
//     card.parentElement.children[1].classList.remove("obscure");
//     card.parentElement.children[2].classList.remove("obscure");
//   });
//   card.addEventListener("mousemove", (e) => {
//     let rect = card.children[0].children[0].getBoundingClientRect();
//     let mouseX = e.clientX - rect.left - 350;
//     let mouseY = e.clientY - rect.top - 350;
//     if (mouseX / 2 >= incriment - 40) {
//       shiftX = incriment - 40;
//     } else if (mouseX / 2 <= -incriment + 40) {
//       shiftX = -incriment + 40;
//     } else {
//       shiftX = mouseX / 2;
//     }
//     if (mouseY / 2 >= incriment - 40) {
//       shiftY = incriment - 40;
//     } else if (mouseY / 2 <= -incriment + 40) {
//       shiftY = -incriment + 40;
//     } else {
//       shiftY = mouseY / 2;
//     }
//     card.children[0].children[1].style.transform =
//       "translate(" + shiftX / 2 + "px," + shiftY / 2 + "px)";
//     // console.log(mouseX, mouseY);
//     card.children[0].children[2].style.transform =
//       "translate(" + shiftX + "px," + shiftY + "px)";
//     // card.children[1].style.transform =
//     //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
//     // card.children[2].style.transform =
//     //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
//     // // console.log(mouseX, mouseY);
//     // card.children[3].style.transform =
//     //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
//     // card.children[4].style.transform =
//     //   "translate(" + shiftX / 3 + "px," + shiftY / 3 + "px)";
//   });
// });

// const servicesCardsContainer = document.getElementById("service-cards");
// const servicesBg = document.getElementById("services-bg");
// const servicesText = document.getElementById("services-text");
// const serviceCards = document.querySelectorAll(".service-card");
// const servicesBgs = document.querySelectorAll(".services-bg");
// const scrollFromServices = document.getElementById("scroll-from-services");
// serviceCards.forEach((card) => {
//   card.addEventListener("mouseover", (e) => {
//     scrollFromServices.classList.add("obscure");
//     titles[3].classList.add("obscure");
//     servicesText.classList.add("obscure");
//     workContent.classList.add("obscure");
//     developerContent.classList.add("obscure");
//     if (card.classList.contains("services-left")) {
//       serviceCards[1].classList.add("obscure");
//       serviceCards[2].classList.add("obscure");
//     } else if (card.classList.contains("services-center")) {
//       serviceCards[0].classList.add("obscure");
//       serviceCards[2].classList.add("obscure");
//     } else if (card.classList.contains("services-right")) {
//       serviceCards[0].classList.add("obscure");
//       serviceCards[1].classList.add("obscure");
//     }
//   });
// });
// serviceCards.forEach((card) => {
//   card.addEventListener("mouseout", (e) => {
//     scrollFromServices.classList.remove("obscure");
//     titles[3].classList.remove("obscure");
//     servicesText.classList.remove("obscure");
//     workContent.classList.remove("obscure");

//     developerContent.classList.remove("obscure");
//     serviceCards[0].classList.remove("obscure");
//     serviceCards[1].classList.remove("obscure");
//     serviceCards[2].classList.remove("obscure");
//   });
// });
// serviceCards[0].addEventListener("mouseover", () => {
//   servicesBg.classList.add("service-wrapper-left");
//   servicesBgs[0].classList.add("service-top");
//   servicesBgs[1].classList.add("service-right");
//   servicesBgs[2].classList.add("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.add("services-blue-" + [i]);
//   }
// });
// serviceCards[0].addEventListener("mouseout", () => {
//   servicesBg.classList.remove("service-wrapper-left");

//   servicesBgs[0].classList.remove("service-top");
//   servicesBgs[1].classList.remove("service-right");
//   servicesBgs[2].classList.remove("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.remove("services-blue-" + [i]);
//   }
// });
// serviceCards[1].addEventListener("mouseover", () => {
//   servicesBg.classList.add("service-wrapper-center");

//   servicesBgs[1].classList.add("service-top");
//   servicesBgs[2].classList.add("service-right");
//   servicesBgs[0].classList.add("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.add("services-green-" + [i]);
//   }
// });
// serviceCards[1].addEventListener("mouseout", () => {
//   servicesBg.classList.remove("service-wrapper-center");

//   servicesBgs[1].classList.remove("service-top");
//   servicesBgs[2].classList.remove("service-right");
//   servicesBgs[0].classList.remove("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.remove("services-green-" + [i]);
//   }
// });
// serviceCards[2].addEventListener("mouseover", () => {
//   servicesBg.classList.add("service-wrapper-right");

//   servicesBgs[2].classList.add("service-top");
//   servicesBgs[0].classList.add("service-right");
//   servicesBgs[1].classList.add("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.add("services-red-" + [i]);
//   }
// });
// serviceCards[2].addEventListener("mouseout", () => {
//   servicesBg.classList.remove("service-wrapper-right");

//   servicesBgs[2].classList.remove("service-top");
//   servicesBgs[0].classList.remove("service-right");
//   servicesBgs[1].classList.remove("service-left");
//   for (let i = 0; i < servicesBgs.length; i++) {
//     servicesBgs[i].classList.remove("services-red-" + [i]);
//   }
// });
// scrollFromServices.addEventListener("mouseover", () => {
//   titles[3].classList.add("obscure");
//   servicesText.classList.add("obscure");
//   workContent.classList.add("obscure");
//   serviceCards.forEach((card) => {
//     card.classList.add("obscure");
//   });
//   servicesBg.classList.add("service-wrapper-bottom");
//   servicesBgs[2].classList.add("service-top");
//   servicesBgs[0].classList.add("service-right");
//   servicesBgs[1].classList.add("service-left");
//   servicesBgs[0].classList.add("services-red-" + [0]);
//   servicesBgs[1].classList.add("services-green-" + [0]);
//   servicesBgs[2].classList.add("services-blue-" + [0]);
// });
// scrollFromServices.addEventListener("mouseout", () => {
//   serviceCards.forEach((card) => {
//     card.classList.remove("obscure");
//   });
//   titles[3].classList.remove("obscure");
//   servicesText.classList.remove("obscure");
//   workContent.classList.remove("obscure");

//   servicesBg.classList.remove("service-wrapper-bottom");
//   servicesBgs[2].classList.remove("service-top");
//   servicesBgs[0].classList.remove("service-right");
//   servicesBgs[1].classList.remove("service-left");

//   servicesBgs[0].classList.remove("services-red-" + [0]);
//   servicesBgs[1].classList.remove("services-green-" + [0]);
//   servicesBgs[2].classList.remove("services-blue-" + [0]);
// });

// const workBgs = document.querySelectorAll(".work-bg");
// const workBg = document.querySelectorAll(".work-bg-container");
// const workTexts = document.querySelectorAll(".work-piece-text");
// const workImgs = document.querySelectorAll(".work-piece-img");
// const workItems = document.querySelectorAll(".work-piece");
// const workText = document.getElementById("work-text");
// const judeImg = document.getElementById("jude-img");
// const johnImg = document.getElementById("john-img");
// const newsImg = document.getElementById("news-img");
// // judeImg.addEventListener("click", () => {
// //   var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
// //   var URL = "https://condescending-chandrasekhar-4d7ab6.netlify.app/";
// //   window.open(URL, "_blank", strWindowFeatures);
// // });

// // johnImg.addEventListener("click", () => {
// //   var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
// //   var URL = "https://sharp-minsky-00b8d2.netlify.app/";
// //   window.open(URL, "_blank", strWindowFeatures);
// // });
// // newsImg.addEventListener("click", () => {
// //   var strWindowFeatures = "location=yes,scrollbars=yes,status=yes";
// //   var URL = "https://clever-albattani-a31680.netlify.app/";
// //   window.open(URL, "_blank", strWindowFeatures);
// // });

// workItems.forEach((item) => {
//   const bgContainer = item.children[4].children[1];
//   item.addEventListener("mouseover", (e) => {
//     item.classList.add("target");
//     titles[4].classList.add("obscure");
//     // cvTitle.classList.add("obscure");
//     cvContent.classList.add("obscure");
//     workText.classList.add("obscure");
//     servicesContent.classList.add("obscure");
//     for (let i = 0; i < workItems.length; i++) {
//       if (!workItems[i].classList.contains("target")) {
//         workItems[i].classList.add("obscure");
//       }
//     }
//     bgContainer.classList.add("normalize");

//     if (item.classList.contains("reverse-piece")) {
//       console.log("oi");
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.add("reverse-work-text-hover-" + [i]);
//       }
//     } else {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.add("work-text-hover-" + [i]);
//       }
//     }
//   });
// });
// workItems.forEach((item) => {
//   item.addEventListener("mouseout", (e) => {
//     item.classList.remove("target");
//     titles[4].classList.remove("obscure");
//     workText.classList.remove("obscure");
//     servicesContent.classList.remove("obscure");
//     cvContent.classList.remove("obscure");
//     for (let i = 0; i < workItems.length; i++) {
//       workItems[i].classList.remove("obscure");
//     }
//   });
// });

// workItems.forEach((text) => {
//   const bgContainer = text.children[4].children[1];
//   text.addEventListener("mouseout", (e) => {
//     bgContainer.classList.remove("normalize");
//     if (text.parentElement.classList.contains("reverse")) {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.remove(
//           "reverse-work-text-hover-" + [i]
//         );
//       }
//     } else {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.remove("work-text-hover-" + [i]);
//       }
//     }
//   });
// });
// workImgs.forEach((img) => {
//   const bgContainer = img.parentElement.children[4].children[1];
//   img.addEventListener("mouseover", (e) => {
//     bgContainer.classList.add("normalize");
//     if (img.parentElement.classList.contains("reverse")) {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.add("work-img-hover-" + [i]);
//       }
//     } else {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.add("work-img-hover-" + [i]);
//       }
//     }
//   });
// });
// workImgs.forEach((img) => {
//   const bgContainer = img.parentElement.children[4].children[1];
//   img.addEventListener("mouseout", (e) => {
//     bgContainer.classList.remove("normalize");
//     if (img.parentElement.classList.contains("reverse")) {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.remove("work-img-hover-" + [i]);
//       }
//     } else {
//       for (let i = 0; i < bgContainer.childElementCount; i++) {
//         bgContainer.children[i].classList.remove("work-img-hover-" + [i]);
//       }
//     }
//   });
// });
// $(".nav-link").on("click", function (e) {
//   if (this.hash !== "") {
//     e.preventDefault();
//     const hash = this.hash;
//     $("html, body").animate(
//       {
//         scrollTop: $(hash).offset().top - 100,
//       },
//       800
//     );
//   }
// });
$(".main-nav-link").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();
    const hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
  }
});
// const mainNav = document.getElementById("main-nav");
// const contactContent = document.getElementById("contact-content");
// mainNav.addEventListener("mouseover", () => {
//   aspiring.classList.add("obscure");
//   educatorContent.classList.add("obscure");
//   engineerContent.classList.add("obscure");
//   developerContent.classList.add("obscure");
//   servicesContent.classList.add("obscure");
//   workContent.classList.add("obscure");
//   cvContent.classList.add("obscure");
//   contactContent.classList.add("obscure");
// });
// mainNav.addEventListener("mouseout", () => {
//   aspiring.classList.remove("obscure");
//   educatorContent.classList.remove("obscure");
//   engineerContent.classList.remove("obscure");
//   developerContent.classList.remove("obscure");
//   servicesContent.classList.remove("obscure");
//   workContent.classList.remove("obscure");
//   cvContent.classList.remove("obscure");
//   contactContent.classList.remove("obscure");
// });
