// Hiding all the sections for the following revealing during scrolling
let sections = [];
sections[0] = document.querySelector('#slider-wrapper'); // PORTFOLIO Section
sections[1] = document.querySelector('#grid-container'); // "TYPES OF DESIGN" Section
sections[2] = document.querySelector('#table-container'); // PRICE CALCULATOR Section
sections[3] = document.querySelector('#weather-grid-container'); // WEATHER FORECAST Section

sections.forEach((item)=>{
    item.classList.add('hidden');
});



// Navigation bar behaviour Listeners
document.querySelector('#menu-btn-container').addEventListener('click', (e) => {
    document.querySelector('#menu-btn-container').classList.toggle('active');
    document.querySelector('#nav-plate').classList.toggle('active');
});



// Smooth Scroll to a target after nav-bar link clicking
let scrollTargetCoordY = 0;
let scrollTimer;

let headerLinks = document.querySelectorAll('#menu-header a');
headerLinks.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        let targetId = document.querySelector(event.target.attributes.href.value);
        let scrollTargetCoordY = targetId.offsetTop-80;

        if (targetId.id == "hContacts") {
            scrollTargetCoordY = document.querySelector('#hWeather').offsetTop+5;
        }

        if (window.scrollY < scrollTargetCoordY) {
            if (!scrollTimer) {
                scrollTimer = setInterval(SmoothScrollDown, 10, scrollTargetCoordY);
            }
        }

        if (window.scrollY > scrollTargetCoordY) {
            if (!scrollTimer) {
                scrollTimer = setInterval(SmoothScrollUp, 10, scrollTargetCoordY);
            }
        }
    });
});


function SmoothScrollDown(coordY) {
    window.scroll(0, window.scrollY+20);

    if (window.scrollY >= coordY) {
        clearInterval(scrollTimer);
        scrollTimer = null; 
    }
}

function SmoothScrollUp(coordY) {
    window.scroll(0, window.scrollY-20);

    if (window.scrollY <= coordY || window.scrollY <= 0) {
        clearInterval(scrollTimer);
        scrollTimer = null; 
    }
}



// Animation during scrolling the page
window.addEventListener('scroll', (event)=>{
    let wScrollY = window.scrollY;
    let wHeight = window.innerHeight/2;
    let windowOffsetTop = wScrollY + wHeight;
   
    sections.forEach((item) => {
        let objectOffsetTop = item.offsetTop;

        if (windowOffsetTop > objectOffsetTop) {
            // console.log('We have just reached Target Object Section by center of the window');
            item.classList.remove('hidden');
        }

    });


    // // PORTFOLIO SECTION. Animated appearing 
    // if (windowOffsetTop > objectOffsetTop) {
    //     // console.log('We have just reached Target Object Section by center of the window');
    //     slider.classList.remove('hidden');
    // }
});


