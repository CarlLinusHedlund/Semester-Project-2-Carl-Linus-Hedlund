import { emailValidation, passwordValidation } from './components/validate';
import { BASE_URL, REGISTER_ENDPOINT, LOGIN_ENDPOINT } from './settings/api';

const form = document.getElementById('signupForm');
console.log(BASE_URL + REGISTER_ENDPOINT);

const name = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');

const email = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const emailValidError = document.getElementById('emailValidError');

const password = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');

const passwordConfirm = document.getElementById('passwordConfirmInput');
const passwordConfirmError = document.getElementById('passwordConfirmError');
const passwordMatchError = document.getElementById('passwordMatchError');

const formErrorMessage = document.getElementById('formErrorMessage');

form.addEventListener('submit', function () {
    event.preventDefault();
    let nameIs = false;
    let emailIs = false;
    let emailIsValid = false;
    let passwordIs = false;
    let passwordConfirmIs = false;
    let passwordMatchIs = false;

    if (name.value.trim().length > 0) {
        nameError.classList.add('hidden');
        nameIs = true;
    } else {
        nameError.classList.remove('hidden');
        nameError.innerText = 'Please enter your name';
    }

    if (email.value.trim().length > 0) {
        emailError.classList.add('hidden');
        emailIs = true;
    } else {
        emailError.classList.remove('hidden');
        emailValidError.classList.add('-bottom-8');
    }

    if (email.value.trim().length && emailValidation(email.value) === true) {
        emailValidError.classList.add('hidden');
        emailIsValid = true;
    } else if (email.value.trim().length && emailValidation(email.value) === !true) {
        if (emailIs === true) {
            emailValidError.classList.add('-bottom-4');
            emailValidError.classList.remove('-bottom-8');
        } else if (emailIs === false) {
            emailValidError.classList.add('-bottom-8');
            emailValidError.classList.remove('-bottom-4');
        }
        emailValidError.classList.remove('hidden');
    }

    if (password.value.trim().length >= 8) {
        passwordError.classList.add('hidden');
        passwordIs = true;
        if ((passwordMatchIs = true)) {
        }
    } else {
        passwordError.classList.remove('hidden');
        passwordError.innerText = 'Contain minimum 8 characters';
    }

    if (passwordConfirm.value.trim().length >= 8) {
        passwordConfirmError.classList.add('hidden');
        passwordConfirmIs = true;
    } else {
        passwordConfirmError.classList.remove('hidden');
        passwordConfirmError.innerText = 'Contain minimum 8 characters';
    }

    passwordMatchIs = passwordValidation(password.value, passwordConfirm.value);

    if (passwordMatchIs == true) {
        passwordMatchError.classList.add('hidden');
    } else {
        if (passwordConfirmIs == true) {
            passwordMatchError.classList.add('-bottom-4');
            passwordMatchError.classList.remove('-bottom-8');
        } else {
            passwordMatchError.classList.add('-bottom-8');
            passwordMatchError.classList.remove('-bottom-4');
        }
        passwordMatchError.classList.remove('hidden');
        passwordMatchError.innerText = "Password doesn't match. Please try again!";
    }

    let formIsValid = nameIs && emailIs && emailIsValid && passwordIs && passwordConfirmIs && passwordMatchIs;
    if (formIsValid) {
        const signUpUserData = {
            name: name.value,
            email: email.value,
            password: password.value,
            avatar: '',
        };
        async function signUpUser() {
            try {
                const response = await fetch(BASE_URL + REGISTER_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(signUpUserData),
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    // location.href = "/index.html"
                } else {
                    formErrorMessage.classList.remove('hidden');
                    formErrorMessage.innerText = `Message: ${data.errors[i].message}`;
                }
            } catch (e) {}
        }
        signUpUser();
    } else {
        console.log('validation failed');
    }
});
