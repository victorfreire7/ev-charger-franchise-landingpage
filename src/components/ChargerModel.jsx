import { useRef, useLayoutEffect, useState } from 'react'
import { useGLTF, useScroll, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const START_Y = 2.8  // altura de onde o carregador "flutua" no início
const END_Y = -0.4   // desce levemente abaixo do centro ao fim do scroll

export default function ChargerModel() {
  const { scene } = useGLTF('/models/charger.glb')
  const group = useRef()
  const scroll = useScroll()
  const [fitScale, setFitScale] = useState(1)

  // Centraliza o modelo e calcula uma escala que caiba bem na cena,
  // já que não sabemos de antemão as dimensões originais do .glb
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    scene.position.x -= center.x
    scene.position.z -= center.z
    scene.position.y -= box.min.y // apoia a base do modelo em y = 0

    const targetHeight = 3
    setFitScale(targetHeight / (size.y || 1))
  }, [scene])

  useFrame(() => {
    if (!group.current) return
    const offset = scroll.offset // 0 -> 1 conforme o usuário rola
    group.current.position.y = THREE.MathUtils.lerp(START_Y, END_Y, offset)
    group.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.35, offset)
  })

  return (
    <group ref={group} scale={fitScale}>
      <primitive object={scene} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={8} blur={2} far={2} />
    </group>
  )
}

useGLTF.preload('/models/charger.glb')
