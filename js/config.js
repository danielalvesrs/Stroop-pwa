document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const gameModeRadio = document.getElementById('game-mode');
    const testModeRadio = document.getElementById('test-mode');
    const gameConfigSection = document.getElementById('game-config');
    const testConfigSection = document.getElementById('test-config');
    const saveConfigButton = document.getElementById('save-config');
    const languageSelect = document.getElementById('language-select');

    // Carregar configurações salvas (se existirem)
    loadSavedConfig();

    // Carregar informações de versão
    loadVersionInfo();

    // Initialize language selector
    initLanguageSelector();

    // Event listeners para alternar entre modos
    gameModeRadio.addEventListener('change', function () {
        if (this.checked) {
            gameConfigSection.style.display = 'block';
            testConfigSection.style.display = 'none';
        }
    });

    testModeRadio.addEventListener('change', function () {
        if (this.checked) {
            gameConfigSection.style.display = 'none';
            testConfigSection.style.display = 'block';
        }
    });

    // Event listener para o botão de salvar
    saveConfigButton.addEventListener('click', saveConfig);

    // Event listener para o tipo de teste
    document.getElementById('test-type-select').addEventListener('change', function () {
        updateTestTypeSettings(this.value);
    });

    // Initialize language selector
    function initLanguageSelector() {
        // Set current language value
        const currentLang = getCurrentLanguage();
        languageSelect.value = currentLang;

        // Add change listener
        languageSelect.addEventListener('change', function () {
            setLanguage(this.value);
            // Update select option texts based on new language
            updateSelectOptions();
            // Re-apply translations to update version info labels
            loadVersionInfo();
        });
    }

    // Update select option texts with translations
    function updateSelectOptions() {
        // Test type select
        const testTypeSelect = document.getElementById('test-type-select');
        testTypeSelect.options[0].text = t('settings.standard');
        testTypeSelect.options[1].text = t('settings.short');
        testTypeSelect.options[2].text = t('settings.clinical');

        // Difficulty select
        const difficultySelect = document.getElementById('difficulty-select');
        difficultySelect.options[0].text = t('settings.easy');
        difficultySelect.options[1].text = t('settings.medium');
        difficultySelect.options[2].text = t('settings.hard');
        difficultySelect.options[3].text = t('settings.expert');
    }

    // Função para carregar configurações salvas
    function loadSavedConfig() {
        const savedConfig = localStorage.getItem('stroopConfig');

        if (savedConfig) {
            const config = JSON.parse(savedConfig);

            // Definir o modo
            if (config.mode === 'test') {
                testModeRadio.checked = true;
                gameConfigSection.style.display = 'none';
                testConfigSection.style.display = 'block';
            } else {
                gameModeRadio.checked = true;
                gameConfigSection.style.display = 'block';
                testConfigSection.style.display = 'none';
            }

            // Configurações do teste
            if (config.testType) {
                document.getElementById('test-type-select').value = config.testType;
            }

            // Tempos dos níveis
            if (config.levelTimes) {
                document.getElementById('level1-time').value = config.levelTimes[1] || 17;
                document.getElementById('level2-time').value = config.levelTimes[2] || 17;
                document.getElementById('level3-time').value = config.levelTimes[3] || 17;
                document.getElementById('level4-time').value = config.levelTimes[4] || 17;
            }

            // Métricas
            if (config.metrics) {
                document.getElementById('metric-reaction-time').checked = config.metrics.reactionTime;
                document.getElementById('metric-error-rate').checked = config.metrics.errorRate;
                document.getElementById('metric-interference').checked = config.metrics.interference;
                document.getElementById('metric-learning-curve').checked = config.metrics.learningCurve;
                document.getElementById('metric-fatigue').checked = config.metrics.fatigue;
            }

            // Configurações do jogo
            if (config.difficulty) {
                document.getElementById('difficulty-select').value = config.difficulty;
            }

            if (config.hasOwnProperty('soundEnabled')) {
                document.getElementById('sound-enabled').checked = config.soundEnabled;
            }
        }
    }

    // Função para carregar informações de versão
    function loadVersionInfo() {
        const currentVersion = localStorage.getItem('versaoStroop') || t('settings.notAvailable');
        const lastUpdate = localStorage.getItem('ultimaAtualizacaoStroop') || t('settings.notAvailable');
        const versionHistory = JSON.parse(localStorage.getItem('historicoVersoesStroop') || '[]');

        // Atualizar informações de versão
        document.getElementById('current-version').innerHTML = `<span data-i18n="settings.currentVersion">${t('settings.currentVersion')}</span>: ${currentVersion}`;

        // Formatar data da última atualização
        let formattedDate = lastUpdate;
        if (lastUpdate !== t('settings.notAvailable')) {
            try {
                const date = new Date(lastUpdate);
                formattedDate = date.toLocaleString();
            } catch (e) {
                console.error('Erro ao formatar data:', e);
            }
        }
        document.getElementById('last-update').innerHTML = `<span data-i18n="settings.lastUpdate">${t('settings.lastUpdate')}</span>: ${formattedDate}`;

        // Exibir histórico de versões
        const historyList = document.getElementById('version-history-list');
        if (versionHistory.length === 0) {
            historyList.innerHTML = `<p data-i18n="settings.noHistory">${t('settings.noHistory')}</p>`;
        } else {
            historyList.innerHTML = '';
            versionHistory.reverse().forEach(entry => {
                const entryDate = new Date(entry.data).toLocaleString();
                const tipoLabel = {
                    'upgrade': t('settings.upgrade'),
                    'downgrade': t('settings.downgrade'),
                    'instalação': t('settings.installation')
                }[entry.tipo] || entry.tipo;

                const entryElement = document.createElement('div');
                entryElement.className = 'version-entry';
                entryElement.innerHTML = `
                    <div>
                        <span class="type ${entry.tipo}">${tipoLabel}</span>
                        <span class="date">${entryDate}</span>
                    </div>
                    <div>
                        ${entry.de ? `De: ${entry.de} → Para: ${entry.para}` : `Versão: ${entry.para}`}
                    </div>
                `;
                historyList.appendChild(entryElement);
            });
        }
    }

    // Função para salvar configurações
    function saveConfig() {
        const config = {
            mode: document.querySelector('input[name="app-mode"]:checked').value,
            testType: document.getElementById('test-type-select').value,
            levelTimes: {
                1: parseInt(document.getElementById('level1-time').value),
                2: parseInt(document.getElementById('level2-time').value),
                3: parseInt(document.getElementById('level3-time').value),
                4: parseInt(document.getElementById('level4-time').value)
            },
            metrics: {
                reactionTime: document.getElementById('metric-reaction-time').checked,
                errorRate: document.getElementById('metric-error-rate').checked,
                interference: document.getElementById('metric-interference').checked,
                learningCurve: document.getElementById('metric-learning-curve').checked,
                fatigue: document.getElementById('metric-fatigue').checked
            },
            difficulty: document.getElementById('difficulty-select').value,
            soundEnabled: document.getElementById('sound-enabled').checked
        };

        // Salvar no localStorage
        localStorage.setItem('stroopConfig', JSON.stringify(config));

        // Feedback para o usuário - show brief notification
        const saveButton = document.getElementById('save-config');
        const originalText = saveButton.textContent;
        saveButton.textContent = '✓ ' + (getCurrentLanguage() === 'pt-BR' ? 'Salvo!' :
            getCurrentLanguage() === 'en' ? 'Saved!' :
                getCurrentLanguage() === 'fr' ? 'Enregistré!' : 'Gespeichert!');
        saveButton.style.backgroundColor = '#27ae60';

        setTimeout(() => {
            saveButton.textContent = t('settings.saveSettings');
            saveButton.style.backgroundColor = '';
        }, 2000);

        console.log('Configurações salvas com sucesso!');
    }

    // Função para atualizar configurações com base no tipo de teste
    function updateTestTypeSettings(testType) {
        switch (testType) {
            case 'short':
                document.getElementById('level1-time').value = 20;
                document.getElementById('level2-time').value = 20;
                document.getElementById('level3-time').value = 0;
                document.getElementById('level4-time').value = 0;
                break;

            case 'clinical':
                document.getElementById('level1-time').value = 30;
                document.getElementById('level2-time').value = 30;
                document.getElementById('level3-time').value = 30;
                document.getElementById('level4-time').value = 30;
                break;
            default: // standard
                document.getElementById('level1-time').value = 17;
                document.getElementById('level2-time').value = 17;
                document.getElementById('level3-time').value = 17;
                document.getElementById('level4-time').value = 17;
        }
    }
});
