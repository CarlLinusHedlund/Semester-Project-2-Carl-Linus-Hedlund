import { getUserName, getToken } from './utils/storage';
import { BASE_URL } from './settings/api';

let tier = document.getElementById('tier');
const starIcon = document.getElementById('starIcon');
const profileImg = document.getElementById('profileImg');
const profileName = document.getElementById('profileName');
const winsCount = document.getElementById('winsCount');

const userName = getUserName();
const token = getToken();

function getUserLevel(wins) {
  if (wins <= 10) {
    starIcon.style.fill = '#FFAEAE';
    tier.innerText = 'Tier 1';
  } else if (wins <= 15) {
    tier = 2;
    starIcon.style.fill = '#DAC063';
    tier.innerText = 'Tier 2';
  }
}

async function getProfile(user, tokenKey) {
  try {
    const URL = `${BASE_URL}/api/v1/auction/profiles/${user}?_listings=true`;
    const profileResponse = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${tokenKey}`,
        'Content-type': 'application/json',
      },
    });
    if (profileResponse.ok) {
      const profileJSON = await profileResponse.json();
      profileName.innerText = profileJSON.name;
      const totalWins = profileJSON.wins.length;
      getUserLevel(totalWins);
      winsCount.innerText = `Wins: ${totalWins}`;
      if (!profileJSON.avatar) {
        const firstLetter = profileJSON.name[0];
        profileImg.innerText = firstLetter;
      } else {
        profileImg.style.backgroundImage = `url('${profileJSON.avatar}')`;
      }
      return profileJSON;
    }
    const profileError = await profileResponse.json();
    return profileError;
  } catch (error) {
    return error;
  }
}
getProfile(userName, token);

export default getProfile;
