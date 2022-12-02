import { doc } from 'prettier';
import { emailValidation } from './components/validate';
import { BASE_URL, LOGIN_ENDPOINT } from './settings/api';

const email = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const emailValidError = document.getElementById('emailValidError');

const password = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');

const form = document.getElementById('signInForm');

const formErrorMessage = document.getElementById('formErrorMessage');
