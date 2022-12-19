import getProfile from '../profile';
import { getToken, getUserName } from '../utils/storage';

const userName = getUserName();
const token = getToken();

(async () => {
  const response = await getProfile(userName, token);
  const navProfile = document.getElementById('navProfile');
  const navProfileImg = document.getElementById('navProfileImg');
  const { name } = response;
  navProfile.innerText = name;
  if (!response.avatar) {
    navProfileImg.src = '';
    const firstLetter = response.name[0];
    navProfileImg.innerText = firstLetter;
  } else {
    navProfileImg.style.backgroundImage = `url('${response.avatar}')`;
  }
})();

const signOut = document.getElementById('signOut');
signOut.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});
