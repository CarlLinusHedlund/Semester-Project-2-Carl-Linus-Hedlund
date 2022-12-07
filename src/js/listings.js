import { newCard } from './productCard';
import { BASE_URL } from './settings/api';

const sort = document.getElementById('sort');
const order = document.getElementById('order');
const active = document.getElementById('active');

let sortValue = 'created';
let sortOrder = 'desc';
let activeValue = 'true';

sort.onchange = function () {
    if (sort.value === 'created') {
        sortValue = sort.value;
        console.log(sortValue);
        productCardWrapper.innerHTML = '';
        getProducts();
    } else {
        sortValue = sort.value;
        console.log(sortValue);
        productCardWrapper.innerHTML = '';
        getProducts();
    }
};
order.onchange = function () {
    if (order.value === 'desc') {
        sortOrder = 'desc';
        console.log(sortOrder);
        productCardWrapper.innerHTML = '';
        getProducts();
    } else {
        sortOrder = 'asc';
        console.log(sortOrder);
        productCardWrapper.innerHTML = '';
        getProducts();
    }
};
active.onchange = function () {
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

const productCardWrapper = document.getElementById('productCardWrapper');
async function getProducts() {
    try {
        const LISTING_URL_ENDPOINT = `/api/v1/auction/listings?sort=${sortValue}&sortOrder=${sortOrder}&limit=12&offset=1&_active=${activeValue}&_seller=true&_bids=true`;
        const response = await fetch(BASE_URL + LISTING_URL_ENDPOINT);
        console.log(LISTING_URL_ENDPOINT);
        const responseJSON = await response.json();
        const data = responseJSON;
        // console.log(response);
        const totalItemsP = document.getElementById('totalItems');
        const totalItems = data.length;
        if (!response.ok) {
            for (let y = 0; y < 12; y++) {
                const errorCardContainer = document.createElement('div');
                errorCardContainer.className = 'skeleton h-[350px] rounded-xl productCardShadow overflow-hidden md:hover:scale-110 duration-150';
                productCardWrapper.innerHTML += errorCardContainer.outerHTML;
            }
        } else {
            totalItemsP.innerText = `Found ${totalItems} Items`;
            for (let i = 0; i <= responseJSON.length; i++) {
                const card = newCard(
                    `${data[i].media[0] ? data[i].media[0] : 'img/png/mediaNotAvailable.png'}`,
                    data[i].title,
                    data[i].endsAt,
                    300,
                    data[i].seller.name,
                    `/specificProduct.html?id=${data[i].id}`
                );
                productCardWrapper.innerHTML += card.outerHTML;
            }
        }
    } catch (error) {}
}
getProducts();

const sortByBtn = document.querySelectorAll('input[name=sort]');
// sortByBtn.onchange = function(){
//     for (let i = 0; i < sortByBtn.length; i++){
//         console.log(sortByBtn[i]);
//     }
// }

// for (let i = 0; i < sortByBtn.length; i++){
//     console.log(sortByBtn[i].checked);
//     // sortByBtn.parentElement.classList
//     sortByBtn[i].onchange = function(){
//     if(this.checked){
//         console.log(this.parentElement);

//     }
// } else if(this.checked == false) {
//     this.parentElement.classList.remove("border", "border-black")
// }
// if(sortByBtn[i].checked === false ){
//     sortByBtn[i].parentElement.classList.remove("border", "border-black")
// }
// }
// }
