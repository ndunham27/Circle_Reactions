document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const numCirclesSelect = document.getElementById("numCircles");
    const radiusSelect = document.getElementById("radius");
    const centerCircleSelect = document.getElementById("centerCircle");
    const gameArea = document.getElementById("gameArea");
    const resultsTable = document.querySelector("#results tbody");

    let numCircles, circleRadius, centerCircle;
    let circleCount = 0;
    let startTime;
    
    startBtn.addEventListener("click", startGame);

    function startGame() {
    numCircles = parseInt(numCirclesSelect.value);
    circleRadius = parseInt(radiusSelect.value);
    centerCircle = centerCircleSelect.checked;
    circleCount = 0;
    resultsTable.innerHTML = "";
    gameArea.innerHTML = "";

    // Show countdown
    gameArea.innerHTML = "<h2 id='countdown'>3</h2>";
    let countdownElement = document.getElementById("countdown");
    let count = 3;

    let countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count > 0 ? count : "GO!";
        
        if (count === 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                gameArea.innerHTML = ""; // Clear countdown
                createCircle();
            }, 500); // Short pause before first circle
        }
    }, 1000);
}

    function createCircle() {
        if (circleCount >= numCircles) return;

        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.width = circle.style.height = `${circleRadius * 2}px`;

        const maxX = gameArea.clientWidth - circleRadius * 2;
        const maxY = gameArea.clientHeight - circleRadius * 2;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        if (centerCircle){        
            const centerDot = document.createElement("div");
            centerDot.classList.add("center-dot");
            circle.appendChild(centerDot);
        }

        startTime = performance.now();
        circle.addEventListener("click", (event) => handleClick(event, x + circleRadius, y + circleRadius));

        gameArea.appendChild(circle);
    }

    function handleClick(event, centerX, centerY) {
        const reactionTime = Math.round(performance.now() - startTime);

        const clickX = event.clientX - gameArea.offsetLeft;
        const clickY = event.clientY - gameArea.offsetTop;
        const distance = Math.round(Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)));

        updateResultsTable(reactionTime, distance);

        event.target.remove();
        circleCount++;
        if (circleCount < numCircles) {
            createCircle();
        }
    }

    function updateResultsTable(time, distance) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${circleCount + 1}</td><td>${time}</td><td>${distance}</td>`;
        resultsTable.appendChild(row);
    }
});