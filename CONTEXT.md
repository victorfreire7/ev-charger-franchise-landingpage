# Contextualização do Projeto — ev-charger-franchise
> Script gerado para onboarding de outra IA no contexto deste projeto.

---

## 1. Quem é o desenvolvedor

**Victor Hugo** — estudante de 1º ano de Ciência da Computação na FIAP (São Paulo), com formação técnica prévia em Informática para Internet e Desenvolvimento de Sistemas pela ETEC. Desenvolvedor full stack com foco em backend, stack principal em JavaScript/TypeScript com Node.js. Experiência adicional com Python, PHP, REST APIs, Redis, MySQL, MongoDB, Sequelize ORM, Docker e VMs em cloud (Azure, GCP).

Victor está desenvolvendo **sozinho** todo o código deste projeto.

---

## 2. O que é o projeto

Projeto final do **GoodWe EV Challenge 2026**, realizado na FIAP em parceria com a empresa GoodWe. O entregável é um **projeto autoral acompanhado de vídeo pitch**.

**Conceito de negócio:** uma franquia de carregadores elétricos, nos moldes de um posto de gasolina — onde um empresário compra e constrói sua própria unidade de recarga. A proposta é democratizar o acesso à infraestrutura de recarga elétrica via modelo de franquia.

---

## 3. Escopo completo da aplicação

O projeto será desenvolvido em etapas. A ordem de prioridade é:

### Etapa 1 — Frontend (em andamento)
Landing page institucional voltada para **atrair empresários** interessados em adquirir a franquia. Foco em impacto visual e credibilidade.

### Etapa 2 — Backend (futura)
- Cadastro e login de empresários franqueados
- Painel administrativo por franquia com métricas operacionais:
  - Quantidade de carga despejada na semana
  - Quantidade de carros carregados
  - (outras métricas a definir)

---

## 4. Stack tecnológica

| Camada     | Tecnologia                                              |
|------------|---------------------------------------------------------|
| Frontend   | React + Vite                                            |
| 3D         | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Fontes     | Google Fonts — Bebas Neue (display) + Inter (corpo)     |
| Backend    | A definir (provavelmente Node.js/TypeScript, padrão do Victor) |

---

## 5. Estado atual do frontend

### Estrutura de arquivos
```
ev-charger-franchise/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── models/
│       └── charger.glb          ← modelo 3D do carregador (2MB, textura 1K, formato glTF binary)
└── src/
    ├── main.jsx
    ├── App.jsx                  ← apenas renderiza <Hero />
    ├── index.css                ← reset global + fonte Inter
    └── components/
        ├── Hero.jsx             ← componente principal da landing page
        ├── Hero.css             ← estilos do hero
        └── ChargerModel.jsx     ← lógica 3D do modelo + animação de scroll
```

### O que está implementado

**`ChargerModel.jsx`**
- Carrega o arquivo `public/models/charger.glb` via `useGLTF`
- Calcula automaticamente o bounding box do modelo e o centraliza em cena (independente das dimensões originais do .glb)
- Escala o modelo para altura alvo de 3 unidades Three.js
- A cada frame (`useFrame`), lê o `scroll.offset` (0→1) via `useScroll` do drei e:
  - Interpola `position.y` de `START_Y = 2.8` até `END_Y = -0.4` (modelo desce conforme o scroll)
  - Interpola `rotation.y` de `0` até `Math.PI * 0.35` (leve rotação durante a descida)
- `ContactShadows` embaixo do modelo para dar sensação de peso/profundidade

**`Hero.jsx`**
- Canvas React Three Fiber fullscreen (position absolute, inset 0)
- Câmera em `position: [0, 0.8, 7]`, `fov: 36` — recuada o suficiente para ver o modelo inteiro
- Iluminação: `ambientLight` (0.5) + `directionalLight` principal (1.4, vinda de cima-frente-direita) + `directionalLight` de preenchimento (0.3)
- `ScrollControls pages={4} damping={0.3}` — 4 alturas de viewport de espaço de scroll
- Componente interno `CopyFader`: lê o scroll e aplica `opacity` no texto — some entre 0% e 40% do scroll, deixando o modelo em destaque quando pousa
- HTML sobre o canvas via `<Scroll html>`:
  - Eyebrow label: `"GoodWe × FIAP · 2026"` com linha âmbar à esquerda
  - Headline em Bebas Neue: `"O futuro da recarga é seu."` (accent em âmbar)
  - Barra de "carregamento" âmbar: anima de 0% a 100% em 1.4s ao carregar a página (assinatura visual do design)
  - Subtítulo em Inter Light
  - Botão CTA: `"Quero ser franqueado →"`
- Indicador de scroll fixo no rodapé (some ao rolar)

**`Hero.css`**
- Background: gradiente vertical preto profundo → azul petróleo (`#0a1f3d`) → preto (`#020608`) — tom de céu noturno urbano, compatível com o modelo 3D cyberpunk
- Paleta de cores:
  - `#080e1a` / `#0a1f3d` / `#020608` — backgrounds
  - `#E8C87A` — âmbar dourado (acento: eyebrow, headline accent, barra, CTA, scroll dot)
  - `#F2F0ED` — branco sujo (texto principal)
  - `rgba(242,240,237,0.72)` — subtítulo
- Layout do copy: coluna flex alinhada à esquerda, `max-width: 52vw`, o modelo 3D ocupa naturalmente a direita
- Responsivo: em mobile (< 680px) o copy centraliza e ocupa largura total

---

## 6. Decisões de design tomadas (não reverter sem consultar o Victor)

- **Gradiente de fundo:** azul petróleo escuro. Victor havia escolhido anteriormente um degradê cinza-vinho-preto, mas foi substituído a pedido dele por algo mais adequado ao estilo cyberpunk do modelo 3D.
- **Tipografia:** Bebas Neue + Inter. Escolha deliberada — industrial e premium, compatível com o público-alvo (empresários).
- **Barra âmbar animada:** assinatura visual única do design. Referência sutil à barra de progresso de carregamento de EV. Não remover.
- **Fade do texto no scroll:** comportamento intencional — o texto some para deixar o modelo em foco no "pouso".
- **`pages={4}`:** valor atual do scroll. Houve uma tentativa de aumentar para 7 que foi revertida a pedido do Victor. O ajuste fino desse valor ainda está em aberto.

---

## 7. O que ainda NÃO foi feito (próximas etapas do frontend)

- Seções abaixo do hero (modelo de negócio, planos de franquia, diferenciais, contato)
- Navbar
- Footer
- Formulário de captação de leads ("Quero ser franqueado")
- Otimização de performance (lazy load do Canvas, code splitting do three.js)
- Backend completo (autenticação, dashboard do franqueado)

---

## 8. Como rodar o projeto

```bash
cd ev-charger-franchise
npm install
npm run dev
```

> ⚠️ O arquivo `public/models/charger.glb` NÃO é versionado automaticamente (é binário, 2MB). Se clonar o projeto do zero, o Victor precisa copiar manualmente o .glb para `public/models/charger.glb`. Sem esse arquivo o modelo 3D não carrega e a página fica em branco (o Suspense não tem fallback visual ainda).

---

## 9. Diretrizes de trabalho do Victor

Antes de implementar qualquer coisa, seguir estas regras:

1. **Pensar antes de codar** — levantar assunções explicitamente, perguntar quando há ambiguidade, apresentar tradeoffs antes de escolher.
2. **Simplicidade primeiro** — mínimo de código que resolve o problema. Sem features não pedidas, sem abstrações desnecessárias.
3. **Mudanças cirúrgicas** — tocar apenas o que foi pedido. Não "melhorar" código adjacente sem ser solicitado.
4. **Critérios de sucesso verificáveis** — antes de implementar, definir como verificar que funcionou.
5. **Dúvidas vêm antes da implementação**, nunca depois de um erro.
