var navMain1 = document.querySelector('.main-nav--first');
var navMain3 = document.querySelector('.main-nav--fird');
var navToggle = document.querySelector('.main-nav__toggle');

  navMain1.classList.remove('main-nav--nojs');
  navMain3.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain1.classList.contains('main-nav--closed')) {
    navMain1.classList.remove('main-nav--closed');
    navMain1.classList.add('main-nav--opened');
} else {
    navMain1.classList.add('main-nav--closed');
    navMain1.classList.remove('main-nav--opened');
  }
});

navToggle.addEventListener('click', function() {
  if (navMain3.classList.contains('main-nav--closed')) {
    navMain3.classList.remove('main-nav--closed');
    navMain3.classList.add('main-nav--opened');
  } else {
    navMain3.classList.add('main-nav--closed');
    navMain3.classList.remove('main-nav--opened');
  }
});
