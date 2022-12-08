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
    const countdownString = `${textDay}:${textHour}:${textMinute}:${textSecond}`;
    return countdownString;
};

export default countdown;
