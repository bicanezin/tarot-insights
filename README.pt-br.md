# Projeto Firebase Studio Next.js

## Visão Geral

Este projeto é uma aplicação web full-stack construída usando [Next.js](https://nextjs.org/) e [Firebase Studio](https://firebase.google.com/products/studio), um ambiente de desenvolvimento em nuvem para prototipagem rápida e implantação de aplicações. O projeto utiliza [next-intl](https://next-intl-docs.vercel.app/) para internacionalização (i18n), suportando múltiplos idiomas (por exemplo, inglês e português) com roteamento baseado em localização.

### Propósito

Tarot Insights foi projetado para fornecer aos usuários leituras personalizadas de tarô e orientação espiritual em seu idioma preferido. A aplicação visa tornar as leituras de tarô mais acessíveis e significativas, combinando a sabedoria tradicional do tarô com tecnologia moderna.

### O que faz

- Fornece leituras interativas de tarô com interpretações detalhadas
- Oferece tiragens diárias com insights personalizados
- Suporta múltiplos idiomas para um público global
- Oferece interpretações aprimoradas por IA mantendo a sabedoria tradicional do tarô
- Permite aos usuários salvar e acompanhar seu histórico de leituras
- Fornece conteúdo educacional sobre simbolismo e significados do tarô

A aplicação está hospedada no Firebase Studio em:  
[https://studio--tarot-insights-c2rwx.us-central1.hosted.app/](https://studio--tarot-insights-c2rwx.us-central1.hosted.app/)

## Funcionalidades

- **Internacionalização (i18n)**: Suporta múltiplos idiomas (por exemplo, `en`, `pt`) com URLs prefixadas por localidade (por exemplo, `/en`, `/pt`).
- **Next.js App Router**: Utiliza o Next.js App Router para renderização do lado do servidor e roteamento dinâmico.
- **Integração Firebase**: Construído e implantado via Firebase Studio, com potencial integração de serviços Firebase (por exemplo, Firestore, Storage, Authentication).

## Estrutura do Projeto

```plaintext
src/
├── app/
│   └── [locale]/
│       └── page.tsx       # Página inicial para cada localidade
├── config/
│   └── i18n-config.ts     # Configuração centralizada de i18n
├── messages/
│   ├── en.json            # Traduções em inglês
│   └── pt.json            # Traduções em português
├── middleware.ts          # Middleware Next.js para roteamento i18n
├── navigation.ts          # Utilitários de navegação para next-intl
├── i18n.ts               # Validação de localidade do servidor e carregamento de traduções
└── public/                # Ativos estáticos
```

## Instalação

1. **Clonar o Repositório**:

   ```bash
   git clone https://github.com/bicanezin/tarot-insights.git
   cd tarot-insights
   ```

2. **Instalar Dependências**:

   ```bash
   npm install
   ```

   Dependências principais incluem:
   - `next`
   - `next-intl`
   - `firebase` (se os serviços Firebase forem utilizados)

3. **Configurar Ambiente**:
   - Certifique-se de que o ambiente do Firebase Studio esteja configurado (por exemplo, via `dev.nix` se personalizado).
   - Se estiver usando serviços Firebase, inicialize o SDK do Firebase adicionando sua configuração ao projeto.

## Executando o Projeto

1. **Modo de Desenvolvimento**:

   ```bash
   npm run dev
   ```

   Isso inicia o servidor de desenvolvimento Next.js, geralmente acessível em `http://localhost:3000`.

2. **Acessando a Aplicação**:
   - Visite `/` para ser redirecionado para a localidade padrão (por exemplo, `/en`).
   - Localidades suportadas: `en` (Inglês), `pt` (Português).

3. **Build de Produção**:

   ```bash
   npm run build
   npm run start
   ```

## Configuração de Internacionalização

O projeto usa `next-intl` para i18n com a seguinte configuração (definida em `src/config/i18n-config.ts`):

```typescript
export const i18nConfig = {
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
  },
};
```

- **Middleware**: O arquivo `src/middleware.ts` lida com o roteamento de localidade, redirecionando requisições como `/` para `/en/` (localidade padrão).
- **Traduções**: Armazenadas em `src/messages/[locale].json` (por exemplo, `en.json`, `pt.json`).
- **Navegação**: Usa `createSharedPathnamesNavigation` do `next-intl` para links e redirecionamentos com consciência de localidade.

## Solução de Problemas

### Erro 404 no Caminho Raiz (`/`)

Se você encontrar um erro 404 ao visitar o caminho raiz (`/`), provavelmente é devido ao middleware não redirecionar para um caminho localizado. Para resolver:

1. **Verificar Middleware**:
   - Certifique-se de que `src/middleware.ts` esteja configurado com `localeDetection: false` e um matcher como `/((?!api|_next|_vercel|.*\\..*).*)`.
   - Exemplo:

     ```typescript
     import { createMiddleware } from 'next-intl/middleware';
     import { i18nConfig } from './config/i18n-config';

     export default createMiddleware({
       locales: i18nConfig.locales,
       defaultLocale: i18nConfig.defaultLocale,
       localePrefix: i18nConfig.localePrefix,
       pathnames: i18nConfig.pathnames,
       localeDetection: false,
     });

     export const config = {
       matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
     };
     ```

2. **Verificar Estrutura de Arquivos**:
   - Certifique-se de que `src/app/[locale]/page.tsx` existe para lidar com rotas localizadas.

3. **Problemas de Ambiente**:
   - Se o workspace não estiver carregando, tente:
     - Executar `Hard Restart` ou `Rebuild Environment` do command palette
     - Verificar logs para erros do servidor Next.js
     - Garantir que cookies de terceiros estejam habilitados para previews

4. **Limpar Cache**:

   ```bash
   rm -rf .next
   npm run dev
   ```

### Outros Problemas Comuns

- **Workspace Não Respondendo**: Reinicie a VM ou verifique o Dashboard de Status do Firebase para interrupções
- **Tamanho Grande do Projeto**: Se o app estiver lento ou falhar ao carregar, considere otimizar o tamanho do projeto
- **Serviços Firebase**: Se estiver usando Firestore ou Storage, certifique-se de que o SDK do Firebase esteja inicializado corretamente

## Implantação

1. **Firebase Hosting**:
   - Implante o app usando o Firebase CLI:

     ```bash
     firebase deploy
     ```

   - Certifique-se de que o Firebase Hosting esteja habilitado no console do Firebase

2. **Cloud Build**:
   - Para implantações automatizadas, configure o Cloud Build com Firebase

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie um branch de feature (`git checkout -b feature/sua-feature`).
3. Faça commit das alterações (`git commit -m 'Adiciona sua feature'`).
4. Faça push para o branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.

## Recursos

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação next-intl](https://next-intl-docs.vercel.app/)
- [Documentação Firebase Studio](https://firebase.google.com/products/studio)
- [Comunidade Firebase Studio](https://community.firebasestudio.dev/)
- [Referência Firebase CLI](https://firebase.google.com/docs/cli)

## Licença

Este projeto está licenciado sob a Licença MIT.
