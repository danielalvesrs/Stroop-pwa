# Teste de Stroop

Jogo/PWA baseado no efeito Stroop, criado para treinar atenção, percepção e controle cognitivo em rodadas rápidas.

Jogue pela web: [https://stroopapp.netlify.app/](https://stroopapp.netlify.app/)

Disponível no Google Play: [Stroop](https://play.google.com/store/apps/details?id=app.netlify.stroopapp.twa)

O projeto também é usado como base para o aplicativo publicado no Google Play.

## Sobre o projeto

Este repositório contém a versão web/PWA do Teste de Stroop, incluindo:

- jogo com níveis de dificuldade;
- interface responsiva;
- suporte offline via service worker;
- manifesto PWA;
- arquivos usados para publicação como TWA na Google Play.

## Contribuições

Contribuições são bem-vindas.

Este projeto está ligado a um aplicativo publicado no Google Play. Alterações aceitas neste repositório podem ser incorporadas em versões futuras do app disponível publicamente.

Por isso, pull requests serão avaliados considerando estabilidade, experiência do usuário, compatibilidade com a versão publicada, privacidade e segurança.

São especialmente bem-vindas contribuições como:

- correções de bugs;
- melhorias de acessibilidade;
- ajustes de interface;
- melhorias de desempenho;
- revisão de textos;
- traduções;
- melhorias no modo PWA/offline.

Antes de abrir um pull request, prefira criar uma issue ou explicar claramente o objetivo da mudança.

## Rodando localmente

Com Bun instalado:

```bash
bun install
bun run dev
```

Depois abra o endereço local indicado no terminal.

Como o projeto é estático, também é possível servir a pasta com outro servidor HTTP local.

## Publicação Android

O app Android é gerado a partir do PWA usando Trusted Web Activity (TWA). Veja mais detalhes em [ANDROID_BUILD.md](ANDROID_BUILD.md).

Na prática, a maior parte das mudanças neste repositório é entregue pelo PWA publicado em `https://stroopapp.netlify.app/`. Como o app Android usa TWA, mudanças em HTML, CSS, JavaScript, textos, lógica do jogo, service worker, manifesto PWA e assets web normalmente passam a aparecer no app depois do deploy do site.

Algumas mudanças podem exigir gerar e enviar um novo `.aab` para o Google Play, especialmente quando envolverem:

- package name / identificador Android;
- assinatura, keystore ou configuração de publicação;
- ícone, nome ou metadados nativos usados pela casca Android;
- permissões Android;
- configuração TWA/Bubblewrap/PWABuilder;
- mudanças no vínculo de domínio, certificado ou `assetlinks.json`;
- qualquer ajuste que dependa da casca Android e não apenas do PWA hospedado.

Ao contribuir, informe no pull request se a mudança é apenas web/PWA ou se pode exigir nova publicação Android.

Arquivos de assinatura, keystores, senhas e credenciais de publicação não devem ser adicionados a este repositório.

## Privacidade

O app não deve coletar dados pessoais sem necessidade explícita. Mudanças que alterem comportamento de privacidade devem atualizar também a política em [privacy.html](privacy.html).

## Outros Trabalhos

Veja outros projetos em [github.com/danielalvesrs](https://github.com/danielalvesrs).

- [suno-music-dna](https://github.com/danielalvesrs/suno-music-dna): ferramenta para transformar referências musicais em prompts e letras prontos para criação com IA.
