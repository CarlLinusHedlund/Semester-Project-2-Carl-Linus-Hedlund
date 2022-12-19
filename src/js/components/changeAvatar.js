import { getToken, getUserName } from '../utils/storage';

const userName = getUserName();
const token = getToken();
const modal = document.getElementById('modal');
const closeForm = document.getElementById('closeForm');
const addImage = document.getElementById('addImage');
const testImg = document.getElementById('testImg');
const modalUrl = document.getElementById('modalUrl');
const modalError = document.getElementById('modalError');
const changeAvatar = document.getElementById('changeAvatar');
const globalErrorMessage = document.getElementById('globalErrorMessage');

let imageValid = false;
let errorMessage;
changeAvatar.addEventListener('click', () => {
  modal.classList.add('flex');
  modal.classList.remove('hidden');
  modalUrl.addEventListener('change', (e) => {
    e.preventDefault();

    const urlValue = modalUrl.value;
    testImg.src = urlValue;
    testImg.onload = function () {
      modalError.classList.add('hidden');
      modalError.innerText = '';
      imageValid = true;
    };
    testImg.onerror = function () {
      modalError.innerText = 'Invalid URL. Please try a new URL.';
      modalError.classList.remove('hidden');
      imageValid = false;
    };

    async function avatarPut(avatar) {
      const data = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(avatar),
      };
      try {
        const URL = `https://api.noroff.dev/api/v1/auction/profiles/${userName}/media`;
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
        globalErrorMessage.className = 'bg-red-400 text-sm flex items-center justify-center';
        globalErrorMessage.innerText = `${errorMessage}`;
      }
    }
    addImage.addEventListener('click', (event) => {
      event.preventDefault();
      const dataObject = { avatar: urlValue };
      if (imageValid) {
        avatarPut(dataObject);
      }
    });
  });
});

closeForm.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
});
