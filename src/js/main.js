/* eslint-disable space-before-blocks */
import '../css/style.css';

if (window.location.href.includes('/dashboard/')) {
    if (!localStorage.getItem('user')) {
        window.location.href = '/';
    }
}
if (window.location.href.includes('/signup/') || window.location.href.includes('/signup/')) {
    if (localStorage.getItem('user')) {
        window.location.href = '/';
    }
}
