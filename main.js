"use strict";

// Navbar scroll
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--white");
  } else {
    navbar.classList.remove("navbar--white");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for res screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle scrolling when click "contact me"
const homeContact = document.querySelector(".home__contact");
homeContact.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// When scrolling, #home wiil be transfered to transparent
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
const homeContent = document.querySelector(".home-content");
document.addEventListener("scroll", () => {
  homeContent.style.opacity = 1 - window.scrollY / homeHeight;
});

// When arrow button click, scrolling to top.
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  }

  // Remove selection from the previous and select the new
  const selected = document.querySelector(".category__btn.selected");
  selected.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// when handle scrolling, active the navbar menu according to section.
// const sections = document.querySelectorAll("section");

// const options = {
//   root: null, // viewport, container ??? ?????? ??????
//   rootMargin: "0px", // initial 0px, Margin?????? ????????? viewport ??????
//   threshold: 0, // ???????????? ???????????? callback?????? ???????????? ?????? 0 ~ 1
// };

// const callback = (entries, observer) => {
//   console.log(entries, observer);
// };

// const observer = new IntersectionObserver(callback, options);

// sections.forEach((section) => observer.observe(section));

// 1. ?????? ?????? ???????????? ????????? ??????.
// 2. IntersectionObserver??? ???????????? ?????? ???????????? ????????????.
// 3. ???????????? ????????? ???????????? ?????? ???????????? ????????? ?????????.

const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];

const sections = sectionIds.map((item) => document.querySelector(item));
const navItems = sectionIds.map((item) =>
  document.querySelector(`[data-link="${item}"]`)
);

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      selectNavItem(navItems[selectedNavIndex]);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// wheel ???????????? ?????? ???????????????, ????????? ??????????????? scroll ???????????? ???????????? ?????????
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
    // ???????????? ??? ?????? ???????????????
  } else if (
    window.scrollY + window.innerHeight >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
