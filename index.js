const button = document.querySelector('.button');
const input = document.querySelector('.input-arr');
const option = document.querySelector('.option');
let arrayDisplay = document.querySelector('.array-display');
let arrayReverse = document.querySelector('.array-reverse');
let stepsDisplay = document.querySelector('.steps-display');

const displayInitial = () => {
    let arr = input.value.split(',').map(Number);
    arrayDisplay.innerHTML = `Initial Array: [${arr.join(', ')}]`;
};

const selection = () => {
    let arr = input.value.split(',').map(Number);
    if (arr.length <= 1) {
        return arr;
    }
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    for (let i = 0; i < n - 1; i++) {
        let prevIndex = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[prevIndex]) {
                prevIndex = j;
            }
        }
        if (prevIndex !== i) {
            let store = arr[i];
            arr[i] = arr[prevIndex];
            arr[prevIndex] = store;
        }
        steps.push({
            array: [...arr], // Make a shallow copy of the array
            pass: i + 1,
            comparisons: comparisons
        });
        comparisons = 0;
    }
    arrayReverse.innerHTML = `Sorted Array: [${arr.join(', ')}]`;
    displaySteps(steps);
};

const bubble = () => {
    let arr = input.value.split(',').map(Number);
    if (arr.length <= 1) {
        return arr;
    }
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        steps.push({
            array: [...arr], // Make a shallow copy of the array
            pass: i + 1,
            comparisons: comparisons
        });
        comparisons = 0;
    }
    arrayReverse.innerHTML = `Sorted Array: [${arr.join(', ')}]`;
    displaySteps(steps);
};

const insertion = () => {
    let arr = input.value.split(',').map(Number);
    if (arr.length <= 1) {
        return arr;
    }
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            comparisons++;
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;

        steps.push({
            array: [...arr], // Make a shallow copy of the array
            pass: i + 1,
            comparisons: comparisons
        });
        comparisons = 0;
    }
    arrayReverse.innerHTML = `Sorted Array: [${arr.join(', ')}]`;
    displaySteps(steps);
};

const quickSort = (arr, steps = [], pass = 1) => {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr[pivotIndex];
    let leftArr = [];
    let rightArr = [];
    let comparisons = 0;

    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // Skip the pivot element
        comparisons++;
        if (arr[i] < pivot) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    steps.push({
        array: [...leftArr, pivot, ...rightArr], // Concatenate the arrays for the step display
        pass: pass,
        comparisons: comparisons
    });

    return [...quickSort(leftArr, steps, pass + 1), pivot, ...quickSort(rightArr, steps, pass + 1)];
};

const quick = () => {
    let arr = input.value.split(',').map(Number);
    if (arr.length <= 1) {
        return arr;
    }
    let steps = [];
    let sortedArray = quickSort(arr, steps);

    arrayReverse.innerHTML = `Sorted Array: [${sortedArray.join(', ')}]`;
    displaySteps(steps);
};

const displaySteps = (steps) => {
    stepsDisplay.innerHTML = '';
    steps.forEach((step, index) => {
        let stepElement = document.createElement('div');
        stepElement.innerHTML = `Pass ${step.pass}: [${step.array.join(', ')}], Comparisons: ${step.comparisons}`;
        stepsDisplay.appendChild(stepElement);
    });
};

button.addEventListener('click', () => {
    displayInitial();
    const selectedOption = option.value;
    if (selectedOption === 'selection') {
        selection();
    } else if (selectedOption === 'bubble') {
        bubble();
    } else if (selectedOption === 'insertion') {
        insertion();
    } else if (selectedOption === 'quick') {
        quick();
    }
});
