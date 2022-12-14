const countdown = (time) => {
    const countDate = Date.parse(time);
    const now = new Date().getTime();
    const gap = countDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);
    let countdownString = `<p id="timeValue" class="text-2xl text-primaryBlack-0">${textDay}<span class="text-base">d</span> ${textHour}<span class="text-base">h</span> ${textMinute}<span class="text-base">m</span> ${textSecond}<span class="text-base">s</span></p>`;
    if (gap < 0) {
        return 'Auction ended';
    }
    if (textDay === 0 && textHour === 0 && textMinute === 0) {
        countdownString = `${textSecond}<span class="text-[base]">s</span>`;
        return countdownString;
    }
    if (textDay === 0 && textHour === 0) {
        countdownString = `<p id="timeValue" class="text-2xl text-primaryBlack-0">${textMinute}<span class="text-[base]">s</span> ${textSecond}<span class="text-[base]">s</span></p>`;
        return countdownString;
    }
    if (textDay === 0) {
        countdownString = `${textHour}<span class="text-[base]">h</span> ${textMinute}<span class="text-[base]">m</span> ${textSecond}<span class="text-[base]">s</span>`;
        return countdownString;
    }
    return countdownString;
};

// const timeSince = (time) => {
//   const countDate = Date.parse(time);
//   const now = new Date().getTime();
//   const gap = now - countDate;
//   return gap;
// };

// eslint-disable-next-line import/prefer-default-export
export { countdown };
