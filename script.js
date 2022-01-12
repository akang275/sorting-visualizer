let visualizerContainer = document.querySelector('.visualizer-container');
let sizeSliderContainer = document.querySelector('.size-slider-container');

let arraySize = sizeSliderContainer.children[1].value;
console.log(arraySize);

let array;

function randomizeArray() {
    let range = [];
    for (let c = 0; c < arraySize; c++) {
        range.push(c);
    }

    console.log(range);

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

randomizeArray();
drawArray();

console.log(array);