const stagesSlider = document.querySelector(".stages-slider");
const cardWidth = stagesSlider.querySelector(".stage").offsetWidth;
const arrow = document.querySelectorAll(".stages-button");
const stagesPagination = document.querySelectorAll(".circle");

let countCircle = 0;

 // перенесем кнопки раздела "этаапы преображения васюков" под слайдер

const transferringButtons = () => {
    const mobileBtn = document.querySelector(".slider-btn");
    mobileBtn.remove();
    document.querySelector(".mobile-buttons").append(mobileBtn);
};
if (document.documentElement.clientWidth <= 450) {
    transferringButtons();
}

 window.addEventListener('resize', function() {
    if (document.documentElement.clientWidth <= 450) {
        transferringButtons();
    }
  });

// Добавим прослушиватель событий для кнопок со стрелками для прокрутки влево и вправо и обновление нумерации
arrow.forEach(btn => {
    btn.addEventListener("click", () => {
        stagesSlider.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
        if (btn.id == "left") {
            stagesPagination[countCircle].classList.remove("active");
            stagesPagination[countCircle - 1].classList.add("active");
            countCircle =  countCircle - 1;
        } else {
            stagesPagination[countCircle].classList.remove("active");
            stagesPagination[countCircle + 1].classList.add("active");
            countCircle =  countCircle + 1;
        };
    });
});

const disableBtn = () => {
    // Если карусель находится в начале, сделаем кнопку влево неактивной
    if(stagesSlider.scrollLeft === 0) {
        arrow[0].classList.add("disableleft");
        arrow[0].disabled = true;
    } else {
        arrow[0].classList.remove("disableleft");
        arrow[0].disabled = false;
    };
    
    // Если карусель находится в конце, сделаем кнопку вправо неактивной
    if(stagesSlider.scrollLeft == (stagesSlider.scrollWidth - cardWidth)) {
        arrow[1].classList.add("disableright");
        arrow[1].disabled = true;
    } else {
        arrow[1].classList.remove("disableright");
        arrow[1].disabled = false;
    }
};

stagesSlider.addEventListener("scroll", disableBtn);


