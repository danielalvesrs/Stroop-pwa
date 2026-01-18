// Usar a duração padrão ou a configurada
function startLevel1() {
    showGameInstructions(() => {
        document.getElementById("button-container").style.display = "flex"; // or 'block'
        document.getElementById("shape-button-container").style.display = "none";
        startCountdown(levelDurations[1] || DEFAULT_LEVEL_DURATION);
        generateStroopText();
        generateLevel1Buttons();
        document.getElementById("next-level-button").style.display = "none"; // Esconde inicialmente
    });
}

function generateLevel1Buttons() {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";
    const buttons = [];
    const colors = getColors();

    for (let i = 0; i < colors.length; i++) {
        const button = document.createElement("button");
        button.className = "button";
        let buttonColor;

        do {
            buttonColor = colors[Math.floor(Math.random() * colors.length)];
        } while (buttons.includes(buttonColor));

        button.textContent = buttonColor;
        button.style.color = "black"; // Específico para o Nível 1
        buttons.push(buttonColor);
        buttonContainer.appendChild(button);
        button.addEventListener("click", checkAnswer);
    }
}

// Adicionar evento para começar um novo jogo no Nível 1
document.getElementById("new-game-button").addEventListener("click", () => {
    location.reload();
});
document.getElementById("new-game-button").addEventListener("click", () => resetGame(1));
