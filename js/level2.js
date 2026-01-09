// Usar a duração padrão ou a configurada
function startLevel2() {
    showLevelIntro(2, () => {
        document.getElementById("button-container").style.display = "flex"; // or 'block'
        document.getElementById("shape-button-container").style.display = "none";
        startCountdown(levelDurations[2] || DEFAULT_LEVEL_DURATION);
        generateStroopText();
        generateLevel2Buttons();
    });
}

function generateLevel2Buttons() {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";
    const buttons = [];
    for (let i = 0; i < colors.length; i++) {
        const button = document.createElement("button");
        button.className = "button";
        let buttonColor;
        do {
            buttonColor = colors[Math.floor(Math.random() * colors.length)];
        } while (buttons.includes(buttonColor));

        button.textContent = buttonColor;
        button.style.color = colorMap[colors[Math.floor(Math.random() * colors.length)]]; // Específico para o Nível 2
        buttons.push(buttonColor);
        buttonContainer.appendChild(button);
        button.addEventListener("click", checkAnswer);
    }
}
