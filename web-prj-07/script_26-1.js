// Auto-fillling paragraphs with "Lorem..." text
let str = document.querySelector('#div01 > p').textContent;
let pArr = document.querySelectorAll('p');
pArr.forEach((item) => item.textContent = str);

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

        if (window.scrollY < scrollTargetCoordY) {
            if (!scrollTimer) {
                scrollTimer = setInterval(SmoothScrollDown, 20, scrollTargetCoordY);
            }
        }

        if (window.scrollY > scrollTargetCoordY) {
            if (!scrollTimer) {
                scrollTimer = setInterval(SmoothScrollUp, 20, scrollTargetCoordY);
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



