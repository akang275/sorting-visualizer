let visualizerContainer = document.querySelector('.visualizer-container');
let sizeSliderContainer = document.querySelector('.size-slider-container');

let arraySize = sizeSliderContainer.lastChild.value;

let array;

function randomizeArray() {
    let range = [];
    for (let c = 0; c < arraySize; c++) {
        range.push(c);
    }

    array = [];
    for (let c = 0; c < arraySize; c++) {
        let randomIndex = Math.floor(Math.random() * range.length);
        let randomNum = range[randomIndex];
        array.push(randomNum);
        range.splice(randomIndex, 1);
    };
};

function drawArray() {
    // clear visualizer container
    while (visualizerContainer.firstChild) {
        firstChild.remove();
    }

    // fill visualizer container
    for (let c = 0; c < arraySize; c++) {
        let bar = document.createElement('span');
        bar.className = 'bar';
        bar.style.height = array[c]/array.length + '%';
        visualizerContainer.append(bar);
    };
}

randomizeArray();
drawArray();