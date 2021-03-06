GridClickHandler();

let tilesFrontSideCollection = document.querySelectorAll('.tile-frontside');
tilesFrontSideCollection.forEach((item, index, array) => {
    item.addEventListener('mouseenter', (e) => {
        let upperImg = item.children[1];
        upperImg.classList.add('colorized');
        let title = item.children[2];
        title.classList.add('colorized');
    });
});

// Tiles Decolorizng
//document.querySelector('#Tiles-header').addEventListener('click', tilesDecolorizing);



function GridClickHandler(event) {
    let tiles = document.querySelectorAll('.tile');

    tiles.forEach((item, index, array) => {
        item.addEventListener('click', (event) => {
            if (event.ctrlKey) {
                tilesDecolorizing();
            }
            else {
            item.classList.toggle('tile-rotated');
            AutoRotate(item);
            }
        });
    });
}

function AutoRotate(element) {
    setTimeout(() => {
        element.classList.remove('tile-rotated');
    }, 3000);
}

function tilesDecolorizing() {
    // if (event.ctrlKey) {
        let tilesFrontSideCollection = document.querySelectorAll('.tile-frontside');
        tilesFrontSideCollection.forEach((item) => {
            let upperImg = item.children[1];
            upperImg.classList.remove('colorized');
            let title = item.children[2];
            title.classList.remove('colorized');
    });
} 
