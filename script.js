let visualizerContainer = document.querySelector('.visualizer-container');
let sizeSliderContainer = document.querySelector('.size-slider-container');

let arraySize = sizeSliderContainer.children[1].value;

let barList = visualizerContainer.children;

let array;

function randomizeArray() {
    let range = [];
    for (let c = 0; c < arraySize; c++) {
        range.push(c);
    }

    array = [];
    for (let c = 0; c < arraySize; c++) {
        let randomIndex = Math.floor(Math.random() * range.length);
        let randomNum = range[randomIndex] + 1;
        array.push(randomNum);
        range.splice(randomIndex, 1);
    };
};

function drawArray() {
    // clear visualizer container
    while (visualizerContainer.firstChild) {
        visualizerContainer.firstChild.remove();
    }

    // fill visualizer container
    for (let c = 0; c < arraySize; c++) {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = array[c]/array.length * 100 + '%';
        bar.style.width = 1/array.length * 100 + '%';
        visualizerContainer.append(bar);
    };
}

// colors
let focusColor = 'var(--titanium-yellow)';

function selectionSort() {
    for (let c = 0; c < array.length; c++) {
        barList[c].style.backgroundColor = focusColor;
    }
}

randomizeArray();
drawArray();

console.log(array);