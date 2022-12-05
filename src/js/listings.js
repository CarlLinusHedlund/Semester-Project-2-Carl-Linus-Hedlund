import { newCard } from './productCard';
import { BASE_URL } from './settings/api';

const productCardWrapper = document.getElementById('productCardWrapper');
console.log(productCardWrapper);

const LISTING_URL_ENDPOINT = '/api/v1/auction/listings?_seller=true&_bids=true';
console.log(BASE_URL + LISTING_URL_ENDPOINT);
async function getProducts() {
    try {
        const response = await fetch(BASE_URL + LISTING_URL_ENDPOINT);
        console.log(response);
        const responseJSON = await response.json();
        console.log(responseJSON);
        const data = responseJSON;
        for (let i = 0; i <= responseJSON.length; i++) {
            console.log(responseJSON[i]);
            const card = newCard(`${data[i].media[0] ? data[i].media[0] : 'img/png/shoe-img.jpg'}`, data[i].title, data[i].endsAt, 300, data[i].seller.name);
            console.log(card);
            productCardWrapper.innerHTML += card.outerHTML;
        }
    } catch (error) {}
}
getProducts();

// for (let i = 0; i <= 12; i++) {
//    const card = newCard("/img/png/shoe-img.jpg", "Mordi", "time", 300, "Carl Linus Hedlund")
//    console.log(card);
//    productCardWrapper.innerHTML += card.outerHTML;
// }
