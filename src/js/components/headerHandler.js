import { getUserName } from '../utils/storage';

const navContainer = document.getElementById('navContainer');
const userLinks = document.getElementById('userLinks');
const browse = document.getElementById('browse');

const navBarLinks = document.getElementById('navBarLinks');
const user = getUserName();

const makeListLink = document.createElement('a');
makeListLink.className = 'text-white list-none font-bold text-sm duration-200 hover:scale-110 uppercase';
makeListLink.innerText = 'MAKE A LIST';
makeListLink.href = 'dashboard/makeAList.html';

const dashboard = document.createElement('a');
dashboard.className = 'text-white list-none font-bold text-sm duration-200 hover:scale-110 uppercase';
dashboard.innerText = 'Dashboard';
dashboard.href = 'dashboard/dashboard.html';

const profileNavName = document.createElement('div');
profileNavName.className = 'flex flex-col';
profileNavName.innerHTML = `<p class="text-primaryWhite-0 text-[15px] tracking-wider">${user}</p>
 <a href="/dashboard/dashboard.html" class="font-light text-primaryWhite-0 text-[10px]">View Profile</a>
</div>`;

const profileImg = document.createElement('div');
profileImg.className = 'h-8 w-8 bg-gray-100 rounded-full flex justify-center items-center';
profileImg.innerHTML = '<img class="rounded-full h-5 w-4" src="/img/png/Profile.png"/>';

const profileNameMobile = document.getElementById('profileNameMobile');
const signOutBtn = document.querySelector('.signOutBtn');
const changeProfile = document.querySelector('.changeProfile');
const signInMobile = document.querySelector('.signIn');

if (!user) {
  signInMobile.addEventListener('click', () => {
    if (window.location.href.includes('dashboard')) {
      window.location.href = '../signin/signin.html';
    }
    window.location.href = 'signin/signin.html';
  });
}

if (user) {
  profileNameMobile.innerText = user;
  signInMobile.classList.add('hidden');
  changeProfile.classList.remove('hidden');
  signOutBtn.classList.remove('hidden');
  signOutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });

  changeProfile.addEventListener('click', () => {
    localStorage.clear();
    if (window.location.href.includes('/dashboard/')) {
      window.location.href = '../signin/signin.html';
    }
    window.location.href = 'signin/signin.html';
  });
}

const profileNav = document.createElement('div');
profileNav.className = 'flex gap-2';
profileNav.prepend(profileNavName);
profileNav.append(profileImg);

if (window.location.href.includes('/dashboard/')) {
  makeListLink.href = 'makeAList.html';
  browse.href = '../listings.html';
  dashboard.href = 'dashboard.html';
}

const dashboardLink = document.querySelectorAll('.dashboardLink');
dashboardLink.forEach((element) => {
  if (window.location.href.includes(element.href)) {
    element.classList.add('active');
  }
});

function responsiveHeader() {
  if (user) {
    navBarLinks.prepend(dashboard);
    navBarLinks.prepend(makeListLink);
    userLinks.innerHTML = '';
    navContainer.append(profileNav);
  }
}
responsiveHeader();
