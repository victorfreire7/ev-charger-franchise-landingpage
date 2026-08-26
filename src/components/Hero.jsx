import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas }  from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ChargerModel from './ChargerModel'
import './Hero.css'

export default function Hero() {
  const sectionRef     = useRef(null)   // seção sticky inteira
  const scrollProgress = useRef(0)      // 0→1, lido pelo ChargerModel no useFrame
  const [boxVisible, setBoxVisible]   = useState(false)
  const [copyVisible, setCopyVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect     = section.getBoundingClientRect()
      const sectionH = section.offsetHeight
      const viewH    = window.innerHeight

      // quanto do scroll dentro da seção já foi consumido (0→1)
      const scrolled = -rect.top                     // px rolados dentro da seção
      const total    = sectionH - viewH              // total de px disponíveis
      const t        = Math.max(0, Math.min(1, scrolled / total))

      scrollProgress.current = t

      // caixas aparecem depois de 55% do scroll da seção
      setBoxVisible(t > 0.55)

      // copy desaparece nos primeiros 35%
      setCopyVisible(t < 0.35)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Seção sticky do modelo 3D ── */}
      <section ref={sectionRef} className="model-section">

        {/* Canvas fixo na viewport enquanto a seção for sticky */}
        <div className="model-sticky">

          {/* Gradiente de fundo */}
          <div className="model-bg" />

          {/* Canvas 3D */}
          <Canvas
            className="model-canvas"
            camera={{ position: [0, 0.8, 7], fov: 36 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 3]}  intensity={1.4} castShadow />
            <directionalLight position={[-3, 2, -2]} intensity={0.3} />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <ChargerModel scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>

          {/* Copy inicial — some ao rolar */}
          <div className={`hero-copy ${copyVisible ? '' : 'hero-copy--hidden'}`}>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">GoodWe × FIAP · 2026</span>
            </div>
            <h1 className="hero-headline">
              O futuro<br />
              da recarga<br />
              <span className="hero-headline-accent">é seu.</span>
            </h1>
            <div className="hero-charge-bar">
              <div className="hero-charge-bar-fill" />
            </div>
            <p className="hero-subtitle">
              Monte sua franquia de carregadores elétricos e lidere
              a transição energética na sua cidade.
            </p>
            <button className="hero-cta">
              Quero ser franqueado
              <span className="hero-cta-arrow">→</span>
            </button>
          </div>

          {/* Caixas laterais glassmorphism */}
          <div className={`info-boxes ${boxVisible ? 'info-boxes--visible' : ''}`}>
            <div className="info-box info-box--left">
              <span className="info-box-tag">Infraestrutura</span>
              <h3 className="info-box-title">Tecnologia de ponta, plug-and-play</h3>
              <p className="info-box-body">
                Equipamentos GoodWe certificados, instalação assistida e
                monitoramento remoto 24 h diretamente no seu painel.
              </p>
              <div className="info-box-stat">
                <span className="info-box-stat-value">22 kW</span>
                <span className="info-box-stat-label">potência por conector</span>
              </div>
            </div>

            <div className="info-box info-box--right">
              <span className="info-box-tag">Modelo de negócio</span>
              <h3 className="info-box-title">Receita recorrente desde o primeiro dia</h3>
              <p className="info-box-body">
                Cobrança por kWh carregado, gestão via app e suporte
                completo da rede franqueadora para você focar no crescimento.
              </p>
              <div className="info-box-stat">
                <span className="info-box-stat-value">ROI</span>
                <span className="info-box-stat-label">estimado em 18 meses</span>
              </div>
            </div>
          </div>

          {/* Hint de scroll */}
          <div className={`hero-scroll-hint ${boxVisible ? 'hero-scroll-hint--hidden' : ''}`}>
            <span>Role para ver</span>
            <div className="hero-scroll-dot" />
          </div>

        </div>{/* fim .model-sticky */}
      </section>

      {/* ── Seção de conteúdo ── */}
      <section className="content-section">
        <div className="content-inner">
          <div className="content-eyebrow">
            <div className="content-eyebrow-line" />
            <span>Como funciona</span>
          </div>

          <h2 className="content-headline">
            Três passos para sua<br />
            <strong>franquia em operação</strong>
          </h2>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h4 className="step-title">Aquisição e projeto</h4>
              <p className="step-body">
                Você escolhe o pacote de franquia e nossa equipe realiza o
                estudo de viabilidade do ponto, projeto elétrico e licenciamento.
              </p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h4 className="step-title">Instalação assistida</h4>
              <p className="step-body">
                Técnicos certificados GoodWe instalam e comissionam os
                carregadores. Você acompanha cada etapa pelo painel digital.
              </p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h4 className="step-title">Operação e receita</h4>
              <p className="step-body">
                Sua unidade entra em operação. O app cuida da cobrança,
                você acompanha os resultados em tempo real e recebe mensalmente.
              </p>
            </div>
          </div>

          <button className="content-cta">
            Falar com um consultor
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">ChargePoint<span>Franchise</span></span>
            <p className="footer-tagline">A energia do futuro, no seu negócio hoje.</p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <span className="footer-col-title">Franquia</span>
              <a href="#">Como funciona</a>
              <a href="#">Planos</a>
              <a href="#">Depoimentos</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Empresa</span>
              <a href="#">Sobre nós</a>
              <a href="#">GoodWe</a>
              <a href="#">FIAP</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Contato</span>
              <a href="#">contato@chargepoint.com.br</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ChargePoint Franchise · GoodWe EV Challenge · FIAP</span>
          <div className="footer-bottom-line" />
        </div>
      </footer>
    </>
  )
}
