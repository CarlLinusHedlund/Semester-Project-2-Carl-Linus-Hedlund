// Card Container
const card = document.createElement('div');
card.className = 'bg-white h-[350px] min-w-[200px] rounded-xl productCardShadow overflow-hidden md:hover:scale-110 duration-150 w-full card';

const imgContainer = document.createElement('div');
imgContainer.className = 'imgContainer w-full h-[49%] bg-black relative';
const cardImg = document.createElement('img');
cardImg.className = 'object-cover w-full h-full';
const imgLink = document.createElement('a');
imgLink.className = 'absolute top-0 left-0 h-full w-full';
imgContainer.append(imgLink, cardImg);

const cardInfoContainer = document.createElement('div');
cardInfoContainer.className = 'flex flex-col w-full';

// Place a bid BTN
const linkContainer = document.createElement('a');
linkContainer.className = 'flex bg-white h-8 mx-3 px-2 mt-4 justify-between items-center rounded-md productCardBtnShadow';
const linkText = document.createElement('p');
linkText.className = 'text-[10px] ml-2 text-primaryBlack-0 whitespace-nowrap';
linkText.innerText = 'PLACE A NEW BID';
const linkSvg = document.createElement('object');
linkSvg.className = 'mr-2';
linkSvg.data = '/img/svg/arrow.svg';
linkContainer.append(linkText, linkSvg);

// title and author
const cardTitleAndAuthor = document.createElement('div');
cardTitleAndAuthor.className = 'flex flex-col py-2 mx-3 border-b-[1px] border-gray-300 solid';
const cardTitle = document.createElement('h2');
cardTitle.className = 'text-primaryBlack-0 text-[13px] font-semibold max-h-5 w-full truncate pr-4';
const cardAuthor = document.createElement('p');
cardAuthor.className = 'text-[8px] text-gray-300';
cardAuthor.innerText = 'by: ';
const cardAuthorSpan = document.createElement('span');
cardAuthorSpan.className = 'uppercase text-primaryBlack-0';
cardAuthor.append(cardAuthorSpan);
cardTitleAndAuthor.append(cardAuthor, cardTitle);

// HighestBid & time left
const productInfo = document.createElement('div');
productInfo.className = 'flex px-3 py-4 gap-6';
const highestBidContainer = document.createElement('div');
highestBidContainer.className = 'flex flex-col';
const highestBidHeader = document.createElement('p');
highestBidHeader.className = 'text-[9px] text-gray-300 whitespace-nowrap';
highestBidHeader.innerText = 'CURRENT BID';
const hBid = document.createElement('p');
hBid.className = 'text-primaryBlack-0 text-xs font-medium';
const timeLeftContainer = document.createElement('div');
timeLeftContainer.className = 'flex flex-col';
const timeLeftHeader = document.createElement('p');
timeLeftHeader.className = 'text-[9px] text-gray-300';
timeLeftHeader.innerText = 'TIME LEFT';
const timeLeft = document.createElement('p');
timeLeft.className = 'text-primaryBlack-0 text-xs font-medium timeLeft';

highestBidContainer.append(highestBidHeader, hBid);
timeLeftContainer.append(timeLeftHeader, timeLeft);
productInfo.append(highestBidContainer, timeLeftContainer);
cardInfoContainer.append(cardTitleAndAuthor, productInfo);
card.append(imgContainer, cardInfoContainer, linkContainer);
card.id = '';

function newCard(imgURL, title, highestBid, author, link, listId) {
  cardImg.src = imgURL;
  cardAuthorSpan.innerText = author;
  cardTitle.innerText = title;
  hBid.innerText = highestBid;
  linkContainer.href = link;
  imgLink.href = link;
  card.id = listId;
  return card;
}
export default newCard;
