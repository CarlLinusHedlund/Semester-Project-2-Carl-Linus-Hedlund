import { countdown } from './components/countdown';
import newCard from './productCard';
import { BASE_URL } from './settings/api';

const productCardWrapper = document.getElementById('productCardWrapper');
let errorMessage;

async function fetchRecentPosts() {
  const URL = `${BASE_URL}/api/v1/auction/listings?sort=created&sortOrder=desc&limit=12&_active=true&_seller=true&_bids=true`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const responseLists = await response.json();
      responseLists.forEach((list) => {
        let bids;
        const listBid = list.bids;
        if (listBid.length > 0) {
          bids = listBid[listBid.length - 1].amount;
        } else {
          bids = 'No Bids';
        }
        const card = newCard(list.media[0] ? list.media[0] : 'img/png/noMediaFound.png', list.title, bids, list.seller.name, `/specificProduct.html?id=${list.id}`, list.id);
        productCardWrapper.innerHTML += card.outerHTML;
      });

      const listings = responseLists;
      const cards = productCardWrapper.querySelectorAll('.card');
      const timeLeftMap = new Map();
      const endsAtMap = new Map();

      cards.forEach((card) => {
        const timeLeft = card.querySelector('.timeLeft');
        timeLeftMap.set(card.id, timeLeft);
        const currList = listings.find((list) => list.id === card.id);
        if (currList) {
          endsAtMap.set(card.id, currList.endsAt);
        }
      });

      timeLeftMap.forEach((timeLeft, id) => {
        const endsAt = endsAtMap.get(id);
        if (endsAt) {
          const time = countdown(endsAt);
          const timeLeftWrapper = timeLeft;
          timeLeftWrapper.innerText = time;
        }
      });

      setInterval(() => {
        timeLeftMap.forEach((timeLeft, id) => {
          const endsAt = endsAtMap.get(id);
          if (endsAt) {
            const time = countdown(endsAt);
            const timeLeftContainer = timeLeft;
            timeLeftContainer.innerText = time;
          }
        });
      }, 1000);
    } else {
      const responseError = await response.json();
      const { errors } = responseError;
      errorMessage = '';
      errors.forEach((error) => {
        errorMessage = error;
      });
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error);
    const listingErrorMessage = document.querySelector('#listingErrorMessage');
    listingErrorMessage.innerText = errorMessage;
  }
}
fetchRecentPosts();
