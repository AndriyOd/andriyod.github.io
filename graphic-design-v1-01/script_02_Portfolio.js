
let numOfImages = 19; // number of images in slider
Init();

let dots = document.querySelectorAll(`.dot`);
let activeDot = 2;
dots[activeDot].classList.add('dot-active');

function Init() {

    // Create and assign image source (path) array
    let imArr = [];
    for (let i = 0; i < 17; i++) {
        imArr[i] = `./images/im-${i}.jpg`;
    }
    // console.log(imArr);

    // Create dots under the slide
    for (let i = 0; i < numOfImages; i++) {
        let p = document.createElement('p');
        p.classList.add('dot');
        document.querySelector('#slider-dots-container').append(p);
    }

    // Assign slides (div) to the array items
    let slides = [];
    for (let i = 0; i < 5; i++) {
        slides[i] = document.querySelector(`.slide-${i}`);
        slides[i].src = `./images/im-${i}.jpg`;
    }
}

// Next-button click-fucntion
document.querySelector('#next').onclick = function () {
    // console.log('next');

    // Dots under slider animating
    dots[activeDot].classList.remove('dot-active');
    if (activeDot == (dots.length - 1)) activeDot = 0;
    else activeDot++;
    dots[activeDot].classList.add('dot-active');

    // Assign slides (div) to the array items
    let slides = [];
    for (let i = 0; i < 5; i++) {
        slides[i] = document.querySelector(`.slide-${i}`);
    }

    //Slides classes reassign for moving
    slides.forEach((item, index, array) => {
        item.classList.remove(`slide-${index}`);

        if (index == 0) {
            item.classList.add(`slide-${array.length - 1}`);
            let nextIm = nextImage(activeDot, numOfImages);
            item.src = `./images/im-${nextIm}.jpg`;
        }
        else
            item.classList.add(`slide-${index - 1}`);
    });
}



// Prev-button click-fucntion
document.querySelector('#prev').onclick = function () {
    console.log('prev');

    // Dots under slider animating
    dots[activeDot].classList.remove('dot-active');
    if (activeDot == 0) activeDot = dots.length - 1;
    else activeDot--;
    dots[activeDot].classList.add('dot-active');

    //let slides = document.querySelectorAll('.slide-container');
    // Assign slides (div) to the array items
    let slides = [];
    for (let i = 0; i < 5; i++) {
        slides[i] = document.querySelector(`.slide-${i}`);
    }

    // Slides classes reassign for moving
    slides.forEach((item, index, array) => {
        item.classList.remove(`slide-${index}`);

        if (index == (array.length - 1)) {
            item.classList.add(`slide-0`);
            let prevIm = prevImage(activeDot, numOfImages);
            item.src = `./images/im-${prevIm}.jpg`;
        }
        else
            item.classList.add(`slide-${index + 1}`);
    });
}


function nextImage (activeSlide, totalImages) {
    let nextImageIndex = 0;

    if (activeSlide >= (totalImages-2))
    activeSlide = activeSlide - totalImages;

    nextImageIndex = activeSlide + 2;
    return nextImageIndex;
}

function prevImage (activeSlide, totalImages) {
    let prevImageIndex = 0;

    if (activeSlide < 2)
    activeSlide = totalImages + activeSlide;

    prevImageIndex = activeSlide - 2;
    return prevImageIndex;
}