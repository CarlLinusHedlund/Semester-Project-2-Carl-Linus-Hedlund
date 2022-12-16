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

const signOut = document.getElementById('signOut');
signOut.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});
