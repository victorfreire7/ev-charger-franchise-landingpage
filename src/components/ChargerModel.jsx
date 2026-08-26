import { useRef, useLayoutEffect, useState } from 'react'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const START_Y = 2.8
const END_Y   = -0.2

export default function ChargerModel({ scrollProgress }) {
  const { scene } = useGLTF('/models/charger.glb')
  const group     = useRef()
  const [fitScale, setFitScale] = useState(1)

  useLayoutEffect(() => {
    const box  = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    scene.position.x -= center.x
    scene.position.z -= center.z
    scene.position.y -= box.min.y

    setFitScale(3 / (size.y || 1))
  }, [scene])

  useFrame(() => {
    if (!group.current) return
    const t = scrollProgress.current
    group.current.position.y = THREE.MathUtils.lerp(START_Y, END_Y, t)
    group.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.35, t)
  })

  return (
    <group ref={group} scale={fitScale}>
      <primitive object={scene} />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={8}
        blur={2}
        far={2}
      />
    </group>
  )
}

useGLTF.preload('/models/charger.glb')
