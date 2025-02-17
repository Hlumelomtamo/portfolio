document.addEventListener("DOMContentLoaded", function() {
    let clickCount = 0;
    const curtain = document.getElementById("curtain");
    const clickMessage = document.getElementById("clickCount");
    const portfolioContent = document.getElementById("portfolioContent");
    const startGameButton = document.getElementById("startGame");

    // Function to handle the click event
    curtain.addEventListener("click", function() {
        clickCount++;

        // Update the click message
        clickMessage.textContent = `Click ${3 - clickCount} more time(s) to unlock the portfolio!`;

        // If 3 clicks are done, reveal the portfolio
        if (clickCount === 3) {
            curtain.classList.add("open");  // Trigger curtain opening animation
            setTimeout(function() {
                curtain.style.display = "none"; // Hide the curtain completely after animation
                portfolioContent.style.display = "block"; // Reveal the portfolio content
                startMatrixEffect(); // Start the matrix effect once portfolio is revealed
            }, 2000); // Delay for animation time
        }
    });

    // Start the matrix effect after the curtain is removed
    function startMatrixEffect() {
        const matrixContainer = document.querySelector('.matrix');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        function createMatrixCharacter() {
            const span = document.createElement('span');
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            span.style.left = `${Math.random() * 100}%`; // Random horizontal position
            span.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
            matrixContainer.appendChild(span);

            // Remove the span after animation is done
            span.addEventListener('animationend', () => {
                span.remove();
            });
        }

        // Continuously create new falling characters
        setInterval(createMatrixCharacter, 100);
    }

    // Game Variables
    let score = 0;
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");

    // Start the game when button is clicked
    startGameButton.addEventListener("click", function() {
        startGameButton.style.display = "none"; // Hide the start button
        startGame();
    });

    function startGame() {
        let gameInterval = setInterval(function() {
            const fallingObject = createFallingObject();
            gameArea.appendChild(fallingObject);

            // Detect if the object is clicked
            fallingObject.addEventListener('click', function() {
                score++;
                scoreDisplay.textContent = score;
                fallingObject.remove(); // Remove the clicked object
            });

            // Remove the object when it reaches the bottom
            setTimeout(function() {
                fallingObject.remove();
            }, 5000); // Remove object after 5 seconds

        }, 1000); // Create a new object every second

        // Stop the game after 30 seconds
        setTimeout(function() {
            clearInterval(gameInterval);
            alert("Game Over! Your final score is: " + score);
        }, 30000);
    }

    function createFallingObject() {
        const object = document.createElement('div');
        object.classList.add('fallingObject');
        const leftPosition = Math.random() * 100;
        object.style.left = `${leftPosition}%`;
        return object;
    }
});
