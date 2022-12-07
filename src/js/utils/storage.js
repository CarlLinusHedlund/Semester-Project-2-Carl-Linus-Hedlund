const tokenKey = 'token';
const userKey = 'user';

function saveToken(token) {
    saveToStorage(tokenKey, token);
}

function saveUser(user) {
    saveToStorage(userKey, user);
}

function getToken() {
    return getFromStorage(tokenKey);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

function getUserName() {
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

export { saveToken, saveUser, getUserName };
