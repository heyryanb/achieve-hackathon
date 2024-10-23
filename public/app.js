document.addEventListener('DOMContentLoaded', () => {
    const totalResultsInput = document.getElementById('totalResults');
    const spinButton = document.getElementById('spinButton');
    const resetButton = document.getElementById('resetButton');
    const respinButton = document.getElementById('respinButton');
    const wheelContainer = document.getElementById('wheelContainer');
    const resultContainer = document.getElementById('resultContainer');

    let totalResults = 0;
    let result = 0;

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function createWedge(index, total) {
        const wedge = document.createElement('div');
        wedge.classList.add('wedge');
        wedge.style.transform = `rotate(${(360 / total) * index}deg)`;
        const span = document.createElement('span');
        span.textContent = index + 1;
        wedge.appendChild(span);
        return wedge;
    }

    function createWheel(total) {
        wheelContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const wedge = createWedge(i, total);
            wheelContainer.appendChild(wedge);
        }
    }

    function spinWheel() {
        const randomDegree = generateRandomNumber(360);
        wheelContainer.style.transition = 'transform 4s ease-out';
        wheelContainer.style.transform = `rotate(${randomDegree + 3600}deg)`;
        result = Math.ceil((randomDegree % 360) / (360 / totalResults));
        setTimeout(() => {
            resultContainer.textContent = `You receive ${result} slices of pizza`;
        }, 4000);
    }

    let spinButtonClickCount = 0;
    const spinButtonMaxClicks = 5;
    const spinButtonResetTime = 60000; // 1 minute

    spinButton.addEventListener('click', () => {
        if (spinButtonClickCount >= spinButtonMaxClicks) {
            alert('You have reached the maximum number of spins. Please wait a minute before trying again.');
            return;
        }

        totalResults = parseInt(totalResultsInput.value);
        if (totalResults >= 1 && totalResults <= 8) {
            createWheel(totalResults);
            spinWheel();
            spinButtonClickCount++;
            setTimeout(() => {
                spinButtonClickCount--;
            }, spinButtonResetTime);
        } else {
            alert('Please enter a number between 1 and 8');
        }
    });

    resetButton.addEventListener('click', () => {
        totalResultsInput.value = '';
        wheelContainer.innerHTML = '';
        resultContainer.textContent = '';
    });

    respinButton.addEventListener('click', () => {
        if (totalResults >= 1 && totalResults <= 8) {
            spinWheel();
        } else {
            alert('Please enter a number between 1 and 8');
        }
    });
});
