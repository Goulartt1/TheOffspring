# The Offspring - Site Tributo

Site tributo à banda The Offspring, desenvolvido como projeto de estudo de frontend. O objetivo foi praticar conceitos de HTML, CSS e JavaScript partindo dos fundamentos mais básicos em direção a conceitos avançados, simulando um fluxo real de desenvolvimento de software.

## Acesse o site

[https://goulartt1.github.io/TheOffspring](https://goulartt1.github.io/TheOffspring)

## Objetivo

Praticar o desenvolvimento frontend de forma incremental, passando por:

- Levantamento e documentação de requisitos
- Estrutura semântica com HTML5
- Estilização moderna com CSS (variáveis, Flexbox, Grid)
- Responsividade com media queries
- Suporte a dark/light mode com persistência (localStorage)
- Interatividade avançada com JavaScript puro (sem frameworks)
- Versionamento com Git e Conventional Commits
- Deploy com GitHub Pages

## Tecnologias

- HTML5
- CSS3 (variáveis, Grid, Flexbox, animações, transições)
- JavaScript (ES6+)
- Google Fonts (Bebas Neue, Inter)
- Spotify Embed
- GitHub Pages

## Funcionalidades

### HTML/CSS
- Layout responsivo (desktop, tablet, mobile)
- Dark/light mode com variáveis CSS
- Navbar sticky com glassmorphism (blur + transparência)
- Hero section com parallax e overlay
- Cards com hover effects
- Accordion colapsável
- Lightbox para imagens com navegação
- Modal de detalhes para integrantes e álbuns
- Mini-player Spotify fixo no rodapé
- Fundos alternados entre seções
- Tipografia com hierarquia de contraste

### JavaScript
- Toggle de tema com persistência via localStorage
- Smooth scroll na navegação
- Menu hamburger para mobile
- Lightbox com navegação (teclado + botões)
- Modal com navegação entre cards
- Accordion com lógica exclusiva
- Countdown ao vivo para próximo show
- Animações de entrada com IntersectionObserver
- Estatísticas animadas (counter com easeOut)
- Typing effect no subtítulo do hero
- Efeito parallax no hero
- Navegação ativa na navbar (highlight da seção visível)
- Botão "voltar ao topo" com aparição dinâmica

## Estrutura da página

| Seção | Descrição |
|---|---|
| Barra de Show | Countdown ao vivo para o próximo show |
| Navbar | Menu sticky com glassmorphism e navegação ativa |
| Hero | Imagem com parallax, typing effect e botão de ação |
| História | Texto sobre a trajetória da banda com imagem lateral |
| Estatísticas | Números animados (discos vendidos, álbuns, décadas) |
| Integrantes | Cards com modal de detalhes e zoom na imagem |
| Discografia | Grid com capas dos 10 álbuns e modal com informações |
| Galeria | Mosaico de fotos com lightbox e navegação |
| Player | Mini-player fixo no rodapé + seção informativa |
| Curiosidades | Accordion com fatos marcantes sobre a banda |
| Redes Sociais | Botões com links para as redes oficiais |
| Footer | Copyright e créditos |

## Estrutura de pastas

```
TheOffspring/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   ├── fonts/
│   └── videos/
└── README.md
```

## Conceitos praticados

### Engenharia de Software
- Levantamento de requisitos (funcionais e não-funcionais)
- Versionamento com Git (commits, push, pull)
- Conventional Commits
- Scaffolding de projeto
- Code Review

### HTML
- Semântica (header, nav, main, section, footer)
- Acessibilidade (alt, aria-label)
- Data attributes
- Links internos e externos com segurança
- Embed de conteúdo externo

### CSS
- Custom Properties (variáveis)
- Flexbox e Grid
- Position (sticky, fixed, absolute, relative)
- Media queries e responsividade
- Transições e animações (keyframes)
- Pseudo-classes e pseudo-elementos
- Object-fit e object-position
- Backdrop-filter (glassmorphism)

### JavaScript
- Seleção e manipulação do DOM
- Eventos (click, scroll, keydown)
- classList (toggle, add, remove, contains)
- createElement e appendChild
- forEach com índice
- Objetos e Object.values()
- Template literals
- setInterval / clearInterval
- Date e cálculos de tempo
- Operador ternário
- preventDefault e event bubbling
- IntersectionObserver
- requestAnimationFrame
- localStorage
- Funções nomeadas vs anônimas

## Status

Projeto concluído.
