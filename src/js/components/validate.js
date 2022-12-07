function emailValidation(email) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if (email.match(regEx)) {
        return true;
    }
    return false;
}

function passwordValidation(param1, param2) {
    const passwordValue = param1;
    const confirmPasswordValue = param2;

    if (!passwordValue) {
        return false;
    }
    if (!confirmPasswordValue) {
        return false;
    }
    if (passwordValue !== confirmPasswordValue) {
        return false;
    }
    return true;
}

export { emailValidation, passwordValidation };
