import Typed from 'typed.js';

var textDom = document.querySelector('.auto-typed');

var typed = new Typed('.auto-type', {
    strings: ['ART ^1200', 'CAR ^1200', 'CHAIR ^1200', 'BIKE ^1200', 'BAG ^1200', 'BOAT ^1200', 'WINE ^1200'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    cursorChar: '',
});
