# Teste de Stroop

Jogo/PWA baseado no efeito Stroop, criado para treinar atenção, percepção e controle cognitivo em rodadas rápidas.

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

Arquivos de assinatura, keystores, senhas e credenciais de publicação não devem ser adicionados a este repositório.

## Privacidade

O app não deve coletar dados pessoais sem necessidade explícita. Mudanças que alterem comportamento de privacidade devem atualizar também a política em [privacy.html](privacy.html).
