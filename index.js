const button = document.querySelector('.button');
const input = document.querySelector('.input-arr');
const option = document.querySelector('.option');
let arrayDisplay = document.querySelector('.array-display');
let arrayReverse = document.querySelector('.array-reverse');
let stepsDisplay = document.querySelector('.steps-display');

const displayInitial = () => {
    let arr = input.value.split(',').map(Number);
    arrayDisplay.innerHTML = `Initial Array: [${arr.join(', ')}]`;
}

const selection = () => {
    let arr = input.value.split(',').map(Number);
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    if (option.value === 'selection') {
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
    }
}

const bubble = () => {
    let arr = input.value.split(',').map(Number);
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    if (option.value === 'bubble') {
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
    }
}

const insertion = () => {
    let arr = input.value.split(',').map(Number);
    let n = arr.length;
    let steps = [];
    let comparisons = 0;

    if (option.value === 'insertion') {
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
    }
}

const displaySteps = (steps) => {
    stepsDisplay.innerHTML = '';
    steps.forEach((step, index) => {
        let stepElement = document.createElement('div');
        stepElement.innerHTML = `Pass ${step.pass}: [${step.array.join(', ')}], Comparisons: ${step.comparisons}`;
        stepsDisplay.appendChild(stepElement);
    });
}

button.addEventListener('click', displayInitial);
button.addEventListener('click', selection);
button.addEventListener('click', bubble);
button.addEventListener('click', insertion);
