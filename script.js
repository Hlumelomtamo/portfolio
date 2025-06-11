document.addEventListener("DOMContentLoaded", function () {
    let clickCount = 0;
    const curtain = document.getElementById("curtain");
    const clickMessage = document.getElementById("clickCount");
    const portfolioContent = document.getElementById("portfolioContent");
    const startGameButton = document.getElementById("startGame");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    let score = 0;

    // Unlock Curtain on 3 Clicks
    curtain.addEventListener("click", function () {
        clickCount++;
        clickMessage.textContent = `Click ${3 - clickCount} more time(s) to unlock the portfolio!`;

        if (clickCount === 3) {
            curtain.classList.add("open");
            setTimeout(function () {
                curtain.style.display = "none";
                portfolioContent.classList.remove("hidden");
                startMatrixEffect();
            }, 2000);
        }
    });

    // Matrix Effect
    function startMatrixEffect() {
        const matrixContainer = document.querySelector(".matrix");
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        function createMatrixCharacter() {
            const span = document.createElement("span");
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            span.style.left = `${Math.random() * 100}%`;
            span.style.animationDuration = `${Math.random() * 3 + 2}s`;
            matrixContainer.appendChild(span);

            span.addEventListener("animationend", () => {
                span.remove();
            });
        }

        setInterval(createMatrixCharacter, 100);
    }

    // Start Game
    startGameButton.addEventListener("click", function () {
        startGameButton.style.display = "none";
        startGame();
    });

    function startGame() {
        let gameInterval = setInterval(() => {
            const fallingObject = createFallingObject();
            gameArea.appendChild(fallingObject);

            fallingObject.addEventListener("click", () => {
                score++;
                scoreDisplay.textContent = score;
                fallingObject.classList.add("clicked");
                setTimeout(() => fallingObject.remove(), 300);
            });

            fallingObject.addEventListener("animationend", () => {
                fallingObject.remove();
            });
        }, 700);

        setTimeout(() => {
            clearInterval(gameInterval);
            alert("Game Over! Your final score is: " + score);
        }, 30000);
    }

    function createFallingObject() {
        const object = document.createElement("div");
        object.classList.add("fallingObject");

        const leftPosition = Math.random() * 90;
        object.style.left = `${leftPosition}%`;

        const colors = ["#ff6ec7", "#00ffff", "#39ff14", "#ffcc00"];
        object.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        return object;
    }
});
