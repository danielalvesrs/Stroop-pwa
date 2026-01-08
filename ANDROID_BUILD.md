# Guia de Publicação Android (PWA para Play Store)

Para converter seu PWA (Web App) em um aplicativo Android real (APK/AAB) e publicar na Google Play Store, utilizaremos o conceito de **Trusted Web Activity (TWA)**.

## Pré-requisitos
1. **PWA Validado**: Já ajustamos seus ícones e manifesto.
2. **Hospedagem HTTPS**: Seu site DEVE estar publicado em uma URL pública com HTTPS (ex: Firebase Hosting).
   - Se ainda não fez o deploy: `firebase deploy`

---

## Opção 1: PWABuilder (Mais Fácil - Recomendado)
Esta ferramenta online gera o projeto Android automaticamente para você.

1. Acesse [PWABuilder.com](https://www.pwabuilder.com/).
2. Digite a URL do seu site (pós-deploy) e clique em **Start**.
3. Aguarde a análise (deve dar tudo "Ready" ou próximo disso).
4. Clique em **Package for Stores**.
5. Em **Android**, clique em **Generate**.
   - **Signing Key**: Escolha "Create new" para gerar uma chave de assinatura oficial (guarde o arquivo `.keystore` gerado, ele é crucial para atualizações futuras!).
   - Preencha os detalhes (Nome, Pacote ex: `com.seunome.stroop`).
6. Baixe o pacote gerado.
   - O arquivo `.aab` (Android App Bundle) é o que você enviará para a Play Store.
   - O arquivo `.apk` pode ser usado para testar no seu celular agora.

---

## Opção 2: Bubblewrap CLI (Avançado - Linha de Comando)
Se você tem Java SDK e Android SDK instalados e prefere fazer localmente.

1. Instale o CLI: `npm install -g @bubblewrap/cli`
2. Inicie o projeto: `bubblewrap init --manifest https://sua-url.com/manifest.json`
3. Responda às perguntas de configuração.
4. Construa o app: `bubblewrap build`

---

## Publicando na Play Store

1. Crie uma conta de desenvolvedor no [Google Play Console](https://play.google.com/console) (Taxa única de $25 USD).
2. Crie um novo App.
3. Preencha a **Store Listing** (Nome, Descrição, Screenshots).
   - *Dica*: Tire prints do jogo rodando no navegador móvel para usar aqui.
4. Em **Release > Production**, faça upload do arquivo `.aab` gerado.
5. **Asset Links**:
   - A Play Store vai te dar um "SHA-256 fingerprint".
   - Você precisa atualizar seu PWA para provar que é dono do site.
   - Crie um arquivo `assetlinks.json` e hospede em `https://sua-url.com/.well-known/assetlinks.json`.
   - O PWABuilder ou Bubblewrap ajudam a gerar o conteúdo deste arquivo.

---
**Nota sobre `pwa-android-bun`**: Se você pretendia usar um boilerplate específico com esse nome, note que o método acima (TWA) é o padrão oficial do Google para PWAs modernos e tem melhor performance.
