import '../css/style.css';
// import { getProfile }  from "./profile";

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
