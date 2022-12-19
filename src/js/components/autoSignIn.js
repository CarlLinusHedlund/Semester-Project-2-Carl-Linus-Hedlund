import { BASE_URL, LOGIN_ENDPOINT } from '../settings/api';
import { saveToken, saveUser } from '../utils/storage';

async function autoSignIn(emailVal, passwordVal) {
  const userData = {
    email: emailVal,
    password: passwordVal,
  };
  try {
    const response = await fetch(BASE_URL + LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      saveToken(data.accessToken);
      await saveUser(data.name);
      window.location.href = '/';
    } else {
      const err = await response.json();
      const { errors } = err;
      // eslint-disable-next-line no-console
      console.log(errors);
    }
  } catch (err) {
    window.location.href = '/signIn.html';
  }
}
export default autoSignIn;
