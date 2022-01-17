let visualizerContainer = document.querySelector('.visualizer-container');

let arraySize = document.querySelector('#size-slider').value;
let sortingSpeed = document.querySelector('#speed-slider').value;

let barList = visualizerContainer.children;

let array = [];

function randomizeArray() {
    let range = [];
    for (let i = 0; i < document.querySelector('#size-slider').value; i++) {
        range.push(i);
    }

    array = [];
    for (let i = 0; i < document.querySelector('#size-slider').value; i++) {
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
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = array[i]/array.length * 100 + '%';
        bar.style.width = 1/array.length * 100 + '%';
        visualizerContainer.append(bar);
    };
}

// colors
let focusColor = 'var(--titanium-yellow)';
let ogColor = 'var(--spanish-green)';

function selectionSort() {
    /*let i = 0;
    while (i < array.length) {
        let j = i + 1;
        while (j < array.length) {
            setTimeout(function() {
                barList[j-1].style.backgroundColor = ogColor
                barList[j].style.backgroundColor = focusColor;
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
                if (j == array.length - 1) {
                    barList[i].after(barList[minIndex]);
                    barList[minIndex].after(barList[i]);
                    let temp = array[minIndex];
                    array[minIndex] = array[i];
                    array[i] = temp;
                }
                j += 1;
            }, 500*j);
            
        }
        i += 1;
    }*/
    let timer = 0;
    for (let i = 0; i < array.length; i++) {
        
        if (i > 0) {timer += sortingSpeed * (array.length - i)};

        setTimeout(function() {
            let minIndex = i;
            if (i > 0) {barList[i-1].style.backgroundColor = ogColor};
            barList[i].style.backgroundColor = focusColor;
            for (let j = i + 1; j < array.length; j++) {
                setTimeout(function() {
                    if (j > i + 1) {barList[j-1].style.backgroundColor = ogColor};
                    barList[j].style.backgroundColor = focusColor;
                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                    if (j == array.length - 1) {
                        barList[i].after(barList[minIndex]);
                        barList[minIndex].after(barList[i]);
                        let temp = array[minIndex];
                        array[minIndex] = array[i];
                        array[i] = temp;
                    }
                }, sortingSpeed * j);
            }
        }, timer);
    }
}

let selectionSortButton = document.querySelector('#selection-sort-button');
selectionSortButton.addEventListener('click', selectionSort);

let randomizeArrayButton = document.querySelector('#randomize-array-button');
randomizeArrayButton.addEventListener('click', function() {
    randomizeArray();
    drawArray();
    });

randomizeArray();
drawArray();