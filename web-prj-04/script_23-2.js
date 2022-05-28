GridClickHandler();

// console.log('item.children');
let tilesFrontSideCollection = document.querySelectorAll('.tile-frontside');
tilesFrontSideCollection.forEach((item, index, array) => {
    item.addEventListener('mouseenter', (e) => {
        // console.log(e);
        let upperImg = item.children[1];
        upperImg.classList.add('colorized');
        let title = item.children[2];
        title.classList.add('colorized');
    });
});


// console.log(tilesFrontSideCollection[0]);
// tilesFrontSideCollection[0].addEventListener('mouseenter', (e) => {
//             console.log(e);
//             // let firstImg = tilesFrontSideCollection[0].children[0];
//             let secondImg = tilesFrontSideCollection[0].children[1];
//             // firstImg.classList.add('colorized');
//             secondImg.classList.add('colorized');
//             // console.log(firstImg);
//             console.log(secondImg);
//         });
// tilesFrontSideCollection.forEach((item, index, array) => {
//     item.addEventListener('mouseenter', (e) => {
//         console.log(e);
//     });
// });

function GridClickHandler() {
    let tiles = document.querySelectorAll('.tile');

    tiles.forEach((item, index, array) => {
        // console.log(item);
        item.addEventListener('click', () => {
            item.classList.toggle('tile-rotated');
            AutoRotate(item);
        });
    });
}

function AutoRotate(element) {
    // console.log(element);
    // element.classList.remove('tile-rotated');
    setTimeout(() => {
        // console.log(element);
        element.classList.remove('tile-rotated');
    }, 3000);
}