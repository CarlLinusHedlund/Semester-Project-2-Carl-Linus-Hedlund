import { BASE_URL, LOGIN_ENDPOINT } from '../settings/api';

function autoSignIn() {
    const signInUser = {
        email: 'carltestv10',
        password: 'carltestv10',
    };
    async function signIn() {
        try {
            const signInResponse = await fetch(BASE_URL + LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    Content: 'application/json',
                },
                body: JSON.stringify(signInUser),
            });
            const signInData = await signInResponse.json();
            console.log(signInData);
        } catch (e) {
            console.log("Couldn't fetch data");
        }
    }
    signIn();
}
autoSignIn();

export { autoSignIn };
