import { getUserName } from '../utils/storage';

function headerHandler() {
    let navBar = document.getElementById('navBar');
    let profileNav = document.getElementById('profileNav');
    const user = getUserName();
    console.log(user);
    if (user) {
        profileNav.innerHTML = `<div class="flex flex-col">
        <p class="text-primaryWhite-0 text-[15px]">${user}</p>
        <a href="/profile.html" class="font-light text-primaryWhite-0 text-[9px]">View Profile</a>
        </div>
        <div class="h-10 w-10 flex items-center justify-center rounded-full bg-gray-500">
            <img class="rounded-full" src="./img/png/profile1.png"/>
        </div>`;
    } else {
        navBar.innerHTML = `<li class="text-white list-none font-light text-sm"><a href="#">MAKE A LIST</a></li>`;
        profileNav.innerHTML = `<a href="./signIn.html" class="h-6 w-20 text-white text-xs font-light flex justify-center items-center border border-white rounded-lg">Sign in</a>
        <a href="./signup.html" class="h-6 w-20 rounded-lg bg-white text-xs text-black font-light flex justify-center items-center">Sign Up</a>`;
    }
}
headerHandler();
