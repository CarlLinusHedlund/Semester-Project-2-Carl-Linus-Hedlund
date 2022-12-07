import { getUserName } from '../utils/storage';

const navContainer = document.getElementById('navContainer');
const userLinks = document.getElementById('userLinks');

const navBarLinks = document.getElementById('navBarLinks');
// console.log(navBarLinks);
const user = getUserName();

const makeListLink = document.createElement('a');
makeListLink.className = 'text-white list-none font-light text-sm';
makeListLink.innerText = 'MAKE A LIST';
makeListLink.href = '/makeList.html';

const profileNavName = document.createElement('div');
profileNavName.className = 'flex flex-col';
profileNavName.innerHTML = `<p class="text-primaryWhite-0 text-[15px] tracking-wider">${user}</p>
 <a href="/profile.html" class="font-light text-primaryWhite-0 text-[10px]">View Profile</a>
</div>`;

const profileImg = document.createElement('div');
profileImg.className = 'h-8 w-8 bg-gray-100 rounded-full flex justify-center items-center';
profileImg.innerHTML = '<img class="rounded-full h-5 w-4" src="/img/png/Profile.png"/>';

const profileNav = document.createElement('div');
profileNav.className = 'flex gap-2';
profileNav.prepend(profileNavName);
profileNav.append(profileImg);

function responsiveHeader() {
    if (user) {
        navBarLinks.prepend(makeListLink);
        userLinks.innerHTML = '';
        navContainer.append(profileNav);
    }
}

responsiveHeader();
