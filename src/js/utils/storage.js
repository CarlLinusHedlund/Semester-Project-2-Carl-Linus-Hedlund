const tokenKey = 'token';
const userKey = 'user';

function saveToken(token) {
    // eslint-disable-next-line no-use-before-define
    saveToStorage(tokenKey, token);
}

function saveUser(user) {
    // eslint-disable-next-line no-use-before-define
    saveToStorage(userKey, user);
}

function getToken() {
    // eslint-disable-next-line no-use-before-define
    return getFromStorage(tokenKey);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

function getUserName() {
    // eslint-disable-next-line no-use-before-define
    const user = getFromStorage(userKey);
    if (user) {
        return user;
    }
    return false;
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return value;
    }
    return false;
}

export { saveToken, saveUser, getUserName, getToken };
