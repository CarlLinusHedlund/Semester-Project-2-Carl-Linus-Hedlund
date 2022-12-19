const menuBtn = document.getElementById('menu-btn');
const dropdownNav = document.getElementById('dropdownNav');
const li = document.querySelectorAll('.listNav');

menuBtn.addEventListener('click', () => {
  dropdownNav.classList.toggle('h-0');
  dropdownNav.classList.toggle('activeDropdown');
  // menuBtn.classList.toggle('')
  menuBtn.classList.toggle('activeMenu');
  li.forEach((element) => {
    element.classList.toggle('slidIn');
  });
});
