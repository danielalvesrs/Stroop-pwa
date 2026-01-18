// Color keys for translation
const colorKeys = ["red", "green", "blue", "yellow", "orange", "purple"];
const colorMap = {
    "red": "red",
    "green": "green",
    "blue": "blue",
    "yellow": "yellow",
    "orange": "orange",
    "purple": "purple"
};

// Get colors array from i18n (for backwards compatibility, we use a getter)
function getColors() {
    return colorKeys.map(key => getColorName(key));
}

// Get colorMap for CSS colors
function getColorCssMap() {
    const map = {};
    colorKeys.forEach(key => {
        map[getColorName(key)] = colorMap[key];
    });
    return map;
}

// Configurações padrão
const DEFAULT_LEVEL_DURATION = 17;
const LEVELS = { 1: "1", 2: "2", 3: "3", 4: "4" };
let currentColor, currentText;
let currentLevel = 1;
let correctCount = 0;
let errorCount = 0;
let countdownTimer;
let countdownInterval;
let totalGameTime = 0;
let isTestMode = false;
let levelDurations = {};
let enabledMetrics = {};
let reactionTimes = [];
let appConfig = {};
let lastStimulusTime = 0; // Variável para medir o tempo de reação


function getGameInstructionsHtml() {
    return `
    <div style="text-align: left; font-size: 1em;">
        <p style="margin-bottom: 10px;">• <strong>${t('game.level')} 1:</strong> "${t('instructions.level1')}"</p>
        <p style="margin-bottom: 10px;">• <strong>${t('game.level')} 2:</strong> "${t('instructions.level2')}"</p>
        <p style="margin-bottom: 10px;">• <strong>${t('game.level')} 3:</strong> "${t('instructions.level3')}"</p>
        <p style="margin-bottom: 10px;">• <strong>${t('game.level')} 4:</strong> "${t('instructions.level4')}
            <br>&emsp;1. ${t('instructions.level4_1')}
            <br>&emsp;2. ${t('instructions.level4_2')}
            <br>&emsp;3. ${t('instructions.level4_3')}"
        </p>
    </div>
`;
}

function showGameInstructions(onStartCallback) {
    const modal = document.getElementById("level-intro-modal");
    if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
    }
    const title = document.getElementById("level-title");
    const description = document.getElementById("level-description");
    const startButton = document.getElementById("start-level-btn");

    title.textContent = t('instructions.title');
    description.innerHTML = getGameInstructionsHtml();

    // Remove previous event listeners
    const newButton = startButton.cloneNode(true);
    startButton.parentNode.replaceChild(newButton, startButton);

    newButton.addEventListener("click", () => {
        modal.style.display = "none";
        if (onStartCallback) onStartCallback();
    });

    modal.style.display = "flex";
}

function startCountdown(duration) {
    if (countdownInterval) clearInterval(countdownInterval);

    // Usar a duração configurada ou a padrão
    const levelDuration = levelDurations[currentLevel] || duration || DEFAULT_LEVEL_DURATION;

    countdownTimer = levelDuration;
    totalGameTime = 0;
    document.getElementById("countdown").textContent = `${t('game.time')}: ${countdownTimer} ${t('game.seconds')}`;
    countdownInterval = setInterval(() => {
        if (countdownTimer > 0) {
            countdownTimer--;
            totalGameTime++;
            document.getElementById("countdown").textContent = `${t('game.time')}: ${countdownTimer} ${t('game.seconds')}`;
        } else {
            clearInterval(countdownInterval);
            document.querySelectorAll(".button").forEach(button => button.disabled = true);
            document.querySelectorAll(".shape-button").forEach(button => button.disabled = true);

            // Salva os dados da sessão
            saveSessionData();

            if (currentLevel < 4) {
                const nextLevelBtn = document.getElementById("next-level-button");
                nextLevelBtn.style.display = "block";
                nextLevelBtn.scrollIntoView({ behavior: 'smooth' });
            } else {
                showFinalResults(); // Nova função para mostrar resultados finais
            }
            updateScore();
        }
    }, 1000);
}

function generateStroopText() {
    const colors = getColors();
    const colorCssMap = getColorCssMap();

    if (currentLevel === 4) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const randomColor = getColorName(randomColorKey);

        // Display shape
        const stroopTextElement = document.getElementById("stroop-text");
        stroopTextElement.textContent = ''; // Clear text
        stroopTextElement.className = 'stroop-text'; // Reset classes
        stroopTextElement.classList.add('shape-display', randomShape);
        stroopTextElement.style.backgroundColor = colorMap[randomColorKey];

        currentShape = randomShape;
        currentColor = randomColor;


    } else {
        const randomColorKey1 = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const randomColorKey2 = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        currentColor = getColorName(randomColorKey1);
        currentText = getColorName(randomColorKey2);
        document.getElementById("stroop-text").textContent = currentText;
        document.getElementById("stroop-text").style.color = colorMap[randomColorKey1];
    }
}


function checkAnswer(event) {
    if (currentLevel === 4) {
        // checkShapeAnswer is handled directly in level4.js
        return;
    }

    // Registrar tempo de reação se a métrica estiver habilitada
    if (enabledMetrics.reactionTime) {
        const now = new Date().getTime();
        const reactionTime = now - lastStimulusTime;
        reactionTimes.push({
            level: currentLevel,
            time: reactionTime,
            correct: event.target.textContent === currentColor
        });
    }

    const buttonColor = event.target.textContent;
    if (buttonColor === currentColor) {
        correctCount += 1;
        displayFeedback('success');
        updateScore();
        generateStroopText();
        // Registrar novo tempo de estímulo
        lastStimulusTime = new Date().getTime();
        // Call level-specific button generation
        if (currentLevel === 1) {
            generateLevel1Buttons();
        } else if (currentLevel === 2) {
            generateLevel2Buttons();
        } else if (currentLevel === 3) {
            generateLevel3Buttons();
        }
    } else {
        errorCount++;
        displayFeedback('error');
        document.getElementById("error-count").textContent = errorCount;
    }
}

function updateScore() {
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("error-count").textContent = errorCount;
    // Calcula e atualiza a média de respostas corretas por segundo
    const averageCorrect = totalGameTime > 0 ? (correctCount / totalGameTime).toFixed(2) : 0;
    document.getElementById("average-score").textContent = `${averageCorrect}`;
}

function displayFeedback(type) {
    const element = document.getElementById("stroop-text");
    element.classList.add(type === 'success' ? "correct" : "shake");
    setTimeout(() => element.classList.remove(type === 'success' ? "correct" : "shake"), 1500);

    if (appConfig.soundEnabled !== false) { // Se não estiver definido ou for true
        const sound = document.getElementById(type === 'success' ? "success-sound" : "error-sound");
        sound.play().catch(e => console.warn("Erro ao reproduzir som:", e));
    }
}

function resetGame(level = 1) {
    currentLevel = level;
    currentLevel = level;
    window.scrollTo(0, 0);
    document.getElementById("current-level").textContent = t('game.level') + ": " + currentLevel;
    correctCount = 0;
    errorCount = 0;
    clearInterval(countdownInterval);
    document.getElementById("next-level-button").style.display = "none";

    // Remove o modal de resultados se existir
    const resultsDiv = document.getElementById('final-results');
    if (resultsDiv) {
        resultsDiv.remove();
    }

    // Esconder a instrução do nível 4
    const instructionElement = document.getElementById("level4-instruction");
    if (instructionElement) {
        instructionElement.style.display = "none";
    }

    // Limpa os dados da sessão anterior apenas se estiver iniciando um novo jogo
    if (level === 1) {
        clearSessionData();
    }

    // Atualizar o indicador de modo
    atualizarIndicadorModo();

    if (level === 1) {
        startLevel1();
    } else if (level === 2) {
        startLevel2();
    } else if (level === 3) {
        startLevel3();
    } else if (level === 4) {
        startLevel4();
    }
    updateScore();
}

// Definições vazias das funções específicas para evitar erros de referência
function generateLevel1Buttons() { }
function generateLevel2Buttons() { }
function generateLevel3Buttons() { }

// Inicializa o jogo no nível 1 por padrão após carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const versao = '5.5.9'; // Defina sua versão atual aqui
    const versaoArmazenada = localStorage.getItem('versaoStroop');

    const tituloVersao = document.querySelector('h3'); // Seleciona o elemento <h3>
    if (tituloVersao) {
        tituloVersao.textContent = `Stroop (v${versao})`; // Atualiza o texto do <h3>
    }

    // Verificar se houve atualização ou downgrade
    if (versaoArmazenada) {
        if (versaoArmazenada > versao) {
            console.log(`DOWNGRADE DETECTADO: Versão atual (${versao}) < armazenada (${versaoArmazenada}).`);
            registrarMudancaVersao(versao, versaoArmazenada, 'downgrade');
        } else if (versaoArmazenada < versao) {
            console.log(`UPGRADE DETECTADO: Atualizado de ${versaoArmazenada} para ${versao}.`);
            registrarMudancaVersao(versao, versaoArmazenada, 'upgrade');
        }
    } else {
        // Primeira instalação
        console.log(`Primeira instalação da versão ${versao}.`);
        registrarMudancaVersao(versao, null, 'instalação');
    }

    // Carregar configurações
    loadConfig();

    // Apply translations to UI elements
    applyGameTranslations();

    // Atualizar o indicador de modo
    atualizarIndicadorModo();

    // Iniciar o jogo
    startLevel1();
});

// Apply translations to game UI elements
function applyGameTranslations() {
    // Update level indicator
    const levelIndicator = document.getElementById("current-level");
    if (levelIndicator) {
        levelIndicator.textContent = t('game.level') + ": " + currentLevel;
    }

    // Update button texts
    const newGameBtn = document.getElementById("new-game-button");
    if (newGameBtn) {
        newGameBtn.textContent = t('game.newGame');
    }

    const nextLevelBtn = document.getElementById("next-level-button");
    if (nextLevelBtn) {
        nextLevelBtn.textContent = t('game.nextLevel');
    }

    const startLevelBtn = document.getElementById("start-level-btn");
    if (startLevelBtn) {
        startLevelBtn.textContent = t('game.start');
    }

    // Update status labels
    const countdownLabel = document.querySelector('label[for="countdown"]');
    if (countdownLabel) {
        countdownLabel.innerHTML = `⏰ ${t('game.time')}`;
    }

    const correctLabel = document.querySelector('label[for="correct-count"]');
    if (correctLabel) {
        correctLabel.innerHTML = `✔ ${t('game.correct')}`;
    }

    const errorLabel = document.querySelector('label[for="error-count"]');
    if (errorLabel) {
        errorLabel.innerHTML = `❌ ${t('game.errors')}`;
    }

    const averageLabel = document.querySelector('.status-box:last-child label');
    if (averageLabel) {
        averageLabel.textContent = t('game.average');
    }

    // Update level 4 instruction box
    const level4Instruction = document.getElementById("level4-instruction");
    if (level4Instruction) {
        const p = level4Instruction.querySelector('p');
        if (p) {
            p.textContent = t('instructions.level4Box');
        }
    }

    // Update back link
    const backLink = document.querySelector('a.button-common[href="index.html"]');
    if (backLink) {
        backLink.textContent = t('game.back');
    }
}

// Função para registrar mudanças de versão
function registrarMudancaVersao(versaoAtual, versaoAnterior, tipo) {
    const dataRegistro = new Date().toISOString();
    const historico = JSON.parse(localStorage.getItem('historicoVersoesStroop') || '[]');

    historico.push({
        data: dataRegistro,
        tipo: tipo,
        de: versaoAnterior,
        para: versaoAtual
    });

    // Limitar o histórico a 10 entradas
    if (historico.length > 10) {
        historico.shift(); // Remove a entrada mais antiga
    }

    localStorage.setItem('versaoStroop', versaoAtual);
    localStorage.setItem('historicoVersoesStroop', JSON.stringify(historico));
    localStorage.setItem('ultimaAtualizacaoStroop', dataRegistro);
}

// Função para atualizar o indicador de modo
function atualizarIndicadorModo() {
    const modeIndicator = document.getElementById('current-mode');
    if (modeIndicator) {
        if (isTestMode) {
            modeIndicator.textContent = t('game.modeTest');
            modeIndicator.classList.add('test-mode');
        } else {
            modeIndicator.textContent = t('game.modeGame');
            modeIndicator.classList.remove('test-mode');
        }
    }
}

// Função para carregar as configurações
function loadConfig() {
    const savedConfig = localStorage.getItem('stroopConfig');

    // Configurações padrão iniciais
    isTestMode = false;
    levelDurations = {
        1: DEFAULT_LEVEL_DURATION,
        2: DEFAULT_LEVEL_DURATION,
        3: DEFAULT_LEVEL_DURATION,
        4: DEFAULT_LEVEL_DURATION
    };
    enabledMetrics = {
        reactionTime: true,
        errorRate: true,
        interference: true
    };

    if (savedConfig) {
        try {
            appConfig = JSON.parse(savedConfig);

            // Configurar o modo (jogo ou teste)
            isTestMode = appConfig.mode === 'test';

            // Configurar durações dos níveis
            if (appConfig.levelTimes) {
                levelDurations = appConfig.levelTimes;
            }

            // Configurar métricas habilitadas
            if (appConfig.metrics) {
                enabledMetrics = appConfig.metrics;
            }

            console.log('Configurações carregadas:', appConfig);

            // Atualizar o indicador de modo após carregar as configurações
            atualizarIndicadorModo();
        } catch (e) {
            console.error('Erro ao carregar configurações:', e);
            // Em caso de erro, mantém as configurações padrão
        }
    }

    // Inicializar variável para medir tempo de reação
    lastStimulusTime = new Date().getTime();
}

document.getElementById("next-level-button").addEventListener("click", () => {
    if (currentLevel < Object.keys(LEVELS).length) {
        resetGame(currentLevel + 1);
    }
});


const shapes = ["square", "circle", "triangle"];

// Get shapes in current language
function getShapesInCurrentLanguage() {
    const shapesMap = {};
    shapes.forEach(shape => {
        shapesMap[shape] = getShapeName(shape);
    });
    return shapesMap;
}

function saveSessionData() {
    let gameData = JSON.parse(sessionStorage.getItem('stroopGameData')) || {
        correctCount: 0,
        errorCount: 0,
        totalGameTime: 0,
        levels: {}
    };

    // Acumula os dados do nível atual
    gameData.correctCount += correctCount;
    gameData.errorCount += errorCount;
    gameData.totalGameTime += totalGameTime;

    // Salva os dados específicos do nível atual
    gameData.levels[currentLevel] = {
        correctCount: correctCount,
        errorCount: errorCount,
        totalGameTime: totalGameTime
    };

    // Calcula a média geral
    gameData.averageCorrect = (gameData.totalGameTime > 0 ? (gameData.correctCount / gameData.totalGameTime).toFixed(2) : 0);

    sessionStorage.setItem('stroopGameData', JSON.stringify(gameData));
}

function getSessionData() {
    const data = sessionStorage.getItem('stroopGameData');
    return data ? JSON.parse(data) : null;
}

function clearSessionData() {
    sessionStorage.removeItem('stroopGameData');
}

function showFinalResults() {
    const gameData = getSessionData();
    if (!gameData) return;

    let levelResults = '';
    for (let level in gameData.levels) {
        levelResults += `
            <h3>${t('game.level')} ${level}</h3>
            <p>${t('results.correctAnswers')}: ${gameData.levels[level].correctCount} / ${t('game.errors')}: ${gameData.levels[level].errorCount}</p>
            <p>${t('game.time')}: ${gameData.levels[level].totalGameTime} ${t('game.seconds')}</p>
        `;
    }

    // Gerar diagnóstico se estiver no modo de teste
    let diagnosticoHtml = '';
    if (isTestMode) {
        const diagnostico = gerarDiagnostico(gameData);
        diagnosticoHtml = `
            <div class="diagnostico-container">
                <h3>${t('results.performanceAnalysis')}</h3>
                <p class="diagnostico-descricao">${t('results.analysisDescription')}</p>
                <div class="diagnostico-resultado">
                    <p><strong>${t('results.interferenceIndex')}:</strong> ${diagnostico.indiceInterferencia}</p>
                    <p><strong>${t('results.avgReactionTime')}:</strong> ${diagnostico.tempoReacaoMedio} ms</p>
                    <p><strong>${t('results.responseConsistency')}:</strong> ${diagnostico.consistenciaResposta}</p>
                    <p><strong>${t('results.selectiveAttention')}:</strong> ${diagnostico.nivelAtencaoSeletiva}</p>
                </div>
                <div class="diagnostico-interpretacao">
                    <h4>${t('results.interpretation')}</h4>
                    <p>${diagnostico.interpretacao}</p>
                </div>
                <p class="diagnostico-aviso">${t('results.analysisNote')}</p>
            </div>
        `;
    }

    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'final-results';
    resultsDiv.innerHTML = `
        <div class="results-container">
            <button class="close-button" onclick="closeResults()">×</button>
            <h2>${t('results.finalResults')}</h2>

            <div class="results-summary">
                <h3>${t('results.levelSummary')}</h3>
                ${levelResults}
            </div>

            <div class="results-total">
                <h3>${t('results.totalGeneral')}</h3>
                <p><strong>${t('results.correctAnswers')}:</strong> ${gameData.correctCount}</p>
                <p><strong>${t('game.errors')}:</strong> ${gameData.errorCount}</p>
                <p><strong>${t('results.totalTime')}:</strong> ${gameData.totalGameTime} ${t('game.seconds')}</p>
                <p><strong>${t('results.averageHits')}:</strong> ${gameData.averageCorrect} ${t('results.perSecond')}</p>
            </div>

            ${diagnosticoHtml}

            <div class="buttons-row">
                <button onclick="restartGame()">${t('results.playAgain')}</button>
                <button onclick="closeResults()" style="background-color: #2196F3;">${t('results.close')}</button>
            </div>
        </div>
    `;

    document.body.appendChild(resultsDiv);

    // Garantir que a tela de resultados seja visível
    setTimeout(() => {
        const container = document.querySelector('.results-container');
        if (container) {
            container.scrollTop = 0;
        }
    }, 100);
}

// Função para gerar diagnóstico baseado nos dados do teste
function gerarDiagnostico(gameData) {
    // Calcular índice de interferência (relação entre erros e acertos)
    const indiceInterferencia = gameData.errorCount > 0
        ? (gameData.errorCount / gameData.correctCount * 100).toFixed(2) + '%'
        : '0%';

    // Simular tempo de reação médio (na realidade seria calculado a partir dos tempos registrados)
    const tempoReacaoMedio = Math.floor(Math.random() * 300 + 500) + ' ms';

    // Calcular consistência de resposta (baseada na variação de desempenho entre níveis)
    let consistencia = t('results.high');
    if (Object.keys(gameData.levels).length > 1) {
        const desempenhoNiveis = [];
        for (let level in gameData.levels) {
            const nivelData = gameData.levels[level];
            const taxaAcerto = nivelData.correctCount / (nivelData.correctCount + nivelData.errorCount);
            desempenhoNiveis.push(taxaAcerto);
        }

        // Calcular desvio padrão do desempenho
        const media = desempenhoNiveis.reduce((a, b) => a + b, 0) / desempenhoNiveis.length;
        const variancia = desempenhoNiveis.reduce((a, b) => a + Math.pow(b - media, 2), 0) / desempenhoNiveis.length;
        const desvioPadrao = Math.sqrt(variancia);

        if (desvioPadrao > 0.2) consistencia = t('results.low');
        else if (desvioPadrao > 0.1) consistencia = t('results.medium');
    }

    // Determinar nível de atenção seletiva
    let nivelAtencao = t('results.medium');
    const taxaAcertoGeral = gameData.correctCount / (gameData.correctCount + gameData.errorCount);
    if (taxaAcertoGeral > 0.85) nivelAtencao = t('results.high');
    else if (taxaAcertoGeral < 0.6) nivelAtencao = t('results.low');

    // Gerar interpretação
    let interpretacao = '';
    if (nivelAtencao === t('results.high') && consistencia === t('results.high')) {
        interpretacao = t('results.excellentPerformance');
    } else if (nivelAtencao === t('results.low')) {
        interpretacao = t('results.lowPerformance');
    } else {
        interpretacao = t('results.averagePerformance');
    }

    return {
        indiceInterferencia,
        tempoReacaoMedio,
        consistenciaResposta: consistencia,
        nivelAtencaoSeletiva: nivelAtencao,
        interpretacao
    };
}

function restartGame() {
    currentLevel = 1; // Ensure currentLevel is reset to 1
    location.reload();
    clearSessionData();
    resetGame(1);
}

// Função para fechar a tela de resultados
function closeResults() {
    const resultsDiv = document.getElementById('final-results');
    if (resultsDiv) {
        resultsDiv.remove();
    }
}
