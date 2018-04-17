//var navMain1 = document.querySelector('.main-nav--order');
//var navMain3 = document.querySelector('.main-nav--user');
//var navToggle = document.querySelector('.main-nav__toggle');
//
//  navMain1.classList.remove('main-nav--nojs');
//  navMain3.classList.remove('main-nav--nojs');
//
////navMain1.classList.toggle('main-nav--closed');
//
//navToggle.addEventListener('click', function() {
//
//navMain1.classList.toggle('main-nav--closed');
//navMain3.classList.toggle('main-nav--closed');
//});

(function () {

var navMain1 = document.querySelector('.main-nav--order');
var navMain3 = document.querySelector('.main-nav--user');
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

var modal = document.querySelector('.modal-cart');
var modalShadow = document.querySelector('.modal-cart__shadow');
var modalButton = document.querySelector('.modal-cart .btn');
var modalClose = document.querySelector('.modal-cart__close');

modalButton.addEventListener('click', function () {
  modalShadow.style.cssText = 'display:none';
  modal.style.cssText = 'display:none';

});

modalClose.addEventListener('click', function () {
  modalShadow.style.cssText = 'display:none';
  modal.style.cssText = 'display:none';
});

var showModal = function () {
  modalShadow.style.cssText = 'display:block';
  modal.style.cssText = 'display:block';
};

setTimeout(showModal, 5000);

modalButton.addEventListener('click', function () {
  modalShadow.style.cssText = 'display:none';
  modal.style.cssText = 'display:none';

});

modalClose.addEventListener('click', function () {
  modalShadow.style.cssText = 'display:none';
  modal.style.cssText = 'display:none';
});

})();