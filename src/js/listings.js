import { countdown } from './components/countdown';
import newCard from './productCard';
import { BASE_URL } from './settings/api';
import { getUserName } from './utils/storage';

const sort = document.getElementById('sort');
const order = document.getElementById('order');
const active = document.getElementById('active');
const inputIndex = document.getElementById('inputIndex');
const seeMoreBtn = document.getElementById('seeMoreBtn');

let sortValue = 'created';
let sortOrder = 'desc';
let activeValue = 'true';
let inputIndexValue = 12;
let offsetValue = 0;

getUserName();

const bannerContent = document.getElementById('bannerContent');
if (getUserName()) {
  console.log('Im signed in!!!!');
  const bannerHeader = document.getElementById('bannerHeader');
  const bannerP = document.getElementById('bannerP');
  const bannerLink = document.getElementById('bannerLink');
  const bannerBtn = document.getElementById('bannerBtn');
  bannerHeader.classList.add('uppercase');
  bannerHeader.innerText = 'Create and publish your own list';
  bannerP.innerText = 'Publish listings for other users to bid on. Apply title, image, date & time for when the listing should end.';
  bannerP.classList.className = 'text-primaryWhite-0 text-base sm:text-xl font-light';
  bannerBtn.innerText = 'Make a list';
  bannerLink.href = '../dashboard/makeAList.html';
  // bannerContent.innerHTML += `<div class="">
  // <h1 class="">Create and publish <br />
  // your own list</h1>
  // </div>`
}

const productCardWrapper = document.getElementById('productCardWrapper');
async function getProducts() {
  try {
    const LISTING_URL_ENDPOINT = `/api/v1/auction/listings?sort=${sortValue}&sortOrder=${sortOrder}&limit=${inputIndexValue}&offset=${offsetValue}&_active=${activeValue}&_seller=true&_bids=true`;
    const response = await fetch(BASE_URL + LISTING_URL_ENDPOINT);
    const data = await response.json();
    const totalItemsP = document.getElementById('totalItems');
    const totalItems = data.length;
    totalItemsP.innerText = `${totalItems}`;
    for (let i = 0; i < data.length; i += 1) {
      let bids;
      if (data[i].bids.length > 0) {
        bids = data[i].bids[data[i].bids.length - 1].amount;
      } else {
        bids = 'No Bids';
      }
      const card = newCard(data[i].media[0] ? data[i].media[0] : 'img/png/noMediaFound.png', data[i].title, data[i].endsAt, bids, data[i].seller.name, `/specificProduct.html?id=${data[i].id}`);

      const test = card.querySelector('.timeLeft');
      test.innerText = countdown(data[i].endsAt);
      productCardWrapper.innerHTML += card.outerHTML;
      if (data.length > inputIndexValue) {
        seeMoreBtn.disabled = true;
      }
    }
    if (!response.ok) {
      seeMoreBtn.disabled = true;
      seeMoreBtn.className = 'hidden';
    }
  } catch (error) {
    console.log('hello');
  }
}
getProducts();

sort.onchange = function sortFunction() {
  if (sort.value === 'created') {
    sortValue = sort.value;
    productCardWrapper.innerHTML = '';
    getProducts();
  } else {
    sortValue = sort.value;
    productCardWrapper.innerHTML = '';
    getProducts();
  }
};

order.onchange = function orderFunction() {
  if (order.value === 'desc') {
    sortOrder = 'desc';
    productCardWrapper.innerHTML = '';
    getProducts();
  } else {
    sortOrder = 'asc';
    productCardWrapper.innerHTML = '';
    getProducts();
  }
};

active.onchange = function activeFunction() {
  if (active.value === 'true') {
    activeValue = 'true';
    productCardWrapper.innerHTML = '';
    getProducts();
  } else {
    activeValue = 'false';
    productCardWrapper.innerHTML = '';
    getProducts();
  }
};

const seeMoreHandler = function seeMoreFunction() {
  offsetValue += inputIndexValue;
  getProducts();
};

inputIndex.onchange = function showCards() {
  inputIndexValue = Number(inputIndex.value);
  productCardWrapper.innerHTML = '';
  getProducts();
};

seeMoreBtn.addEventListener('click', seeMoreHandler);
