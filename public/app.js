let totalResults = 0;
let isSpinning = false;
let spinSpeed = 0;
let angle = 0;
let result = 0;
let spinButtonClickCount = 0;
const spinButtonMaxClicks = 5;
const spinButtonResetTime = 60000; // 1 minute

document.addEventListener('DOMContentLoaded', () => {
    const totalResultsInput = document.getElementById('totalResults');
    const spinButton = document.getElementById('spinButton');
    const resetButton = document.getElementById('resetButton');
    const respinButton = document.getElementById('respinButton');
    const resultContainer = document.getElementById('resultContainer');

    // Spin button click event
    spinButton.addEventListener('click', () => {
        if (spinButtonClickCount >= spinButtonMaxClicks) {
            alert('You have reached the maximum number of spins. Please wait a minute before trying again.');
            return;
        }

        totalResults = parseInt(totalResultsInput.value);
        if (totalResults >= 1 && totalResults <= 8) {
            spinSpeed = random(15, 25);  // Set initial spin speed
            isSpinning = true;
            spinButtonClickCount++;
            setTimeout(() => {
                spinButtonClickCount--;
            }, spinButtonResetTime);
        } else {
            alert('Please enter a number between 1 and 8');
        }
    });

    // Reset button click event
    resetButton.addEventListener('click', () => {
        totalResultsInput.value = '';
        resultContainer.textContent = '';
        angle = 0;
        isSpinning = false;
        loop();  // Restart draw loop to update
    });

    // Respin button click event
    respinButton.addEventListener('click', () => {
        if (totalResults >= 1 && totalResults <= 8) {
            spinSpeed = random(10, 20);  // Set respin speed
            isSpinning = true;
        } else {
            alert('Please enter a number between 1 and 8');
        }
    });
});

// p5.js code for drawing the spinning pizza wheel
function setup() {
    let canvasContainer = document.getElementById('canvasContainer');
    let canvas = createCanvas(500, 500);
    canvas.parent(canvasContainer);
    angleMode(DEGREES);
}

function draw() {
    // Clear background
    background(255);

    // Center the canvas and rotate
    translate(width / 2, height / 2);
    rotate(angle);
    
    // Draw the pizza
    if (totalResults > 0) {
        drawPizza(totalResults);
    } else {
        drawPizza(8); // Default to 8 slices if no input is provided
    }

    // If spinning, update the angle
    if (isSpinning) {
        angle += spinSpeed;
        spinSpeed *= 0.98;  // Simulate friction by gradually reducing spin speed

        // Stop spinning when the speed is very low
        if (spinSpeed < 0.1) {
            isSpinning = false;
            result = getSelectedSlice();
            document.getElementById("resultContainer").textContent = `You receive ${result} slices of pizza`;
            noLoop();  // Stop p5 draw loop when wheel stops
        }
    }
}

function drawPizza(numSlices) {
    // Draw pizza base
    fill(250, 200, 50);  // Dough color
    stroke(0);
    ellipse(0, 0, 400, 400);

    // Draw slices
    for (let i = 0; i < numSlices; i++) {
        let theta = 360 / numSlices;
        fill(255, 69, 0, 150);  // Sauce color
        arc(0, 0, 400, 400, i * theta, (i + 1) * theta, PIE);
    }

    // Draw toppings
    for (let i = 0; i < 20; i++) {
        let toppingAngle = random(360);
        let toppingRadius = random(50, 180);
        let x = toppingRadius * cos(toppingAngle);
        let y = toppingRadius * sin(toppingAngle);
        fill(139, 69, 19);  // Pepperoni color
        noStroke();
        ellipse(x, y, 15, 15);
    }
}

function getSelectedSlice() {
    let selectedAngle = (360 - angle % 360) % 360;  // Normalize the angle to 0-360 degrees
    let sliceSize = 360 / totalResults;
    let selectedSlice = Math.floor(selectedAngle / sliceSize) + 1;
    return selectedSlice;
}

// Define the random function to generate random numbers
function random(min, max) {
    return Math.random() * (max - min) + min;
}
