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
// const errorMessageTags = document.getElementById('errorMessageTags');
const errorMessageImg = document.getElementById('errorMessageImg');
const errorMessageDate = document.getElementById('errorMessageDate');

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
      previewImgContainer.innerHTML += `
      <img src="${urlValue}" class="previewImg absolute h-full w-full opacity-1 z-${zIndex} rounded-lg">
      `;
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

async function makeAList(body) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auction/listings`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const reponseData = await response.json();
      console.log(reponseData);
    } else {
      const responseError = await response.json();
      console.log(responseError);
    }
  } catch (error) {
    console.log(error);
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

  const formIsValid = imgValid && titleValid && dateValid;

  if (formIsValid) {
    const makeAListBody = {
      title: title.value,
      description: description.value,
      tags: substrings,
      media: srcArray,
      endsAt: date.value,
    };
    makeAList(makeAListBody);
  } else {
    console.log('Make a list Validation Failed!!');
  }
});
