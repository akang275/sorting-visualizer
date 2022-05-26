//console.log(JSON.parse(JSON.stringify(obj)));

let visualizerContainer = document.querySelector('.visualizer-container');
let selectionSortButton = document.querySelector('.selection.sort-button');
let mergeSortButton = document.querySelector('.merge.sort-button');
let randomizeArrayButton = document.querySelector('#randomize-array-button');
let speedSlider = document.querySelector('#speed-slider');
let sizeSlider = document.querySelector('#size-slider');
let stopButton = document.querySelector('#stop-button');

let arraySize;
let sortingSpeed;

let barList = visualizerContainer.children;

let array = [];

function randomizeArray() {
    // range is an array to keep track of what numbers have yet to be chosen by random num gen
    let range = [];
    for (let i = 0; i < document.querySelector('#size-slider').value; i++) {
        range.push(i);
    }

    // array is what is actually being sorted
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
};

function updateSpeed() {
    sortingSpeed = speedSlider.max - speedSlider.value + 5;
};

function updateSize() {
    arraySize = sizeSlider.value;
    randomizeArray();
    drawArray();
};

function stopSorting() {
    for (let i of timeoutArray) {
        clearTimeout(i);
    }
    for (let bar of barList) {
        bar.style.backgroundColor = ogColor;
    }
};

// colors
let focusColor = 'var(--titanium-yellow)';
let ogColor = 'var(--spanish-green)';

let timeoutArray = [];

function selectionSort() {
    let timer = 0;
    let storedMinIndex;

    for (let i = 0; i < array.length + 1; i++) {
        
        if (i > 0) {
            timer += sortingSpeed * (array.length - i + 2);
        };
        timeoutArray.push(setTimeout(function() {
            if (i > 0) {
                barList[i-1].style.backgroundColor = ogColor;
                barList[storedMinIndex].style.backgroundColor = ogColor;
            };

            if (i < array.length) {
                let minIndex = i;
                barList[i].style.backgroundColor = focusColor;
                for (let j = i + 1; j < array.length + 1; j++) {
                    timeoutArray.push(setTimeout(function() {
                        if (j < array.length) {
                            if (j > i + 1) {barList[j-1].style.backgroundColor = ogColor};
                            barList[j].style.backgroundColor = focusColor;
                            if (array[j] < array[minIndex]) {
                                minIndex = j;
                            }
                        }
                        if (j == array.length) {
                            barList[j - 1].style.backgroundColor = ogColor;
                            barList[minIndex].style.backgroundColor = focusColor;
                            storedMinIndex = minIndex;

                            barList[i].after(barList[minIndex]);
                            barList[minIndex].after(barList[i]);
                            let temp = array[minIndex];
                            array[minIndex] = array[i];
                            array[i] = temp;
                        }
                    }, sortingSpeed * (j - i)));
                }
            }
        }, timer));
    }
}

mergeSort() {
    
}

selectionSortButton.addEventListener('click', selectionSort);
mergeSortButton.addEventListener('click', mergeSort);

speedSlider.addEventListener('input', updateSpeed);
sizeSlider.addEventListener('input', function() {
    updateSize();
    stopSorting();
});

stopButton.addEventListener('click', stopSorting);

randomizeArrayButton.addEventListener('click', function() {
    stopSorting();
    randomizeArray();
    drawArray();
});

updateSpeed();
updateSize();