import { emailValidation } from './components/validate';
import { BASE_URL, LOGIN_ENDPOINT } from './settings/api';
import { saveToken, saveUser } from './utils/storage';

const email = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const emailValidError = document.getElementById('emailValidError');

const password = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');

const signInForm = document.getElementById('logInForm');

const formErrorMessage = document.getElementById('formErrorMessage');

if (signInForm) {
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let emailIs = false;
        let emailIsValid = false;
        let passwordIs = false;

        if (email.value.trim().length > 0) {
            emailError.classList.add('hidden');
            emailIs = true;
        } else {
            emailError.classList.remove('hidden');
            emailValidError.classList.add('hidden');
            emailError.innerText = 'Please enter your email!';
        }

        if (email.value.trim() && emailValidation(email.value) === true) {
            emailValidError.classList.add('hidden');
            emailIsValid = true;
        } else if (email.value.trim().length && emailValidation(email.value) !== true) {
            if (emailIs === true) {
                emailValidError.classList.add('-bottom-4');
                emailValidError.classList.remove('-bottom-8');
            } else if (emailIs === false) {
                emailValidError.classList.add('-bottom-8');
                emailValidError.classList.remove('-bottom-4');
            }
            emailValidError.classList.remove('hidden');
            emailValidError.innerText = 'Email require @stud.noroff.no or @noroff.no';
        }

        if (password.value.trim().length >= 8) {
            passwordError.classList.add('hidden');
            passwordIs = true;
        } else {
            passwordError.classList.remove('hidden');
        }

        const formIsValid = emailIs && emailIsValid && passwordIs;

        if (formIsValid) {
            console.log('Validation success');
            signInUser(email.value, password.value);
            async function signInUser(emailVal, passwordVal) {
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
                        console.log(data);
                        console.log(data.accessToken);
                        await saveUser(data.name);
                        window.location.href = '/';
                    } else {
                        const err = await response.json();
                        const { errors } = err;
                        var errorMessage = '';
                        errors.forEach((error) => {
                            errorMessage = error;
                        });
                        console.log(errorMessage);
                        throw new Error(errorMessage);
                    }
                } catch (err) {
                    formErrorMessage.classList.remove('hidden');
                    formErrorMessage.innerText = `${errorMessage.message}`;
                }
            }
        }
    });
} else {
    console.log('VALIDATION FAILED');
}
