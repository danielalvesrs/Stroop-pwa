// Duração padrão para o nível 4 (pode ser sobrescrita pelas configurações)
const DEFAULT_LEVEL4_DURATION = 90;
let currentShape, currentShapeColor;
let selectedShapeName = null;
let selectedShapeColor = null;

function startLevel4() {
    showLevelIntro(4, () => {
        document.getElementById("button-container").style.display = "none"; // Esconde container de botões de texto
        document.getElementById("shape-button-container").style.display = "flex"; // Exibe container de botões de forma (antigo)
        document.getElementById("shape-name-button-container").style.display = "flex"; // Exibe container de botões de nomes de formas (novo)
        document.getElementById("shape-color-button-container").style.display = "flex"; // Exibe container de botões de cores de formas (novo)

        // Exibir a instrução do nível 4
        const instructionElement = document.getElementById("level4-instruction");
        if (instructionElement) {
            instructionElement.style.display = "block";
        }

        startCountdown(levelDurations[4] || DEFAULT_LEVEL4_DURATION);
        generateLevel4Stimulus();
        generateLevel4NameButtons(); // Nova função para gerar botões de nomes de formas
        generateLevel4ColorButtons(); // Nova função para gerar botões de cores
    });
}

function generateLevel4Stimulus() {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Display shape
    const stroopTextElement = document.getElementById("stroop-text");
    stroopTextElement.textContent = ''; // Clear text
    stroopTextElement.className = 'stroop-text'; // Reset classes
    stroopTextElement.classList.add('shape-display', randomShape);
    stroopTextElement.style.backgroundColor = colorMap[randomColor];

    // Salvar o estímulo original para verificação posterior
    originalShape = randomShape;
    originalColor = randomColor;

    // Definir o estímulo atual
    currentShape = randomShape;
    currentShapeColor = randomColor;

    // Resetar seleções
    selectedShapeName = null;
    selectedShapeColor = null;

    // Adicionar uma mensagem de instrução para o nível 4
    const instructionElement = document.getElementById("level4-instruction");
    if (instructionElement) {
        instructionElement.style.display = "block";
    }
}

function generateLevel4NameButtons() {
    const shapeNameButtonContainer = document.getElementById("shape-name-button-container");
    shapeNameButtonContainer.innerHTML = ""; // Clear previous buttons
    const shapeNames = Object.values(shapesInPortuguese);
    const correctShapeName = shapesInPortuguese[currentShape];
    let nameOptions = [correctShapeName];

    while (nameOptions.length < 3) {
        let randomName;
        do {
            randomName = shapeNames[Math.floor(Math.random() * shapeNames.length)];
        } while (nameOptions.includes(randomName));
        nameOptions.push(randomName);
    }

    shuffleArray(nameOptions); // Embaralha as opções

    nameOptions.forEach(name => {
        const button = document.createElement("button");
        button.className = "button"; // Reutilize a classe 'button' para estilos
        button.textContent = name;
        button.onclick = function () {
            selectShapeName(name);
        };
        shapeNameButtonContainer.appendChild(button);
    });
}


function generateLevel4ColorButtons() {
    const shapeColorButtonContainer = document.getElementById("shape-color-button-container");
    shapeColorButtonContainer.innerHTML = ""; // Clear previous buttons
    const availableColors = [...colors];
    const correctColor = currentShapeColor;
    let colorOptions = [correctColor];

    while (colorOptions.length < 3) {
        let randomColor;
        do {
            randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        } while (colorOptions.includes(randomColor));
        colorOptions.push(randomColor);
    }

    shuffleArray(colorOptions); // Embaralha as opções

    colorOptions.forEach(color => {
        const button = document.createElement("button");
        button.className = "button"; // Reutilize a classe 'button' para estilos
        button.textContent = color;
        button.style.backgroundColor = colorMap[color]; // Define a cor de fundo do botão
        button.onclick = function () {
            selectShapeColor(color);
        };
        shapeColorButtonContainer.appendChild(button);
    });
}

function hideOtherNameButtons(selectedButton) {
    const buttons = document.getElementById("shape-name-button-container").getElementsByTagName("button");
    for (let button of buttons) {
        if (button !== selectedButton) {
            button.style.display = 'none';
        }
    }
}

function hideOtherColorButtons(selectedButton) {
    const buttons = document.getElementById("shape-color-button-container").getElementsByTagName("button");
    for (let button of buttons) {
        if (button !== selectedButton) {
            button.style.display = 'none';
        }
    }
}

function showAllButtons() {
    const nameButtons = document.getElementById("shape-name-button-container").getElementsByTagName("button");
    const colorButtons = document.getElementById("shape-color-button-container").getElementsByTagName("button");

    for (let button of nameButtons) {
        button.style.display = '';
    }
    for (let button of colorButtons) {
        button.style.display = '';
    }
}

function selectShapeName(name) {
    const buttons = document.getElementById("shape-name-button-container").getElementsByTagName("button");
    const selectedButton = Array.from(buttons).find(button => button.textContent === name);
    hideOtherNameButtons(selectedButton);
    selectedShapeName = name;

    // Mudar a cor do estímulo quando a forma é selecionada
    if (!selectedShapeColor) { // Só muda se a cor ainda não foi selecionada
        // Escolher uma nova cor aleatória (diferente da atual)
        let newColor;
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === currentShapeColor);

        // Atualizar o estímulo visual com a nova cor
        const stroopTextElement = document.getElementById("stroop-text");
        stroopTextElement.style.backgroundColor = colorMap[newColor];

        // Atualizar a variável de cor atual
        currentShapeColor = newColor;
    }

    checkLevel4Answer();
}

function selectShapeColor(color) {
    const buttons = document.getElementById("shape-color-button-container").getElementsByTagName("button");
    const selectedButton = Array.from(buttons).find(button => button.textContent === color);
    hideOtherColorButtons(selectedButton);
    selectedShapeColor = color;

    // Mudar a forma do estímulo quando a cor é selecionada
    if (!selectedShapeName) { // Só muda se a forma ainda não foi selecionada
        // Escolher uma nova forma aleatória (diferente da atual)
        let newShape;
        do {
            newShape = shapes[Math.floor(Math.random() * shapes.length)];
        } while (newShape === currentShape);

        // Atualizar o estímulo visual com a nova forma
        const stroopTextElement = document.getElementById("stroop-text");
        stroopTextElement.className = 'stroop-text'; // Reset classes
        stroopTextElement.classList.add('shape-display', newShape);

        // Atualizar a variável de forma atual
        currentShape = newShape;
    }

    checkLevel4Answer();
}

// Variáveis para armazenar o estímulo original
let originalShape, originalColor;

function checkLevel4Answer() {
    if (selectedShapeName && selectedShapeColor) {
        // Verificar se as respostas correspondem ao estímulo original
        const isCorrectShape = selectedShapeName === shapesInPortuguese[originalShape];
        const isCorrectColor = selectedShapeColor === originalColor;

        if (isCorrectShape && isCorrectColor) {
            correctCount++;
            displayFeedback('success');
            updateScore();

            // Gerar novo estímulo
            generateLevel4Stimulus();
            generateLevel4NameButtons();
            generateLevel4ColorButtons();
        } else {
            errorCount++;
            displayFeedback('error');
            if (!isCorrectShape && !isCorrectColor) {
                displayFeedback('error'); // Call again for shake effect if both wrong
            }

            // Restaurar o estímulo original para que o jogador possa tentar novamente
            const stroopTextElement = document.getElementById("stroop-text");
            stroopTextElement.className = 'stroop-text'; // Reset classes
            stroopTextElement.classList.add('shape-display', originalShape);
            stroopTextElement.style.backgroundColor = colorMap[originalColor];

            // Restaurar as variáveis atuais
            currentShape = originalShape;
            currentShapeColor = originalColor;

            showAllButtons();
            selectedShapeName = null;
            selectedShapeColor = null;
        }
    }
}

// Function to shuffle array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
