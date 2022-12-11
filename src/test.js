// eslint-disable-next-line import/no-unresolved
import Swiper from 'swiper/bundle';

// import styles bundle
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/bundle';

// init Swiper:
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

console.log(swiper);
