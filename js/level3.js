// Usar a duração padrão ou a configurada
function startLevel3() {
    document.getElementById("button-container").style.display = "flex"; // or 'block'
    document.getElementById("shape-button-container").style.display = "none";
    startCountdown(levelDurations[3] || DEFAULT_LEVEL_DURATION);
    generateStroopText();
    generateLevel3Buttons();
}

function generateLevel3Buttons() {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";
    const buttons = [];
    // Nota: A lógica de cor do texto do stroop no level 3 precisa funcionar com o dataset ou computed style.
    // Mas como stroop-text.style.color é 'red', 'green', é a chave em inglês (CSS).
    const stroopTextColor = document.getElementById("stroop-text").style.color; // Get stroop-text color
    for (let i = 0; i < colors.length; i++) {
        const button = document.createElement("button");
        button.className = "button";
        let buttonColor;
        let buttonBackgroundColor;
        do {
            buttonColor = colors[Math.floor(Math.random() * colors.length)];
            buttonBackgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random background color
        } while (buttons.includes(buttonColor) || colorMap[buttonBackgroundColor] === stroopTextColor); // Ensure different background color

        const buttonKey = buttonColor;
        button.textContent = window.t(buttonKey);
        button.dataset.color = buttonKey;
        button.style.color = "black";
        button.style.backgroundColor = colorMap[buttonBackgroundColor];
        buttons.push(buttonColor);
        buttonContainer.appendChild(button);
        button.addEventListener("click", checkAnswer);
    }
}
