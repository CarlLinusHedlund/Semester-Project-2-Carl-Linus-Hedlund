import { BASE_URL } from '../settings/api';
import { getToken } from '../utils/storage';

const token = getToken();

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');

// modal elements
const modal = document.getElementById('modal');
const editList = document.getElementById('editList');
const closeModal = document.getElementById('closeForm');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');

// Error elements
const modalTitleError = document.getElementById('modalTitleError');
const modalMediaError = document.getElementById('modalMediaError');
const modalDescriptionError = document.getElementById('modalDescriptionError');
const updateListError = document.getElementById('updateListError');

// modal btn´s
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

if (editList) {
  closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
  editList.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const previewImg = document.querySelectorAll('.previewImg');
    previewImg.forEach((element) => {
      element.addEventListener('click', (img) => {
        img.preventDefault();
        img.target.remove();
      });
    });
  });
}

let errorMessage;
async function listUpdate(body) {
  const data = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  const URL = `${BASE_URL}/api/v1/auction/listings/${idParam}`;
  try {
    const response = await fetch(URL, data);
    if (response.ok) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
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
    updateListError.classList.remove('hidden');
    updateListError.innerText = errorMessage;
  }
}

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let titleValid = false;
  let imgValid = false;
  let descriptionValid = false;
  if (modalTitle.value.trim().length === 0) {
    modalTitleError.classList.remove('hidden');
    modalTitleError.innerText = 'Required input field';
    titleValid = false;
  } else if (modalTitle.value.trim().length <= 3) {
    modalTitleError.classList.remove('hidden');
    modalTitleError.innerText = 'At least 4 characters';
    titleValid = false;
  } else {
    modalTitleError.classList.add('hidden');
    titleValid = true;
  }

  const previewImg = document.querySelectorAll('.previewImg');
  if (previewImg.length === 0) {
    modalMediaError.classList.remove('hidden');
    modalMediaError.innerText = 'Add at least one image to the collection';
    imgValid = false;
  } else {
    modalMediaError.classList.add('hidden');

    imgValid = true;
  }
  const substrings = modalTags.value.split(',').map((str) => str.trim());

  if (modalDescription.value.length >= 200) {
    modalDescriptionError.classList.remove('hidden');
    modalDescriptionError.innerText = 'Maximum 200 characters';
    descriptionValid = false;
  } else {
    descriptionValid = true;
  }

  const formValid = imgValid && titleValid && descriptionValid;
  if (formValid) {
    const innerImg = document.querySelectorAll('.innerImg');
    const innerImgArr = Array.from(innerImg).map((img) => img.src);
    const dataObject = {
      title: modalTitle.value,
      description: modalDescription.value,
      tags: substrings,
      media: innerImgArr,
    };
    listUpdate(dataObject);
  }
});

async function deleteList() {
  try {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${idParam}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.href = '/index.html';
    } else {
      const deleteErr = await response.json();
      const { errors } = deleteErr;
      errors.forEach((error) => {
        errorMessage = error;
      });
      throw new Error(errorMessage);
    }
  } catch (error) {
    updateListError.classList.remove('hidden');
    updateListError.innerText = errorMessage;
  }
}

deleteBtn.addEventListener('click', () => {
  deleteList();
});
