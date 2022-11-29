const menuBtn = document.getElementById('menu-btn')
const dropdownNav = document.getElementById('dropdownNav')

menuBtn.addEventListener("click", function(){
    console.log('hello');
    dropdownNav.classList.toggle('h-0')
    dropdownNav.classList.toggle('activeDropdown')
    // menuBtn.classList.toggle('')
    menuBtn.classList.toggle('activeMenu')
})


