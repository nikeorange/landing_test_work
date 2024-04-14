const participants = document.querySelector(".participants");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".slide-button");
const carouselChildrens = [...carousel.children];

if (document.documentElement.clientWidth >= 1030) {
    var countScrollCards = 3;
    var newCurPage = 3;
    var counter = 3;
    var limiter = 9;
    var timer = 700;
}
if (document.documentElement.clientWidth <= 950) {
    var countScrollCards = 2;
    var newCurPage = 2;
    var counter = 2;
    var limiter = 8;
    var timer = 500;
}
if (document.documentElement.clientWidth <= 450) {
    var countScrollCards = 1;
    var newCurPage = 1;
    var counter = 1;
    var limiter = 7;
    var timer = 500;
}

var countPages = 6;
var newPagination = newCurPage + ' / ' + countPages;
var divPagination = document.querySelector(".pagination");
divPagination.textContent = newPagination;


const disabled = () => {
    for(var i = 0; i < arrowBtns.length; i++){
        arrowBtns[i].disabled = false;
    }
  };

let isAutoPlay = true, timeoutId, timeoutPagination;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});


carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        for(var i = 0; i < arrowBtns.length; i++){
            arrowBtns[i].disabled = true;
        };
        carousel.scrollLeft += btn.id == "prev-slide" ? -(firstCardWidth * countScrollCards) : (firstCardWidth * countScrollCards);
        if (btn.id == "prev-slide") {
            newCurPage = newCurPage - counter;
            if (newCurPage == 0) {
                newCurPage = countPages;                
            };            
            newPagination = newCurPage + ' / ' + countPages;
            divPagination.textContent = newPagination;
        } else {
            newCurPage = newCurPage + counter;
            if (newCurPage == limiter) {
                newCurPage = counter;
            };              
            newPagination = newCurPage + ' / ' + countPages;
            divPagination.textContent = newPagination;           
        };
            setTimeout(disabled, timer);
    });
});

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!participants.matches(":hover")) autoPlay();
    clearTimeout(timeoutPagination);
    if(!participants.matches(":hover")) autoPlayPagination();
}


const autoPlay = () => {
    // if(window.innerWidth < 800 || !isAutoPlay) return; /

    timeoutId = setTimeout(() => carousel.scrollLeft += (firstCardWidth * countScrollCards), 4000);
}
autoPlay();

const autoPlayPagination = () => {
    // if(window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutPagination = setTimeout(() => {
        newCurPage = newCurPage + counter;
        if (newCurPage == limiter) {
            newCurPage = counter;
        };              
        newPagination = newCurPage + ' / ' + countPages;
        divPagination.textContent = newPagination;
      }, 4000)
}
autoPlayPagination();




carousel.addEventListener("scroll", infiniteScroll);
participants.addEventListener("mouseenter", () => clearTimeout(timeoutId));
participants.addEventListener("mouseenter", () => clearTimeout(timeoutPagination));
participants.addEventListener("mouseleave", autoPlay);
participants.addEventListener("mouseleave", autoPlayPagination);