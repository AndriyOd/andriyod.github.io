GridClickHandler();

function GridClickHandler() {
    let tiles = document.querySelectorAll('.tile');

    tiles.forEach((item, index, array) => {
        // console.log(item);
        item.addEventListener('click', () => {
            item.classList.toggle('tile-rotated')
        });
    });
}
