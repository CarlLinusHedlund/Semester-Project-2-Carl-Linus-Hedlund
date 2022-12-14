import newCard from './productCard';
import { BASE_URL } from './settings/api';

const productCardWrapper = document.getElementById('productCardWrapper');

async function fetchRecentPosts() {
  const URL = `${BASE_URL}/api/v1/auction/listings?sort=created&sortOrder=desc&limit=12&_active=true&_seller=true`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const responseLists = await response.json();
      console.log(responseLists);
      responseLists.forEach((list) => {
        console.log(list);
        const card = newCard(list.media[0] ? list.media[0] : 'img/png/noMediaFound.png', list.title, list.endsAt, list.bids, list.seller.name, `/specificProduct.html?id=${list.id}`);
        productCardWrapper.innerHTML += card.outerHTML;
      });
    } else {
      const reponseError = await response.json();
      console.log(reponseError);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchRecentPosts();

// for (let i = 0; i < 12; i += 1) {
//     const card = newCard('/img/png/shoe-img.jpg', 'Mordi', '00:13:14:15', (300)[i], 'Carl Linus Hedlund', '/index.html?id=${}');
//     productCardWrapper.innerHTML += card.outerHTML;
// }
