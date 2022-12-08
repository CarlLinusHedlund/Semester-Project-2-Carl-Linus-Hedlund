const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const idParam = urlParams.get('id');
console.log(idParam);

const url = `https://api.noroff.dev/api/v1/auction/listings/${idParam}`;
console.log(url);

// const submitBid = document.getElementById('submitBid');
