let images = [{
    url: "image/image-1.png",
    title: "Rostov-on-Don, Admiral",
    navClass: "projects-navigaion_item"
}, {
    url: "image/image-2.png",
    title: "Sochi Thieves",
    navClass: "projects-navigaion_item"
}, {
    url: "image/image-3.png",
    title: "Rostov-on-Don Patriotic",
    navClass: "projects-navigaion_item"

}];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".images-project");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");
    let imageNav = document.querySelector(".project-nav")

    initImages();
    initArrows();

    if (options.dots) {
        initDots();
    }

    if (options.titles) {
        initTitles();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
            arrow.addEventListener("click", function () {

                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function () {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        imageNav.querySelector(".active").classList.remove("active");
        imageNav.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        }

    }

    function initTitles() {
        images.forEach((image, index) => {
            let navElem = `<li class="projects-navigaion_item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"><span class="title">${image.title}</span></li>`;
            imageNav.innerHTML += navElem;
        });
        imageNav.querySelectorAll(".projects-navigaion_item").forEach(navElem => {
            navElem.addEventListener("click", function () {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    }
}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 3000
};

document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions);
});
