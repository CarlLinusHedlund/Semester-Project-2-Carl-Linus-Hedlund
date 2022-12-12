import { countdown } from './components/countdown';
import { BASE_URL } from './settings/api';
import { getToken, getUserName } from './utils/storage';

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
const url = `https://api.noroff.dev/api/v1/auction/listings/${idParam}?_seller=true&_bids=true`;
const token = getToken();
const user = getUserName();
const signedIn = token && user;

// HTML elements for products info
const title = document.getElementById('productName');
const description = document.getElementById('description');
const time = document.getElementById('timeValue');
const highestBid = document.getElementById('highestBid');
const tableBody = document.getElementById('tableBody');
const productId = document.getElementById('productId');
const productAuthor = document.getElementById('productAuthor');
const sliderContainer = document.getElementById('sliderContainer');

// HTML elements for placing bid
const submitBid = document.getElementById('submitBid');
const bidAmount = document.getElementById('bidAmount');

// HTML elements for Error/success handling
const globalErrorMessage = document.getElementById('globalErrorMessage');
const globalErrorList = document.getElementById('errorMessageList');
const bidErrorMessage = document.getElementById('bidErrorMessage');
const bidSuccessMessage = document.getElementById('bidSuccessMessage');

let errorMessage;
let errorBidMessage;
let bid;
async function getProduct() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const productData = await response.json();
            console.log(productData);
            const productDataMedia = productData.media;
            const productsDataBids = productData.bids;
            const dataBidsReversed = productsDataBids.reverse();
            dataBidsReversed.forEach((bid) => {
                tableBody.innerHTML += `
                <tr class="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600 h-14">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap light:text-white">${bid.bidderName}</th>
                <td class="py-4 px-6 whitespace-nowrap text-xs sm:text-sm">${bid.created}</td>
                <td class="py-4 px-6 text-xs sm:text-sm">${bid.amount}</td>
                </tr>`;
            });

            if (productsDataBids.length === 0) {
                bid = 'No Bids';
                highestBid.innerText = bid;
                const tableEmpty = document.getElementById('tableEmpty');
                tableEmpty.className = '';
            } else {
                for (let i = 0; i < productsDataBids.length; i += 1) {
                    if (productsDataBids.length > 0) {
                        const bidsLength = productsDataBids.length - 1;
                        bid = productsDataBids[bidsLength].amount;
                        highestBid.innerText = bid;
                    }
                }
            }
            for (let i = 0; i < productDataMedia.length; i += 1) {
                sliderContainer.innerHTML += `<div class="swiper-slide w-full h-full bg-cover bg-center rounded-lg" style="background-image: url(${productDataMedia[i]})">
                    </div>`;
            }
            description.innerText = productData.description;
            time.innerHTML = countdown(productData.endsAt);
            setInterval(() => {
                time.innerHTML = countdown(productData.endsAt);
            }, 1000);
            title.innerText = productData.title;
            productId.innerText = productData.title;
            productAuthor.innerText = productData.seller.name;
        } else {
            const err = await response.json();
            console.log(err);
            const { errors } = err;
            errors.forEach((error) => {
                errorMessage = error;
            });
            throw new Error(errorMessage);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        globalErrorMessage.classList.add('flex');
        globalErrorMessage.classList.remove('hidden');
        globalErrorList.innerText = `Error Message: ${errorMessage.message}`;
    }
}
if (idParam) {
    getProduct();
} else {
    window.location.href = '/';
}

async function makeBid() {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auction/listings/${idParam}/bids`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ amount: Number(bidAmount.value) }),
        });
        if (response.ok) {
            const bidValid = await response.json();
            console.log(bidValid);
            bidErrorMessage.className = 'hidden';
            bidSuccessMessage.className =
                'mx-auto text-xs absolute -bottom-28 text-primaryBlack-0 h-20 w-full bg-green-200 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
            bidSuccessMessage.innerText = 'Bid Succeed! Please refresh site to se update.';
        } else {
            const bidErr = await response.json();
            const { errors } = bidErr;
            errors.forEach((bidError) => {
                errorBidMessage = bidError;
            });
            throw new Error(errorBidMessage);
        }
    } catch (error) {
        bidErrorMessage.className =
            'mx-auto text-xs absolute -bottom-28 text-primaryBlack-0 h-20 md:16 w-full bg-red-400 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
        bidErrorMessage.innerText = `Error Message: ${errorBidMessage.message}`;
        bidSuccessMessage.className = 'hidden';
    }
}

submitBid.addEventListener('click', (event) => {
    event.preventDefault();
    if (signedIn) {
        makeBid();
    } else {
        bidErrorMessage.className =
            'text-xs absolute -bottom-20 text-primaryBlack-0 h-20 md:16 w-full bg-red-400 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
        bidErrorMessage.innerText = 'Not signed in! Please sign in to make a bid.';
        bidErrorMessage.innerHTML += '<a href="/signin/signIn.html" class="pt-2 uppercase underline">sign in here</a>';
    }
});
