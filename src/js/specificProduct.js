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
const img = document.getElementById('mainImg');
const childImgs = document.getElementById('childImgContainer');
const tableBody = document.getElementById('tableBody');
const productId = document.getElementById('productId');

// HTML elements for Error/success handling
const globalErrorMessage = document.getElementById('globalErrorMessage');
const globalErrorList = document.getElementById('errorMessageList');
const bidErrorMessage = document.getElementById('bidErrorMessage');
const bidSuccessMessage = document.getElementById('bidSuccessMessage');
console.log(bidSuccessMessage);

// HTML elements for placing bid
const submitBid = document.getElementById('submitBid');
const bidAmount = document.getElementById('bidAmount');

let errorMessage;
let errorBidMessage;
let bid;
async function getProduct() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const productData = await response.json();
            const productDataMedia = productData.media;
            const productsDataBids = productData.bids;
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
                    }
                    highestBid.innerText = bid;
                    tableBody.innerHTML += `
            <tr class="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600 h-14">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap light:text-white">${productsDataBids[i].bidderName}</th>
                <td class="py-4 px-6 whitespace-nowrap text-xs sm:text-sm">${countdown(productsDataBids[i].created)}</td>
                <td class="py-4 px-6 text-xs sm:text-sm">${productsDataBids[i].amount}</td>
            </tr>`;
                }
            }
            for (let i = 0; i < productDataMedia.length; i += 1) {
                // eslint-disable-next-line quotes
                childImgs.innerHTML += `<div class="h-16 w-16 rounded-sm">
        <img src="${productDataMedia[i]}" alt="${productData.title}" class="w-full h-full rounded-lg cursor-pointer hover:scale-105" />
        </div>`;
            }
            img.src = productData.media[0] ? productData.media[0] : 'img/png/noMediaFound.png';
            img.alt = productData.title;
            title.innerText = productData.title;
            description.innerText = productData.description;
            time.innerHTML = countdown(productData.endsAt);
            setInterval(() => {
                time.innerHTML = countdown(productData.endsAt);
            }, 1000);
            productId.innerText = productData.title;
        } else {
            const err = await response.json();
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
            bidErrorMessage.classList.add = '';
            bidSuccessMessage.className =
                'text-xs absolute -bottom-20 text-primaryBlack-0 h-16 w-[90%] bg-green-300 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
        } else {
            const bidErr = await response.json();
            console.log(bidErr);
            const { errors } = bidErr;
            errors.forEach((bidError) => {
                errorBidMessage = bidError;
            });
            throw new Error(errorBidMessage);
        }
    } catch (error) {
        console.log(error);
        bidErrorMessage.className = 'text-xs absolute -bottom-20 text-primaryBlack-0 h-16 w-[90%] bg-red-400 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
        bidErrorMessage.innerText = `Error Message: ${errorBidMessage.message}`;
        bidSuccessMessage.className = '';
    }
}

submitBid.addEventListener('click', (event) => {
    event.preventDefault();
    if (signedIn) {
        makeBid();
    } else {
        bidErrorMessage.className = 'text-xs absolute -bottom-20 text-primaryBlack-0 h-16 w-full bg-red-400 rounded-lg py-2 px-4 flex flex-col justify-center items-center duration-100 opacity-1';
        bidErrorMessage.innerText = 'Not signed in! Please sign in to make a bid.';
        bidErrorMessage.innerHTML += '<a href="/signin/signIn.html" class="pt-2 uppercase underline">sign in here</a>';
    }
});
