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
    if (userKey) {
        return user;
    } else {
        return null;
    }
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return value;
    } else {
        return [];
    }
}

export { saveToken, saveUser, getUserName };
