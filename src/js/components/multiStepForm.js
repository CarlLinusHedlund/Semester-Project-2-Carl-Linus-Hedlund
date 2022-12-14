import { DateTime } from 'luxon';
import { BASE_URL } from '../settings/api';
import { getToken } from '../utils/storage';

// Selects the Html elements
const title = document.getElementById('title');
const url = document.getElementById('urlInput');
const testImg = document.getElementById('testImg');
const previewImgContainer = document.getElementById('previewImgContainer');
const date = document.getElementById('date');
const applyImg = document.getElementById('applyImg');
const publish = document.getElementById('publish');
const description = document.getElementById('description');
const applyTags = document.getElementById('tagsInput');
const showTags = document.getElementById('showTags');

// Error handling elements
const errorMessageTitle = document.getElementById('errorMessageTitle');
const errorMessageTags = document.getElementById('errorMessageTags');
const errorMessageImg = document.getElementById('errorMessageImg');
const errorMessageDate = document.getElementById('errorMessageDate');
const errorMessageGlobal = document.getElementById('globalMessageBanner')

const now = DateTime.now().toFormat('yyyy-MM-dd');
const hourPlus = DateTime.now().plus({ minutes: 5 }).toFormat('HH:mm');

date.min = `${now}T${hourPlus}`;

applyImg.addEventListener('click', (e) => {
    e.preventDefault();
    const previewImg = [...document.querySelectorAll('.previewImg')];
    const urlValue = url.value;
    const zIndex = previewImg.length * 10;

    testImg.src = '';
    testImg.src = urlValue;
    testImg.onload = function () {
        errorMessageImg.classList.add('hidden');
        errorMessageImg.innerText = '';
        if (previewImg.length < 5) {
            previewImgContainer.innerHTML += `<img src="${urlValue}" class="previewImg absolute h-full w-full opacity-1 z-${zIndex} rounded-lg">`;
        } else {
            errorMessageImg.classList.remove('hidden');
            errorMessageImg.innerText = 'Maximum 5 images.';
        }
    };
    testImg.onerror = function () {
        errorMessageImg.classList.remove('hidden');
        errorMessageImg.innerText = 'Please make sure you added a valid url. PLease try again!';
    };
});

let substrings = [];

applyTags.addEventListener('change', (event) => {
    const string = event.target.value;
    substrings = string.split(',').map((str) => str.trim());
    showTags.innerHTML = '';
    substrings.forEach((strings) => {
        showTags.innerHTML += `<div class="w-fit h-fit bg-gray-100 px-3 py-1 rounded-lg text-xs">${strings}</div>`;
    });
});

let errorMessage;
async function makeAList(body) {
    console.log('publish!!!');
    try {
        const response = await fetch (`${BASE_URL}/api/v1/auction/listings?_bids=true&sort=created&sortOrder=desc`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            errorMessageGlobal.innerText = 'Your list is now published!'
            errorMessageGlobal.className = 'w-72 h-10 flex justify-center items-center text-xs bg-green-200 rounded-md';
        } else {
            const err = await response.json();
            const { errors } = err;
            errorMessage = '';
            errors.forEach((error) => {
            errorMessage = error;
            });
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.log(error);
        errorMessageGlobal.className = 'w-72 h-10 flex justify-center items-center text-xs bg-red-300 rounded-md';
        errorMessageGlobal.innerText = `${errorMessage.message}`;
    }
}

publish.addEventListener('click', (e) => {
    e.preventDefault();
    let titleValid = false;
    let imgValid = false;
    let dateValid = false;

    if (title.value.trim().length === 0) {
        errorMessageTitle.classList.remove('hidden');
        errorMessageTitle.innerText = 'Required input field';
        titleValid = false;
    } else if (title.value.trim().length <= 3) {
        errorMessageTitle.classList.remove('hidden');
        errorMessageTitle.innerText = 'At least 4 characters';
        titleValid = false;
    } else {
        errorMessageTitle.classList.add('hidden');
        titleValid = true;
    }

    if (date.value === '') {
        dateValid = false;
        errorMessageDate.classList.remove('hidden');
        errorMessageDate.innerText = 'Please add valid date.';
        console.log('add date');
    } else {
        dateValid = true;
    }
    const previewImg = document.querySelectorAll('.previewImg');
    const srcArray = Array.from(previewImg).map((img) => img.src);
    if (srcArray.length === 0) {
        imgValid = false;
    } else if (srcArray.length >= 1) {
        imgValid = true;
    }

    console.log(imgValid);
    console.log(titleValid);
    console.log(dateValid);

    const formIsValid = imgValid && titleValid && dateValid;

    if (formIsValid) {
        console.log('Validation succeed');
        console.log(date.value);
        const makeAListBody = {
            title: title.value,
            description: description.value,
            tags: substrings,
            media: srcArray,
            endsAt: date.value,
        };
        console.log(makeAListBody);
        makeAList(makeAListBody);
    } else {
        console.log('Make a list Validation Failed!!');
    }
});
