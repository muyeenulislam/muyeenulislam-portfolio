// *************set date************
const date = (document.getElementById('date').innerHTML =
  new Date().getFullYear());

// *************nav toggle**********
const navBtn = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

// add event listener
navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links');
});

// ***********nav fixed***********
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 62) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});

// *******************smooth scroll**********
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.classList.remove('show-links');
    const id = e.target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    // position
    let position;
    if (navbar.classList.contains('fixed')) {
      position = element.offsetTop - 62;
    } else {
      position = element.offsetTop - 124;
    }
    if (window.innerWidth < 992) {
      if (navbar.classList.contains('fixed')) {
        position = element.offsetTop - 62;
      } else {
        position = element.offsetTop - 352 - 62;
      }
    }
    //window scroll to
    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });
  });
});

//menu fade animation

const nav = document.querySelector('.navbar');

const handleHover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav-link');
    const logo = link.closest('.navbar').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = this;
  }
};

// passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.3));
nav.addEventListener('mouseout', handleHover.bind(1));

//footer
const footer = document.querySelector('.footer');

//footer link fade animation
const footerLinkHover = function (e) {
  if (e.target.classList.contains('footer-link')) {
    const link = e.target;
    const siblings = link.closest('.footer').querySelectorAll('.footer-link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// passing "argument" into handler
footer.addEventListener('mouseover', footerLinkHover.bind(0.3));
footer.addEventListener('mouseout', footerLinkHover.bind(1));

//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //active tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// light slider
$(document).ready(function () {
  $('#autoWidth').lightSlider({
    autoWidth: true,
    loop: true,
    onSliderLoad: function () {
      $('#autoWidth').removeClass('cS-hidden');
    },
  });
});

//clear input in form
// const btnClear = document.querySelector('.form-btn');
// const inputField = document.querySelectorAll('.form-control');
// btnClear.addEventListener('click', () => {
//   inputField.forEach(i => (i.value = ''));
// });

//nav highlighter
const navLinks = document.querySelectorAll('.nav-link');
const sectionAll = document.querySelectorAll('section');
const activeMenu = function () {
  let len = sectionAll.length;
  while (--len && window.scrollY + 80 < sectionAll[len].offsetTop) {}
  navLinks.forEach(li => li.classList.remove('highlighted'));
  navLinks[len].classList.add('highlighted');
};
window.addEventListener('scroll', activeMenu);

//reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// preloader
const loader = document.querySelector('.preloader');
window.addEventListener('load', () => {
  loader.style.display = 'none';
});
