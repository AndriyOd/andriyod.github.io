// window.addEventListener('scroll', (event)=>{
//     // console.log(window);
//     // console.dir(window);
//     let wscrollY = window.scrollY;
//     let winnerHeight = window.innerHeight;
//     document.querySelector('#wscrollTop').textContent = wscrollY;
//     document.querySelector('#wheight').textContent = winnerHeight;

//     let objectOffsetTop = document.querySelector('#grid-container').offsetTop;
//     let windowOffsetTop = wscrollY + winnerHeight;
//     if (windowOffsetTop > objectOffsetTop) {
//         console.log('We have just reached (touched) the object by bottom of the window');
//     }

// });

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
        // event.stopPropagation();
        let targetId = document.querySelector(event.target.attributes.href.value);
        let scrollTargetCoordY = targetId.offsetTop-80;

        // console.dir(targetId.id);
        // console.dir(typeof targetId.id);

        if (targetId.id == "hContacts") {
            // console.log('In If block');
            scrollTargetCoordY = document.querySelector('#hWeather').offsetTop;
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



