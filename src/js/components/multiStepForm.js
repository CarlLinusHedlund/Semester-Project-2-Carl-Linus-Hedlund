// Selects the Html elements
const errorMessage = document.getElementById('errorMessage');
const title = document.getElementById('title');
const nextBtns = document.querySelectorAll('[data-next]');
const prevBtns = document.querySelectorAll('[data-prev]');
const steps = document.querySelectorAll('[data-step]');
const url = document.getElementById('url');
const fallbackImage = document.getElementById('fallbackImage');

steps.forEach((step) => {
    console.log(step.dataset.step);
});
let isValid;
const previewImg = document.getElementById('previewImg');
url.addEventListener('change', (e) => {
    previewImg.src = e.target.value;
    previewImg.onload = function () {
        fallbackImage.classList.add('hidden');
        previewImg.classList.remove('hidden');
        console.log('jeg er true');
        // nextBtns[1].disabled = false;
        isValid = true;
    };
    previewImg.onerror = function () {
        console.log('jeg er false');
        previewImg.classList.add('hidden');
        fallbackImage.classList.add('block');
        fallbackImage.classList.remove('hidden');
        // nextBtns[1].disabled = true;
        isValid = false;
    };
    return isValid;
});

nextBtns.forEach((nextBtn) => {
    console.log(nextBtn);
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const titleValue = title.value.length;
        if (nextBtn.dataset.next === '1') {
            if (titleValue > 5) {
                errorMessage.innerText = '';
                errorMessage.className = 'w-full h-0 bg-red-400 hidden justify-center items-center rounded-md text-[10px] duration-500';
                steps[0].classList.toggle('cardActive');
                steps[1].classList.toggle('cardActive');
            } else {
                errorMessage.innerText = 'Please enter title with 5 characters or more to proceed';
                errorMessage.className = 'w-full h-10 bg-red-400 flex justify-center items-center rounded-md text-[10px] duration-400';
            }
        }
        if (nextBtn.dataset.next === '2') {
            if (isValid) {
                errorMessage.innerText = '';
                errorMessage.className = 'w-full h-0 bg-red-400 hidden justify-center items-center rounded-md text-[10px] duration-500';
                steps[1].classList.toggle('cardActive');
                steps[2].classList.toggle('cardActive');
            } else {
                isValid = false;
                errorMessage.innerText = 'Need to add an valid Url, please try again!';
                errorMessage.className = 'w-full h-10 bg-red-400 flex justify-center items-center rounded-md text-[10px] duration-400';
            }
        }
    });
});

prevBtns.forEach((prevBtn) => {
    console.log(prevBtn);
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (prevBtn.dataset.prev === '1') {
            steps[0].classList.toggle('cardActive');
            steps[1].classList.toggle('cardActive');
        }
        if (prevBtn.dataset.prev === '2') {
            steps[1].classList.toggle('cardActive');
            steps[2].classList.toggle('cardActive');
        }
    });
});
