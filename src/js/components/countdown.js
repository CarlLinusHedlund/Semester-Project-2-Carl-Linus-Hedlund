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
  // let countdownString = `<p id="timeValue" class="text-2xl text-primaryBlack-0">${textDay}<span class="text-base">d</span> ${textHour}<span class="text-base">h</span> ${textMinute}<span class="text-base">m</span> ${textSecond}<span class="text-base">s</span></p>`;
  let countdownString = '';
  if (gap < 0) {
    return 'Auction ended';
  }
  if (textDay === 0 && textHour === 0 && textMinute === 0) {
    countdownString = `${textSecond}S`;
    return countdownString;
    // eslint-disable-next-line no-else-return
  } else if (textDay === 0 && textHour === 0) {
    countdownString = `${textMinute}M : ${textSecond}s`;
    return countdownString;
  } else if (textDay === 0) {
    countdownString = `${textHour}H : ${textMinute}M : ${textSecond}S`;
    return countdownString;
  } else {
    countdownString = `${textDay}D : ${textHour}H : ${textMinute}M : ${textSecond}S`;
    return countdownString;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { countdown };
