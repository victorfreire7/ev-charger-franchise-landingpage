import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import ChargerModel from './ChargerModel'
import './Hero.css'

// Fade out do texto conforme o usuário rola
function CopyFader({ children }) {
  const ref = useRef()
  const scroll = useScroll()

  useFrame(() => {
    if (!ref.current) return
    // some suavemente entre 0% e 40% do scroll total
    const opacity = 1 - Math.min(scroll.offset / 0.4, 1)
    ref.current.style.opacity = opacity
  })

  return (
    <div ref={ref} className="hero-copy">
      {children}
    </div>
  )
}

export default function Hero() {
  return (
    <div className="hero">
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0.8, 7], fov: 36 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />

        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.3}>
            <ChargerModel />

            <Scroll html>
              <CopyFader>
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
              </CopyFader>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      <div className="hero-scroll-hint">
        <span>Role para ver</span>
        <div className="hero-scroll-dot" />
      </div>
    </div>
  )
}
