<p align="center">
  <img src="https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

<h1 align="center">ChargePoint Franchise — Landing Page</h1>

<p align="center">
  Site institucional da franquia de carregadores elétricos desenvolvido para o <strong>GoodWe EV Challenge 2026 · FIAP</strong>.<br/>
  Construído para atrair empresários interessados em investir numa unidade de recarga elétrica.
</p>

---

## 🌐 Demo

> **Site no ar:** [`https://ev-charger-franchise-landingpage.vhugo-freire159.workers.dev`](https://ev-charger-franchise-landingpage.vhugo-freire159.workers.dev)

<!-- Substitua o bloco abaixo por um GIF ou screenshot do hero 3D após gravar -->
<!-- ![Demo do hero 3D](./docs/demo.gif) -->

---

## ✨ Funcionalidades

- **Modelo 3D interativo:** carregador elétrico cyberpunk renderizado com Three.js — desce conforme o scroll e termina centralizado e de frente para o usuário
- **Animação de entrada com scroll nativo:** seção `sticky` de 4× a altura da viewport, sem bibliotecas de scroll externas
- **Info boxes glassmorphism:** duas caixas laterais com `backdrop-filter: blur` que aparecem ao final do scroll com fade + slide e efeito de hover
- **Seção "Como funciona":** três passos do modelo de franquia (Aquisição → Instalação → Operação)
- **CTA para cadastro:** botão "Quero ser franqueado" redireciona para a página de cadastro do sistema
- **CTA para WhatsApp:** botão "Falar com um consultor" abre conversa direta via `wa.me`
- **Design responsivo:** adaptado para mobile (< 680px)

---

## 🛠️ Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Framework de UI |
| Vite | 8 | Bundler + dev server |
| Three.js | 0.185 | Motor de renderização 3D |
| @react-three/fiber | 9 | Wrapper React para Three.js |
| @react-three/drei | 10 | Helpers 3D (ContactShadows, Environment, useGLTF) |
| Google Fonts | — | Bebas Neue (headlines) + Inter (corpo) |

---

## 📁 Estrutura de arquivos

```
landing-page/
├── index.html                  # HTML raiz — importa fontes do Google Fonts
├── vite.config.js
├── package.json
├── public/
│   └── models/
│       └── charger.glb         # Modelo 3D (2MB, textura 1K — ver aviso abaixo)
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Renderiza apenas <Hero />
    ├── index.css               # Reset global + variáveis base
    └── components/
        ├── Hero.jsx            # Página inteira: hero 3D + content section + footer
        ├── Hero.css            # Todos os estilos — paleta, layout, animações
        └── ChargerModel.jsx    # Lógica 3D: carrega .glb, calcula bounding box,
                                #   anima position.y e rotation.y via scrollProgress
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/victorfreires7/SEU_REPO.git
cd SEU_REPO/landing-page

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no browser.

---

## ⚠️ Observação sobre o modelo 3D

O arquivo `public/models/charger.glb` é um binário de **2MB** e pode ser ignorado pelo git por padrão. Se após clonar o projeto o canvas aparecer em branco, adicione o arquivo manualmente ao repositório:

```bash
git add public/models/charger.glb -f
git commit -m "add 3D charger model"
git push
```

O modelo é o [Cyberpunk Charger](https://sketchfab.com/3d-models/cyberpunk-charger-81b71a146ec54c7a82894ef02f1f465c) por **Renafox** no Sketchfab.

---

## ☁️ Deploy — Cloudflare Pages

Este projeto está configurado para deploy automático via **Cloudflare Pages** integrado ao GitHub.

| Configuração | Valor |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `landing-page` |

A cada `git push` na branch `main`, a Cloudflare executa o build e republica automaticamente.

---

## 🔗 Parte do projeto maior

Esta landing page é um dos dois produtos do **ChargePoint Franchise**:

| Produto | Descrição | Repositório |
|---|---|---|
| **Landing Page** | Site institucional para captação de franqueados | este repositório |
| **Thunderbolt** | Painel de gestão operacional do franqueado | [ev-charger-franchise-system](https://github.com/victorfreires7/ev-charger-franchise-system) |

---

## 👤 Autor

**Victor Hugo**  
Estudante de Ciência da Computação — FIAP · 1º ano  
GitHub: [@victorfreires7](https://github.com/victorfreires7)

---

<p align="center">
  Desenvolvido para o <strong>GoodWe EV Challenge 2026</strong> · FIAP
</p>
