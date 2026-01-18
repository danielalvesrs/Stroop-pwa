/**
 * Internationalization (i18n) Module for Stroop PWA
 * Supports: pt-BR, en, fr, de
 */

const translations = {
    'pt-BR': {
        // Colors
        colors: {
            red: 'Vermelho',
            green: 'Verde',
            blue: 'Azul',
            yellow: 'Amarelo',
            orange: 'Laranja',
            purple: 'Púrpura'
        },
        // Shapes
        shapes: {
            square: 'Quadrado',
            circle: 'Círculo',
            triangle: 'Triângulo'
        },
        // Game UI
        game: {
            level: 'Nível',
            time: 'Tempo',
            seconds: 'segundos',
            correct: 'Acertos',
            errors: 'Erros',
            average: 'Média',
            newGame: 'Novo Jogo',
            nextLevel: 'Próximo Nível',
            back: 'Voltar',
            start: 'Começar',
            modeGame: 'Modo: Jogo',
            modeTest: 'Modo: Teste',
            letsPlay: 'Bora jogar!'
        },
        // Instructions
        instructions: {
            title: 'Instruções dos Níveis',
            level1: 'Neste nível, identifique a <strong>COR</strong> da palavra exibida. Ignore o que está escrito.',
            level2: 'As opções de resposta agora são coloridas. Continue focando na <strong>COR</strong> da palavra central.',
            level3: 'As opções agora têm fundo colorido. Mantenha o foco na <strong>COR</strong> da palavra central, independente do fundo.',
            level4: 'Atenção: A <strong>1ª figura</strong> é crucial!',
            level4_1: 'Memorize a <strong>FORMA</strong> e a <strong>COR</strong> dela.',
            level4_2: 'Ao clicar no primeiro atributo, a figura ou a cor MUDARÁ.',
            level4_3: '<strong>IGNORE</strong> a nova figura e responda o segundo atributo da figura <strong>ANTERIOR</strong>.',
            level4Box: 'Atenção! Ao selecionar uma forma ou cor, o estímulo visual pode mudar. Lembre-se da forma e cor originais!'
        },
        // Results
        results: {
            finalResults: 'Resultados Finais',
            levelSummary: 'Resumo por Nível',
            totalGeneral: 'Total Geral',
            correctAnswers: 'Respostas Corretas',
            totalTime: 'Tempo Total',
            averageHits: 'Média de Acertos',
            perSecond: 'por segundo',
            playAgain: 'Jogar Novamente',
            close: 'Fechar',
            performanceAnalysis: 'Análise de Desempenho',
            analysisDescription: 'Esta análise é baseada em dados psicológicos e deve ser interpretada por um profissional.',
            interferenceIndex: 'Índice de Interferência',
            avgReactionTime: 'Tempo de Reação Médio',
            responseConsistency: 'Consistência de Resposta',
            selectiveAttention: 'Nível de Atenção Seletiva',
            interpretation: 'Interpretação',
            analysisNote: 'Nota: Esta análise é apenas uma referência e não substitui a avaliação de um profissional qualificado.',
            high: 'Alta',
            medium: 'Média',
            low: 'Baixa',
            excellentPerformance: 'O desempenho indica excelente capacidade de atenção seletiva e controle inibitório. A pessoa demonstra habilidade consistente para ignorar informações irrelevantes e focar nas características relevantes do estímulo.',
            lowPerformance: 'O desempenho sugere dificuldades na atenção seletiva e possível suscetibilidade à interferência cognitiva. Pode indicar necessidade de desenvolvimento de estratégias para melhorar o foco atencional e reduzir a distração por estímulos irrelevantes.',
            averagePerformance: 'O desempenho está dentro da faixa média esperada. Há um equilíbrio entre a capacidade de manter o foco e a suscetibilidade à interferência cognitiva. Com prática, é possível melhorar ainda mais estas habilidades.'
        },
        // Settings
        settings: {
            title: 'Configurações do Teste de Stroop',
            language: 'Idioma',
            appMode: 'Modo de Aplicação',
            game: 'Jogo',
            test: 'Teste',
            gameModeDesc: 'Modo de jogo para diversão e treinamento cognitivo.',
            testModeDesc: 'Modo de teste para avaliação psicológica profissional.',
            testSettings: 'Configurações do Teste',
            testType: 'Tipo de Teste',
            standard: 'Padrão (4 níveis)',
            short: 'Curto (2 níveis)',
            clinical: 'Clínico (Protocolo Específico)',
            timeSettings: 'Configurações de Tempo',
            levelTime: 'Tempo Nível',
            analysisMetrics: 'Métricas de Análise',
            reactionTime: 'Tempo de Reação',
            errorRate: 'Taxa de Erro',
            interferenceIndex: 'Índice de Interferência',
            learningCurve: 'Curva de Aprendizado',
            fatigueIndex: 'Índice de Fadiga',
            gameSettings: 'Configurações do Jogo',
            difficulty: 'Dificuldade',
            easy: 'Fácil',
            medium: 'Médio',
            hard: 'Difícil',
            expert: 'Especialista',
            sounds: 'Sons',
            enableSounds: 'Habilitar Sons',
            versionInfo: 'Informações da Versão',
            currentVersion: 'Versão atual',
            lastUpdate: 'Última atualização',
            versionHistory: 'Histórico de Versões',
            noHistory: 'Nenhum histórico disponível.',
            loading: 'Carregando...',
            loadingHistory: 'Carregando histórico...',
            notAvailable: 'Não disponível',
            upgrade: 'Atualização',
            downgrade: 'Downgrade',
            installation: 'Instalação',
            saveSettings: 'Salvar Configurações'
        },
        // Index page
        index: {
            title: 'Teste de Stroop',
            pageTitle: 'Jogue com o Teste de Stroop',
            description: 'O famoso "Efeito Stroop" recebeu o nome de J. Ridley Stroop, que descobriu esse estranho fenômeno na década de 1930. O teste consiste em nomear as cores das palavras, NÃO ler as palavras... em vez disso, dizer a cor das palavras. Por exemplo, se a palavra "AZUL" estiver impressa em vermelho, você deve dizer "VERMELHO". e isso não é tão fácil quanto você pode imaginar!',
            psyDescription: 'Em psicologia, o efeito Stroop (efeito Jaensch) é uma demonstração de interferência no tempo de reação de uma tarefa. Por exemplo, quando uma palavra como azul, verde, vermelho, etc, é impressa numa cor que difere da cor expressa pelo significado semântico (exemplo: a palavra vermelho impressa com tinta azul), ocorre um atraso no processamento da cor da palavra, causando tempos de reacção mais lentos e um aumento de erros. O efeito leva o nome do seu descobridor, John Ridley Stroop, e foi originalmente difundido no artigo "Studies of interference in serial verbal reactions" publicado na revista Journal of Experimental Psychology em 1935.',
            source: '( Fonte wikipedia )',
            gameTitle: 'Jogo Teste de Stroop (Com requintes de crueldade... )',
            gameDescription: 'Este jogo aplica os conceitos deste famoso teste, treinando sua atenção e habilidade de diminuir a interferência no tempo de reação. Mas além da tarefa de clicar nas palavras que descrevem suas cores, neste jogo são incluídas figuras geométricas também com cores e formas que diferem de suas descrições, e é solicitado que o jogador clique na figura correta, o que aumenta a dificuldade, pois a solicitação também contém a troca das formas e cores. Não há punição por erro, a não ser o fato de deixar de somar pontos. A pontuação a ser somada ao seu score é iniciada em 100 e irá diminuir a cada segundo decorrido. Respostas corretas recebem uma moldura verde e a pontuação corrente é somada, do contrário, moldura vermelha sem pontuação.',
            privacyPolicy: 'Política de Privacidade'
        },
        // Offline page
        offline: {
            title: 'Sem Conexão',
            message: 'Você está offline. Por favor, verifique sua conexão com a internet.',
            retry: 'Tentar Novamente'
        },
        // Privacy page
        privacy: {
            title: 'Política de Privacidade',
            lastUpdate: 'Última atualização: 09 de Janeiro de 2026',
            welcome: 'Bem-vindo ao aplicativo <strong>Teste de Stroop</strong>. Valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais.',
            dataCollectionTitle: '1. Coleta de Dados',
            dataCollection: 'O aplicativo <strong>Teste de Stroop</strong> não coleta, armazena, processa ou compartilha nenhum dado pessoal do usuário. O aplicativo funciona inteiramente offline e todos os dados de progresso ou configurações são armazenados localmente no seu dispositivo.',
            permissionsTitle: '2. Permissões',
            permissions: 'O aplicativo pode solicitar permissões básicas do sistema para funcionamento (como acesso à internet para carregar o jogo pela primeira vez ou verificar atualizações), mas não acessa contatos, câmera, microfone, localização ou arquivos pessoais.',
            cookiesTitle: '3. Cookies e Rastreamento',
            cookies: 'Não utilizamos cookies, pixels de rastreamento ou outras tecnologias de monitoramento para coletar informações sobre seu uso do aplicativo.',
            contactTitle: '4. Contato',
            contact: 'Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco através da plataforma onde baixou este aplicativo.',
            backToGame: 'Voltar ao Jogo'
        }
    },
    'en': {
        // Colors
        colors: {
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
            yellow: 'Yellow',
            orange: 'Orange',
            purple: 'Purple'
        },
        // Shapes
        shapes: {
            square: 'Square',
            circle: 'Circle',
            triangle: 'Triangle'
        },
        // Game UI
        game: {
            level: 'Level',
            time: 'Time',
            seconds: 'seconds',
            correct: 'Correct',
            errors: 'Errors',
            average: 'Average',
            newGame: 'New Game',
            nextLevel: 'Next Level',
            back: 'Back',
            start: 'Start',
            modeGame: 'Mode: Game',
            modeTest: 'Mode: Test',
            letsPlay: "Let's play!"
        },
        // Instructions
        instructions: {
            title: 'Level Instructions',
            level1: 'In this level, identify the <strong>COLOR</strong> of the displayed word. Ignore what is written.',
            level2: 'The response options are now colored. Keep focusing on the <strong>COLOR</strong> of the central word.',
            level3: 'The options now have a colored background. Keep focusing on the <strong>COLOR</strong> of the central word, regardless of the background.',
            level4: 'Attention: The <strong>1st figure</strong> is crucial!',
            level4_1: 'Memorize its <strong>SHAPE</strong> and <strong>COLOR</strong>.',
            level4_2: 'When you click the first attribute, the figure or color WILL CHANGE.',
            level4_3: '<strong>IGNORE</strong> the new figure and answer the second attribute of the <strong>PREVIOUS</strong> figure.',
            level4Box: 'Attention! When selecting a shape or color, the visual stimulus may change. Remember the original shape and color!'
        },
        // Results
        results: {
            finalResults: 'Final Results',
            levelSummary: 'Summary by Level',
            totalGeneral: 'Grand Total',
            correctAnswers: 'Correct Answers',
            totalTime: 'Total Time',
            averageHits: 'Average Hits',
            perSecond: 'per second',
            playAgain: 'Play Again',
            close: 'Close',
            performanceAnalysis: 'Performance Analysis',
            analysisDescription: 'This analysis is based on psychological data and should be interpreted by a professional.',
            interferenceIndex: 'Interference Index',
            avgReactionTime: 'Average Reaction Time',
            responseConsistency: 'Response Consistency',
            selectiveAttention: 'Selective Attention Level',
            interpretation: 'Interpretation',
            analysisNote: 'Note: This analysis is only a reference and does not replace evaluation by a qualified professional.',
            high: 'High',
            medium: 'Medium',
            low: 'Low',
            excellentPerformance: 'Performance indicates excellent selective attention and inhibitory control. The person demonstrates consistent ability to ignore irrelevant information and focus on the relevant characteristics of the stimulus.',
            lowPerformance: 'Performance suggests difficulties in selective attention and possible susceptibility to cognitive interference. It may indicate the need to develop strategies to improve attentional focus and reduce distraction from irrelevant stimuli.',
            averagePerformance: 'Performance is within the expected average range. There is a balance between the ability to maintain focus and susceptibility to cognitive interference. With practice, these skills can be further improved.'
        },
        // Settings
        settings: {
            title: 'Stroop Test Settings',
            language: 'Language',
            appMode: 'Application Mode',
            game: 'Game',
            test: 'Test',
            gameModeDesc: 'Game mode for fun and cognitive training.',
            testModeDesc: 'Test mode for professional psychological assessment.',
            testSettings: 'Test Settings',
            testType: 'Test Type',
            standard: 'Standard (4 levels)',
            short: 'Short (2 levels)',
            clinical: 'Clinical (Specific Protocol)',
            timeSettings: 'Time Settings',
            levelTime: 'Level Time',
            analysisMetrics: 'Analysis Metrics',
            reactionTime: 'Reaction Time',
            errorRate: 'Error Rate',
            interferenceIndex: 'Interference Index',
            learningCurve: 'Learning Curve',
            fatigueIndex: 'Fatigue Index',
            gameSettings: 'Game Settings',
            difficulty: 'Difficulty',
            easy: 'Easy',
            medium: 'Medium',
            hard: 'Hard',
            expert: 'Expert',
            sounds: 'Sounds',
            enableSounds: 'Enable Sounds',
            versionInfo: 'Version Information',
            currentVersion: 'Current version',
            lastUpdate: 'Last update',
            versionHistory: 'Version History',
            noHistory: 'No history available.',
            loading: 'Loading...',
            loadingHistory: 'Loading history...',
            notAvailable: 'Not available',
            upgrade: 'Upgrade',
            downgrade: 'Downgrade',
            installation: 'Installation',
            saveSettings: 'Save Settings'
        },
        // Index page
        index: {
            title: 'Stroop Test',
            pageTitle: 'Play the Stroop Test',
            description: 'The famous "Stroop Effect" is named after J. Ridley Stroop, who discovered this strange phenomenon in the 1930s. The test consists of naming the colors of the words, NOT reading the words... instead, saying the color of the words. For example, if the word "BLUE" is printed in red, you should say "RED". And this is not as easy as you might imagine!',
            psyDescription: 'In psychology, the Stroop effect (Jaensch effect) is a demonstration of interference in the reaction time of a task. For example, when a word like blue, green, red, etc., is printed in a color that differs from the color expressed by its semantic meaning (example: the word red printed in blue ink), a delay occurs in processing the word\'s color, causing slower reaction times and an increase in errors. The effect is named after its discoverer, John Ridley Stroop, and was originally published in the article "Studies of interference in serial verbal reactions" in the Journal of Experimental Psychology in 1935.',
            source: '( Source: Wikipedia )',
            gameTitle: 'Stroop Test Game (With a touch of cruelty...)',
            gameDescription: 'This game applies the concepts of this famous test, training your attention and ability to reduce interference in reaction time. But beyond the task of clicking on words that describe their colors, this game includes geometric shapes with colors and forms that differ from their descriptions, and players are asked to click on the correct figure, which increases difficulty as the request also involves swapping shapes and colors. There is no punishment for errors, other than not scoring points. The score to be added starts at 100 and decreases every second. Correct answers receive a green border and the current score is added, otherwise, a red border with no points.',
            privacyPolicy: 'Privacy Policy'
        },
        // Offline page
        offline: {
            title: 'No Connection',
            message: 'You are offline. Please check your internet connection.',
            retry: 'Try Again'
        },
        // Privacy page
        privacy: {
            title: 'Privacy Policy',
            lastUpdate: 'Last update: January 09, 2026',
            welcome: 'Welcome to the <strong>Stroop Test</strong> app. We value your privacy and are committed to protecting your personal information.',
            dataCollectionTitle: '1. Data Collection',
            dataCollection: 'The <strong>Stroop Test</strong> app does not collect, store, process, or share any personal user data. The app works entirely offline and all progress or settings data is stored locally on your device.',
            permissionsTitle: '2. Permissions',
            permissions: 'The app may request basic system permissions to function (such as internet access to load the game for the first time or check for updates), but does not access contacts, camera, microphone, location, or personal files.',
            cookiesTitle: '3. Cookies and Tracking',
            cookies: 'We do not use cookies, tracking pixels, or other monitoring technologies to collect information about your use of the app.',
            contactTitle: '4. Contact',
            contact: 'If you have any questions about this privacy policy, please contact us through the platform where you downloaded this app.',
            backToGame: 'Back to Game'
        }
    },
    'fr': {
        // Colors
        colors: {
            red: 'Rouge',
            green: 'Vert',
            blue: 'Bleu',
            yellow: 'Jaune',
            orange: 'Orange',
            purple: 'Violet'
        },
        // Shapes
        shapes: {
            square: 'Carré',
            circle: 'Cercle',
            triangle: 'Triangle'
        },
        // Game UI
        game: {
            level: 'Niveau',
            time: 'Temps',
            seconds: 'secondes',
            correct: 'Correct',
            errors: 'Erreurs',
            average: 'Moyenne',
            newGame: 'Nouveau Jeu',
            nextLevel: 'Niveau Suivant',
            back: 'Retour',
            start: 'Commencer',
            modeGame: 'Mode: Jeu',
            modeTest: 'Mode: Test',
            letsPlay: 'Jouons!'
        },
        // Instructions
        instructions: {
            title: 'Instructions des Niveaux',
            level1: 'Dans ce niveau, identifiez la <strong>COULEUR</strong> du mot affiché. Ignorez ce qui est écrit.',
            level2: 'Les options de réponse sont maintenant colorées. Continuez à vous concentrer sur la <strong>COULEUR</strong> du mot central.',
            level3: 'Les options ont maintenant un fond coloré. Restez concentré sur la <strong>COULEUR</strong> du mot central, quel que soit le fond.',
            level4: 'Attention: La <strong>1ère figure</strong> est cruciale!',
            level4_1: 'Mémorisez sa <strong>FORME</strong> et sa <strong>COULEUR</strong>.',
            level4_2: 'Lorsque vous cliquez sur le premier attribut, la figure ou la couleur VA CHANGER.',
            level4_3: '<strong>IGNOREZ</strong> la nouvelle figure et répondez au deuxième attribut de la figure <strong>PRÉCÉDENTE</strong>.',
            level4Box: 'Attention! En sélectionnant une forme ou une couleur, le stimulus visuel peut changer. Souvenez-vous de la forme et de la couleur originales!'
        },
        // Results
        results: {
            finalResults: 'Résultats Finaux',
            levelSummary: 'Résumé par Niveau',
            totalGeneral: 'Total Général',
            correctAnswers: 'Réponses Correctes',
            totalTime: 'Temps Total',
            averageHits: 'Moyenne de Réussites',
            perSecond: 'par seconde',
            playAgain: 'Rejouer',
            close: 'Fermer',
            performanceAnalysis: 'Analyse de Performance',
            analysisDescription: 'Cette analyse est basée sur des données psychologiques et doit être interprétée par un professionnel.',
            interferenceIndex: "Indice d'Interférence",
            avgReactionTime: 'Temps de Réaction Moyen',
            responseConsistency: 'Cohérence des Réponses',
            selectiveAttention: "Niveau d'Attention Sélective",
            interpretation: 'Interprétation',
            analysisNote: "Note: Cette analyse n'est qu'une référence et ne remplace pas l'évaluation d'un professionnel qualifié.",
            high: 'Haute',
            medium: 'Moyenne',
            low: 'Basse',
            excellentPerformance: "La performance indique une excellente capacité d'attention sélective et de contrôle inhibiteur. La personne démontre une capacité constante à ignorer les informations non pertinentes et à se concentrer sur les caractéristiques pertinentes du stimulus.",
            lowPerformance: "La performance suggère des difficultés d'attention sélective et une possible susceptibilité à l'interférence cognitive. Cela peut indiquer la nécessité de développer des stratégies pour améliorer la concentration et réduire la distraction par des stimuli non pertinents.",
            averagePerformance: "La performance est dans la plage moyenne attendue. Il y a un équilibre entre la capacité à maintenir la concentration et la susceptibilité à l'interférence cognitive. Avec de la pratique, ces compétences peuvent encore être améliorées."
        },
        // Settings
        settings: {
            title: 'Paramètres du Test de Stroop',
            language: 'Langue',
            appMode: "Mode d'Application",
            game: 'Jeu',
            test: 'Test',
            gameModeDesc: 'Mode jeu pour le divertissement et l\'entraînement cognitif.',
            testModeDesc: 'Mode test pour l\'évaluation psychologique professionnelle.',
            testSettings: 'Paramètres du Test',
            testType: 'Type de Test',
            standard: 'Standard (4 niveaux)',
            short: 'Court (2 niveaux)',
            clinical: 'Clinique (Protocole Spécifique)',
            timeSettings: 'Paramètres de Temps',
            levelTime: 'Temps du Niveau',
            analysisMetrics: "Métriques d'Analyse",
            reactionTime: 'Temps de Réaction',
            errorRate: "Taux d'Erreur",
            interferenceIndex: "Indice d'Interférence",
            learningCurve: "Courbe d'Apprentissage",
            fatigueIndex: 'Indice de Fatigue',
            gameSettings: 'Paramètres du Jeu',
            difficulty: 'Difficulté',
            easy: 'Facile',
            medium: 'Moyen',
            hard: 'Difficile',
            expert: 'Expert',
            sounds: 'Sons',
            enableSounds: 'Activer les Sons',
            versionInfo: 'Informations de Version',
            currentVersion: 'Version actuelle',
            lastUpdate: 'Dernière mise à jour',
            versionHistory: 'Historique des Versions',
            noHistory: 'Aucun historique disponible.',
            loading: 'Chargement...',
            loadingHistory: "Chargement de l'historique...",
            notAvailable: 'Non disponible',
            upgrade: 'Mise à jour',
            downgrade: 'Rétrogradation',
            installation: 'Installation',
            saveSettings: 'Enregistrer les Paramètres'
        },
        // Index page
        index: {
            title: 'Test de Stroop',
            pageTitle: 'Jouez au Test de Stroop',
            description: 'Le célèbre "Effet Stroop" porte le nom de J. Ridley Stroop, qui a découvert ce phénomène étrange dans les années 1930. Le test consiste à nommer les couleurs des mots, PAS à lire les mots... mais plutôt à dire la couleur des mots. Par exemple, si le mot "BLEU" est imprimé en rouge, vous devez dire "ROUGE". Et ce n\'est pas aussi facile qu\'on pourrait l\'imaginer!',
            psyDescription: "En psychologie, l'effet Stroop (effet Jaensch) est une démonstration d'interférence dans le temps de réaction d'une tâche. Par exemple, lorsqu'un mot comme bleu, vert, rouge, etc., est imprimé dans une couleur qui diffère de la couleur exprimée par sa signification sémantique (exemple: le mot rouge imprimé en encre bleue), un retard se produit dans le traitement de la couleur du mot, provoquant des temps de réaction plus lents et une augmentation des erreurs. L'effet porte le nom de son découvreur, John Ridley Stroop, et a été publié à l'origine dans l'article \"Studies of interference in serial verbal reactions\" dans le Journal of Experimental Psychology en 1935.",
            source: '( Source: Wikipédia )',
            gameTitle: 'Jeu Test de Stroop (Avec une touche de cruauté...)',
            gameDescription: "Ce jeu applique les concepts de ce célèbre test, entraînant votre attention et votre capacité à réduire l'interférence dans le temps de réaction. Mais au-delà de la tâche de cliquer sur les mots qui décrivent leurs couleurs, ce jeu inclut des formes géométriques avec des couleurs et des formes qui diffèrent de leurs descriptions, et les joueurs doivent cliquer sur la bonne figure, ce qui augmente la difficulté. Il n'y a pas de punition pour les erreurs, sauf le fait de ne pas marquer de points. Le score à ajouter commence à 100 et diminue chaque seconde. Les réponses correctes reçoivent une bordure verte et le score actuel est ajouté, sinon, une bordure rouge sans points.",
            privacyPolicy: 'Politique de Confidentialité'
        },
        // Offline page
        offline: {
            title: 'Pas de Connexion',
            message: 'Vous êtes hors ligne. Veuillez vérifier votre connexion internet.',
            retry: 'Réessayer'
        },
        // Privacy page
        privacy: {
            title: 'Politique de Confidentialité',
            lastUpdate: 'Dernière mise à jour: 09 janvier 2026',
            welcome: 'Bienvenue dans l\'application <strong>Test de Stroop</strong>. Nous valorisons votre vie privée et nous engageons à protéger vos informations personnelles.',
            dataCollectionTitle: '1. Collecte de Données',
            dataCollection: 'L\'application <strong>Test de Stroop</strong> ne collecte, stocke, traite ou partage aucune donnée personnelle de l\'utilisateur. L\'application fonctionne entièrement hors ligne et toutes les données de progression ou de paramètres sont stockées localement sur votre appareil.',
            permissionsTitle: '2. Autorisations',
            permissions: 'L\'application peut demander des autorisations système de base pour fonctionner (comme l\'accès à Internet pour charger le jeu la première fois ou vérifier les mises à jour), mais n\'accède pas aux contacts, caméra, microphone, localisation ou fichiers personnels.',
            cookiesTitle: '3. Cookies et Suivi',
            cookies: 'Nous n\'utilisons pas de cookies, pixels de suivi ou autres technologies de surveillance pour collecter des informations sur votre utilisation de l\'application.',
            contactTitle: '4. Contact',
            contact: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter via la plateforme où vous avez téléchargé cette application.',
            backToGame: 'Retour au Jeu'
        }
    },
    'de': {
        // Colors
        colors: {
            red: 'Rot',
            green: 'Grün',
            blue: 'Blau',
            yellow: 'Gelb',
            orange: 'Orange',
            purple: 'Lila'
        },
        // Shapes
        shapes: {
            square: 'Quadrat',
            circle: 'Kreis',
            triangle: 'Dreieck'
        },
        // Game UI
        game: {
            level: 'Level',
            time: 'Zeit',
            seconds: 'Sekunden',
            correct: 'Richtig',
            errors: 'Fehler',
            average: 'Durchschnitt',
            newGame: 'Neues Spiel',
            nextLevel: 'Nächstes Level',
            back: 'Zurück',
            start: 'Start',
            modeGame: 'Modus: Spiel',
            modeTest: 'Modus: Test',
            letsPlay: 'Los spielen!'
        },
        // Instructions
        instructions: {
            title: 'Level-Anleitungen',
            level1: 'In diesem Level identifizieren Sie die <strong>FARBE</strong> des angezeigten Wortes. Ignorieren Sie, was geschrieben steht.',
            level2: 'Die Antwortoptionen sind jetzt farbig. Konzentrieren Sie sich weiterhin auf die <strong>FARBE</strong> des zentralen Wortes.',
            level3: 'Die Optionen haben jetzt einen farbigen Hintergrund. Konzentrieren Sie sich weiterhin auf die <strong>FARBE</strong> des zentralen Wortes, unabhängig vom Hintergrund.',
            level4: 'Achtung: Die <strong>1. Figur</strong> ist entscheidend!',
            level4_1: 'Merken Sie sich ihre <strong>FORM</strong> und <strong>FARBE</strong>.',
            level4_2: 'Wenn Sie das erste Attribut anklicken, WIRD sich die Figur oder Farbe ÄNDERN.',
            level4_3: '<strong>IGNORIEREN</strong> Sie die neue Figur und beantworten Sie das zweite Attribut der <strong>VORHERIGEN</strong> Figur.',
            level4Box: 'Achtung! Bei der Auswahl einer Form oder Farbe kann sich der visuelle Stimulus ändern. Merken Sie sich die ursprüngliche Form und Farbe!'
        },
        // Results
        results: {
            finalResults: 'Endergebnisse',
            levelSummary: 'Zusammenfassung nach Level',
            totalGeneral: 'Gesamtsumme',
            correctAnswers: 'Richtige Antworten',
            totalTime: 'Gesamtzeit',
            averageHits: 'Durchschnittliche Treffer',
            perSecond: 'pro Sekunde',
            playAgain: 'Erneut Spielen',
            close: 'Schließen',
            performanceAnalysis: 'Leistungsanalyse',
            analysisDescription: 'Diese Analyse basiert auf psychologischen Daten und sollte von einem Fachmann interpretiert werden.',
            interferenceIndex: 'Interferenzindex',
            avgReactionTime: 'Durchschnittliche Reaktionszeit',
            responseConsistency: 'Antwortkonsistenz',
            selectiveAttention: 'Selektive Aufmerksamkeitsstufe',
            interpretation: 'Interpretation',
            analysisNote: 'Hinweis: Diese Analyse ist nur eine Referenz und ersetzt nicht die Bewertung durch einen qualifizierten Fachmann.',
            high: 'Hoch',
            medium: 'Mittel',
            low: 'Niedrig',
            excellentPerformance: 'Die Leistung zeigt eine ausgezeichnete selektive Aufmerksamkeit und Hemmungskontrolle. Die Person zeigt eine konstante Fähigkeit, irrelevante Informationen zu ignorieren und sich auf die relevanten Merkmale des Stimulus zu konzentrieren.',
            lowPerformance: 'Die Leistung deutet auf Schwierigkeiten bei der selektiven Aufmerksamkeit und mögliche Anfälligkeit für kognitive Interferenz hin. Dies kann auf die Notwendigkeit hinweisen, Strategien zur Verbesserung der Aufmerksamkeitsfokussierung und zur Reduzierung der Ablenkung durch irrelevante Reize zu entwickeln.',
            averagePerformance: 'Die Leistung liegt im erwarteten Durchschnittsbereich. Es besteht ein Gleichgewicht zwischen der Fähigkeit, den Fokus zu halten, und der Anfälligkeit für kognitive Interferenz. Mit Übung können diese Fähigkeiten weiter verbessert werden.'
        },
        // Settings
        settings: {
            title: 'Stroop-Test Einstellungen',
            language: 'Sprache',
            appMode: 'Anwendungsmodus',
            game: 'Spiel',
            test: 'Test',
            gameModeDesc: 'Spielmodus für Spaß und kognitives Training.',
            testModeDesc: 'Testmodus für professionelle psychologische Bewertung.',
            testSettings: 'Testeinstellungen',
            testType: 'Testtyp',
            standard: 'Standard (4 Level)',
            short: 'Kurz (2 Level)',
            clinical: 'Klinisch (Spezifisches Protokoll)',
            timeSettings: 'Zeiteinstellungen',
            levelTime: 'Level-Zeit',
            analysisMetrics: 'Analysemetriken',
            reactionTime: 'Reaktionszeit',
            errorRate: 'Fehlerrate',
            interferenceIndex: 'Interferenzindex',
            learningCurve: 'Lernkurve',
            fatigueIndex: 'Ermüdungsindex',
            gameSettings: 'Spieleinstellungen',
            difficulty: 'Schwierigkeit',
            easy: 'Leicht',
            medium: 'Mittel',
            hard: 'Schwer',
            expert: 'Experte',
            sounds: 'Töne',
            enableSounds: 'Töne Aktivieren',
            versionInfo: 'Versionsinformationen',
            currentVersion: 'Aktuelle Version',
            lastUpdate: 'Letzte Aktualisierung',
            versionHistory: 'Versionsverlauf',
            noHistory: 'Kein Verlauf verfügbar.',
            loading: 'Laden...',
            loadingHistory: 'Verlauf wird geladen...',
            notAvailable: 'Nicht verfügbar',
            upgrade: 'Upgrade',
            downgrade: 'Downgrade',
            installation: 'Installation',
            saveSettings: 'Einstellungen Speichern'
        },
        // Index page
        index: {
            title: 'Stroop-Test',
            pageTitle: 'Spielen Sie den Stroop-Test',
            description: 'Der berühmte "Stroop-Effekt" ist nach J. Ridley Stroop benannt, der dieses seltsame Phänomen in den 1930er Jahren entdeckte. Der Test besteht darin, die Farben der Wörter zu benennen, NICHT die Wörter zu lesen... sondern die Farbe der Wörter zu sagen. Wenn zum Beispiel das Wort "BLAU" in Rot gedruckt ist, sollten Sie "ROT" sagen. Und das ist nicht so einfach, wie man sich vorstellen könnte!',
            psyDescription: 'In der Psychologie ist der Stroop-Effekt (Jaensch-Effekt) eine Demonstration von Interferenz in der Reaktionszeit einer Aufgabe. Wenn zum Beispiel ein Wort wie blau, grün, rot usw. in einer Farbe gedruckt wird, die sich von der durch seine semantische Bedeutung ausgedrückten Farbe unterscheidet (Beispiel: das Wort rot in blauer Tinte gedruckt), tritt eine Verzögerung bei der Verarbeitung der Wortfarbe auf, was langsamere Reaktionszeiten und mehr Fehler verursacht. Der Effekt ist nach seinem Entdecker John Ridley Stroop benannt und wurde ursprünglich im Artikel "Studies of interference in serial verbal reactions" im Journal of Experimental Psychology 1935 veröffentlicht.',
            source: '( Quelle: Wikipedia )',
            gameTitle: 'Stroop-Test Spiel (Mit einem Hauch von Grausamkeit...)',
            gameDescription: 'Dieses Spiel wendet die Konzepte dieses berühmten Tests an und trainiert Ihre Aufmerksamkeit und Fähigkeit, Interferenzen in der Reaktionszeit zu reduzieren. Aber über die Aufgabe hinaus, auf Wörter zu klicken, die ihre Farben beschreiben, enthält dieses Spiel geometrische Formen mit Farben und Formen, die sich von ihren Beschreibungen unterscheiden, und die Spieler werden gebeten, auf die richtige Figur zu klicken, was die Schwierigkeit erhöht. Es gibt keine Strafe für Fehler, außer dass keine Punkte erzielt werden. Die zu addierende Punktzahl beginnt bei 100 und nimmt jede Sekunde ab. Richtige Antworten erhalten einen grünen Rahmen und die aktuelle Punktzahl wird addiert, andernfalls einen roten Rahmen ohne Punkte.',
            privacyPolicy: 'Datenschutzrichtlinie'
        },
        // Offline page
        offline: {
            title: 'Keine Verbindung',
            message: 'Sie sind offline. Bitte überprüfen Sie Ihre Internetverbindung.',
            retry: 'Erneut Versuchen'
        },
        // Privacy page
        privacy: {
            title: 'Datenschutzrichtlinie',
            lastUpdate: 'Letzte Aktualisierung: 09. Januar 2026',
            welcome: 'Willkommen bei der <strong>Stroop-Test</strong> App. Wir schätzen Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen.',
            dataCollectionTitle: '1. Datenerfassung',
            dataCollection: 'Die <strong>Stroop-Test</strong> App sammelt, speichert, verarbeitet oder teilt keine persönlichen Benutzerdaten. Die App funktioniert vollständig offline und alle Fortschritts- oder Einstellungsdaten werden lokal auf Ihrem Gerät gespeichert.',
            permissionsTitle: '2. Berechtigungen',
            permissions: 'Die App kann grundlegende Systemberechtigungen anfordern, um zu funktionieren (wie Internetzugang, um das Spiel zum ersten Mal zu laden oder nach Updates zu suchen), greift aber nicht auf Kontakte, Kamera, Mikrofon, Standort oder persönliche Dateien zu.',
            cookiesTitle: '3. Cookies und Tracking',
            cookies: 'Wir verwenden keine Cookies, Tracking-Pixel oder andere Überwachungstechnologien, um Informationen über Ihre Nutzung der App zu sammeln.',
            contactTitle: '4. Kontakt',
            contact: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte über die Plattform, auf der Sie diese App heruntergeladen haben.',
            backToGame: 'Zurück zum Spiel'
        }
    }
};

// Current language - default to Portuguese (Brazil)
let currentLanguage = localStorage.getItem('stroopLanguage') || 'pt-BR';

/**
 * Get translation for a key path (e.g., 'game.level')
 * @param {string} keyPath - Dot-separated path to the translation key
 * @param {object} params - Optional parameters for string interpolation
 * @returns {string} The translated string
 */
function t(keyPath, params = {}) {
    const keys = keyPath.split('.');
    let value = translations[currentLanguage];

    for (const key of keys) {
        if (value && value[key] !== undefined) {
            value = value[key];
        } else {
            // Fallback to Portuguese if key not found
            value = translations['pt-BR'];
            for (const k of keys) {
                if (value && value[k] !== undefined) {
                    value = value[k];
                } else {
                    console.warn(`Translation key not found: ${keyPath}`);
                    return keyPath;
                }
            }
            break;
        }
    }

    // Replace parameters if any
    if (typeof value === 'string' && Object.keys(params).length > 0) {
        for (const [param, val] of Object.entries(params)) {
            value = value.replace(`{${param}}`, val);
        }
    }

    return value;
}

/**
 * Get color name in current language
 * @param {string} colorKey - Color key (red, green, blue, yellow, orange, purple)
 * @returns {string} Translated color name
 */
function getColorName(colorKey) {
    return translations[currentLanguage]?.colors?.[colorKey] ||
        translations['pt-BR'].colors[colorKey] ||
        colorKey;
}

/**
 * Get shape name in current language
 * @param {string} shapeKey - Shape key (square, circle, triangle)
 * @returns {string} Translated shape name
 */
function getShapeName(shapeKey) {
    return translations[currentLanguage]?.shapes?.[shapeKey] ||
        translations['pt-BR'].shapes[shapeKey] ||
        shapeKey;
}

/**
 * Get all color names as array in current language
 * @returns {string[]} Array of color names
 */
function getColorNames() {
    return Object.values(translations[currentLanguage]?.colors || translations['pt-BR'].colors);
}

/**
 * Get color key from display name
 * @param {string} displayName - The displayed color name in any language
 * @returns {string|null} The color key (red, green, etc.) or null if not found
 */
function getColorKeyFromName(displayName) {
    const langColors = translations[currentLanguage]?.colors || translations['pt-BR'].colors;
    for (const [key, name] of Object.entries(langColors)) {
        if (name === displayName) {
            return key;
        }
    }
    return null;
}

/**
 * Set the current language
 * @param {string} langCode - Language code (pt-BR, en, fr, de)
 */
function setLanguage(langCode) {
    if (translations[langCode]) {
        currentLanguage = langCode;
        localStorage.setItem('stroopLanguage', langCode);
        document.documentElement.lang = langCode === 'pt-BR' ? 'pt-BR' : langCode;
        applyTranslations();
        return true;
    }
    return false;
}

/**
 * Get the current language code
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);

        if (el.tagName === 'INPUT' && el.type === 'text') {
            el.placeholder = translation;
        } else if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });

    // Apply to title if exists
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        document.title = t(titleElement.getAttribute('data-i18n'));
    }
}

/**
 * Initialize i18n system
 */
function initI18n() {
    // Load saved language or use default
    const savedLang = localStorage.getItem('stroopLanguage');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    }

    // Set document language
    document.documentElement.lang = currentLanguage === 'pt-BR' ? 'pt-BR' : currentLanguage;

    // Apply translations on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTranslations);
    } else {
        applyTranslations();
    }
}

// Auto-initialize
initI18n();
