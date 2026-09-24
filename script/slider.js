
const sliderData = [
    {
        title: 'Coffee-1',
        Image: 'img/coffee-1.png',
    },
    {
        title: 'Coffee-2',
        Image: 'img/coffee-2.png',
    },
    {
        title: 'Coffee-3',
        Image: 'img/coffee-3.png',
    },
]

const slides = document.querySelectorAll('.slider-content');
const nextButton = document.querySelector('.arrow-right');
const prevButton = document.querySelector('.arrow-left');
const sliderControls = document.querySelectorAll('.slider-controls span');
let currentSlide = 0;

sliderControls.forEach(sliderControl => {
    sliderControl.classList.remove("active")

    sliderControl.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide("next")
    })

})
sliderControls[currentSlide].classList.add("active");


function showSlide(direction) {

    slides.forEach(slide => {
        slide.classList.remove("active");
        slide.classList.remove("slide-next");
        slide.classList.remove("slide-prev");
    })

    if (direction === "next") {
        slides[currentSlide].classList.add("slide-next");
    }

    if (direction === "prev") {
        slides[currentSlide].classList.add("slide-prev");
    }
    sliderControls.forEach(sliderControl => {
        sliderControl.classList.remove("active")
    })
    sliderControls[currentSlide].classList.add("active");

    slides[currentSlide].classList.add('active');
}

nextButton.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide("next")

})

prevButton.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1
    }
    showSlide("prev")
})