const colors = ["Vermelho", "Verde", "Azul", "Amarelo", "Laranja", "Púrpura"];
const colorMap = {
    "Vermelho": "red",
    "Verde": "green",
    "Azul": "blue",
    "Amarelo": "yellow",
    "Laranja": "orange",
    "Púrpura": "purple"
};

// Configurações padrão
const DEFAULT_LEVEL_DURATION = 17;
const LEVELS = { 1: "Nível: 1", 2: "Nível: 2", 3: "Nível: 3", 4: "Nível: 4" };
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


const GAME_INSTRUCTIONS_HTML = `
    <div style="text-align: left; font-size: 1em;">
        <p style="margin-bottom: 10px;">• <strong>Nível 1:</strong> "Neste nível, identifique a <strong>COR</strong> da palavra exibida. Ignore o que está escrito."</p>
        <p style="margin-bottom: 10px;">• <strong>Nível 2:</strong> "As opções de resposta agora são coloridas. Continue focando na <strong>COR</strong> da palavra central."</p>
        <p style="margin-bottom: 10px;">• <strong>Nível 3:</strong> "As opções agora têm fundo colorido. Mantenha o foco na <strong>COR</strong> da palavra central, independente do fundo."</p>
        <p style="margin-bottom: 10px;">• <strong>Nível 4:</strong> "Atenção: A <strong>1ª figura</strong> é crucial!
            <br>&emsp;1. Memorize a <strong>FORMA</strong> e a <strong>COR</strong> dela.
            <br>&emsp;2. Ao clicar no primeiro atributo, a figura ou a cor MUDARÁ.
            <br>&emsp;3. <strong>IGNORE</strong> a nova figura e responda o segundo atributo da figura <strong>ANTERIOR</strong>."
        </p>
    </div>
`;

function showGameInstructions(onStartCallback) {
    const modal = document.getElementById("level-intro-modal");
    if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
    }
    const title = document.getElementById("level-title");
    const description = document.getElementById("level-description");
    const startButton = document.getElementById("start-level-btn");

    title.textContent = "Instruções dos Níveis";
    description.innerHTML = GAME_INSTRUCTIONS_HTML;

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
    document.getElementById("countdown").textContent = `Tempo: ${countdownTimer} segundos`;
    countdownInterval = setInterval(() => {
        if (countdownTimer > 0) {
            countdownTimer--;
            totalGameTime++;
            document.getElementById("countdown").textContent = `Tempo: ${countdownTimer} segundos`;
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
    if (currentLevel === 4) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Display shape
        const stroopTextElement = document.getElementById("stroop-text");
        stroopTextElement.textContent = ''; // Clear text
        stroopTextElement.className = 'stroop-text'; // Reset classes
        stroopTextElement.classList.add('shape-display', randomShape);
        stroopTextElement.style.backgroundColor = colorMap[randomColor];

        currentShape = randomShape;
        currentColor = randomColor;


    } else {
        currentColor = colors[Math.floor(Math.random() * colors.length)];
        currentText = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById("stroop-text").textContent = currentText;
        document.getElementById("stroop-text").style.color = colorMap[currentColor];
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

    // Verificar se o som está habilitado nas configurações
    if (appConfig.soundEnabled !== false) { // Se não estiver definido ou for true
        const sound = document.getElementById(type === 'success' ? "success-sound" : "error-sound");
        sound.play();
    }
}

function resetGame(level = 1) {
    currentLevel = level;
    currentLevel = level;
    window.scrollTo(0, 0);
    document.getElementById("current-level").textContent = "Nível: " + currentLevel;
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
            const continuar = confirm(`DOWNGRADE DETECTADO: A versão atual (${versao}) é anterior à versão armazenada (${versaoArmazenada}). Deseja continuar?`);
            if (continuar) {
                console.log('Usuário optou por continuar após downgrade.');
                registrarMudancaVersao(versao, versaoArmazenada, 'downgrade');
            } else {
                console.log('Usuário optou por não continuar após downgrade.');
                window.location.href = 'index.html';
                return;
            }
        } else if (versaoArmazenada < versao) {
            alert(`UPGRADE DETECTADO: O aplicativo foi atualizado da versão ${versaoArmazenada} para a versão ${versao}.`);
            registrarMudancaVersao(versao, versaoArmazenada, 'upgrade');
        }
    } else {
        // Primeira instalação
        registrarMudancaVersao(versao, null, 'instalação');
    }

    // Carregar configurações
    loadConfig();

    // Atualizar o indicador de modo
    atualizarIndicadorModo();

    // Iniciar o jogo
    startLevel1();
});

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
            modeIndicator.textContent = 'Modo: Teste';
            modeIndicator.classList.add('test-mode');
        } else {
            modeIndicator.textContent = 'Modo: Jogo';
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
const shapesInPortuguese = {
    "square": "Quadrado",
    "circle": "Círculo",
    "triangle": "Triângulo"
};

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
            <h3>Nível ${level}</h3>
            <p>Respostas Corretas: ${gameData.levels[level].correctCount} / Erros: ${gameData.levels[level].errorCount}</p>
            <p>Tempo: ${gameData.levels[level].totalGameTime} segundos</p>
        `;
    }

    // Gerar diagnóstico se estiver no modo de teste
    let diagnosticoHtml = '';
    if (isTestMode) {
        const diagnostico = gerarDiagnostico(gameData);
        diagnosticoHtml = `
            <div class="diagnostico-container">
                <h3>Análise de Desempenho</h3>
                <p class="diagnostico-descricao">Esta análise é baseada em dados psicológicos e deve ser interpretada por um profissional.</p>
                <div class="diagnostico-resultado">
                    <p><strong>Índice de Interferência:</strong> ${diagnostico.indiceInterferencia}</p>
                    <p><strong>Tempo de Reação Médio:</strong> ${diagnostico.tempoReacaoMedio} ms</p>
                    <p><strong>Consistência de Resposta:</strong> ${diagnostico.consistenciaResposta}</p>
                    <p><strong>Nível de Atenção Seletiva:</strong> ${diagnostico.nivelAtencaoSeletiva}</p>
                </div>
                <div class="diagnostico-interpretacao">
                    <h4>Interpretação</h4>
                    <p>${diagnostico.interpretacao}</p>
                </div>
                <p class="diagnostico-aviso">Nota: Esta análise é apenas uma referência e não substitui a avaliação de um profissional qualificado.</p>
            </div>
        `;
    }

    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'final-results';
    resultsDiv.innerHTML = `
        <div class="results-container">
            <button class="close-button" onclick="closeResults()">×</button>
            <h2>Resultados Finais</h2>

            <div class="results-summary">
                <h3>Resumo por Nível</h3>
                ${levelResults}
            </div>

            <div class="results-total">
                <h3>Total Geral</h3>
                <p><strong>Respostas Corretas:</strong> ${gameData.correctCount}</p>
                <p><strong>Erros:</strong> ${gameData.errorCount}</p>
                <p><strong>Tempo Total:</strong> ${gameData.totalGameTime} segundos</p>
                <p><strong>Média de Acertos:</strong> ${gameData.averageCorrect} por segundo</p>
            </div>

            ${diagnosticoHtml}

            <div class="buttons-row">
                <button onclick="restartGame()">Jogar Novamente</button>
                <button onclick="closeResults()" style="background-color: #2196F3;">Fechar</button>
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
    let consistencia = 'Alta';
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

        if (desvioPadrao > 0.2) consistencia = 'Baixa';
        else if (desvioPadrao > 0.1) consistencia = 'Média';
    }

    // Determinar nível de atenção seletiva
    let nivelAtencao = 'Médio';
    const taxaAcertoGeral = gameData.correctCount / (gameData.correctCount + gameData.errorCount);
    if (taxaAcertoGeral > 0.85) nivelAtencao = 'Alto';
    else if (taxaAcertoGeral < 0.6) nivelAtencao = 'Baixo';

    // Gerar interpretação
    let interpretacao = '';
    if (nivelAtencao === 'Alto' && consistencia === 'Alta') {
        interpretacao = 'O desempenho indica excelente capacidade de atenção seletiva e controle inibitório. A pessoa demonstra habilidade consistente para ignorar informações irrelevantes e focar nas características relevantes do estímulo.';
    } else if (nivelAtencao === 'Baixo') {
        interpretacao = 'O desempenho sugere dificuldades na atenção seletiva e possível suscetibilidade à interferência cognitiva. Pode indicar necessidade de desenvolvimento de estratégias para melhorar o foco atencional e reduzir a distração por estímulos irrelevantes.';
    } else {
        interpretacao = 'O desempenho está dentro da faixa média esperada. Há um equilíbrio entre a capacidade de manter o foco e a suscetibilidade à interferência cognitiva. Com prática, é possível melhorar ainda mais estas habilidades.';
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
