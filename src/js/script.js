import { newCard } from './productCard';

const productCardWrapper = document.getElementById('productCardWrapper');

for (let i = 0; i < 12; i++) {
    const card = newCard('/img/png/shoe-img.jpg', 'Mordi', '00:13:14:15', (300)[i], 'Carl Linus Hedlund', '/index.html?id=${}');
    productCardWrapper.innerHTML += card.outerHTML;
}
