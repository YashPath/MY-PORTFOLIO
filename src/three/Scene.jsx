import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Each "stop" sits SPACING units lower than the previous one.
// Scroll position (in viewport heights) maps 1:1 to a stop index.
export const SPACING = 12
const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
const isNarrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ───────── Hero: low-poly mountains ───────── */
function Mountains() {
  const geo = useMemo(() => {
    const seg = isMobile ? 48 : 80
    const g = new THREE.PlaneGeometry(60, 30, seg, seg / 2)
    const pos = g.attributes.position
    const colors = []
    const low = new THREE.Color('#1b2647'), mid = new THREE.Color('#4a5a8c'), snow = new THREE.Color('#f2f6ff')
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i)
      // layered sine "noise" → ridge line, higher toward the back
      let h = Math.sin(x * 0.35) * 1.6 + Math.sin(x * 0.9 + y * 0.6) * 0.9 + Math.cos(y * 0.5 - x * 0.2) * 1.2
      h = Math.max(0, h + 1.2) * (0.5 + (y + 15) / 16)
      h += (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.25 // jitter for low-poly feel
      pos.setZ(i, h)
      const t = Math.min(1, h / 5.5)
      const c = t > 0.72 ? snow.clone().lerp(mid, (1 - t) * 1.5) : low.clone().lerp(mid, t / 0.72)
      colors.push(c.r, c.g, c.b)
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g.toNonIndexed()
  }, [])
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -5.5, -12]}>
      <meshStandardMaterial vertexColors flatShading roughness={0.95} />
    </mesh>
  )
}

/* ───────── 01 Spices: bowl + swirling spice particles ───────── */
function Spices() {
  const swirl = useRef()
  const count = isMobile ? 260 : 600
  const { positions, colors } = useMemo(() => {
    const palette = ['#F5A524', '#D9480F', '#E8C547', '#8C2F0E', '#6B8E23'].map((c) => new THREE.Color(c))
    const p = new Float32Array(count * 3), c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, r = 0.6 + Math.random() * 2.2, h = Math.random() * 3.2
      p.set([Math.cos(a) * r, h - 0.4, Math.sin(a) * r], i * 3)
      const col = palette[i % palette.length]
      c.set([col.r, col.g, col.b], i * 3)
    }
    return { positions: p, colors: c }
  }, [count])
  useFrame((_, d) => { if (swirl.current && !reduced) swirl.current.rotation.y += d * 0.35 })
  return (
    <group rotation={[0.55, 0, 0]}>
      <Float speed={reduced ? 0 : 1.4} floatIntensity={0.6} rotationIntensity={0.2}>
        {/* bowl: lathe profile */}
        <mesh position={[0, -1, 0]}>
          <latheGeometry args={[[0, 0.5, 1.2, 1.55, 1.6].map((x, i) => new THREE.Vector2(x, i * 0.28)), 40]} />
          <meshStandardMaterial color="#8a5a34" roughness={0.55} side={THREE.DoubleSide} />
        </mesh>
        {/* spice mound */}
        <mesh position={[0, 0.05, 0]} scale={[1.45, 0.55, 1.45]}>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#E07B1A" roughness={1} flatShading />
        </mesh>
      </Float>
      <points ref={swirl}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors sizeAttenuation transparent opacity={0.95} />
      </points>
    </group>
  )
}

/* ───────── 02 Bakery: glazed donut + sprinkles + macarons ───────── */
function Bakery() {
  const donut = useRef()
  const sprinkles = useMemo(() => {
    const arr = []
    const cols = ['#ffffff', '#7DE3F4', '#F5A524', '#B388FF']
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 1.15 + (Math.random() - 0.5) * 0.7
      arr.push({ pos: [Math.cos(a) * r, Math.sin(a) * r, 0.52 + Math.random() * 0.06], rot: Math.random() * Math.PI, color: cols[i % cols.length] })
    }
    return arr
  }, [])
  useFrame((s, d) => {
    if (!donut.current || reduced) return
    donut.current.rotation.y += d * 0.4
    donut.current.rotation.x = 0.5 + Math.sin(s.clock.elapsedTime * 0.6) * 0.15
  })
  const Macaron = ({ position, color }) => (
    <Float speed={reduced ? 0 : 2} floatIntensity={1}>
      <group position={position} rotation={[0.4, 0, 0.2]} scale={0.45}>
        <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[1, 1, 0.45, 32]} /><meshStandardMaterial color={color} roughness={0.7} /></mesh>
        <mesh><cylinderGeometry args={[0.9, 0.9, 0.18, 32]} /><meshStandardMaterial color="#fff6ea" /></mesh>
        <mesh position={[0, -0.28, 0]}><cylinderGeometry args={[1, 1, 0.45, 32]} /><meshStandardMaterial color={color} roughness={0.7} /></mesh>
      </group>
    </Float>
  )
  return (
    <group>
      <group ref={donut} rotation={[0.5, 0, 0]}>
        <mesh><torusGeometry args={[1.15, 0.55, 24, 64]} /><meshStandardMaterial color="#d79a5b" roughness={0.8} /></mesh>
        <mesh position={[0, 0, 0.08]} scale={[1, 1, 0.9]}>
          <torusGeometry args={[1.15, 0.5, 24, 64]} />
          <meshStandardMaterial color="#F4A7B9" roughness={0.3} />
        </mesh>
        {sprinkles.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={[0, 0, s.rot]}>
            <capsuleGeometry args={[0.03, 0.12, 2, 6]} />
            <meshStandardMaterial color={s.color} />
          </mesh>
        ))}
      </group>
      <Macaron position={[-2.2, 1.4, -1]} color="#C8B6FF" />
      <Macaron position={[2.1, -1.3, -0.5]} color="#B5EAD7" />
    </group>
  )
}

/* ───────── 03 ASH GYM: dumbbell ───────── */
function Gym() {
  const bell = useRef()
  useFrame((s, d) => {
    if (!bell.current || reduced) return
    bell.current.rotation.y += d * 0.5
    bell.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.8) * 0.25
  })
  const Plates = ({ side }) => (
    <group position={[side * 1.35, 0, 0]}>
      {[0, 0.32, 0.6].map((o, i) => (
        <mesh key={i} position={[side * o, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1 - i * 0.18, 1 - i * 0.18, 0.26, 6]} />
          <meshStandardMaterial color={i === 0 ? '#3a4566' : '#56638c'} metalness={0.5} roughness={0.4} flatShading />
        </mesh>
      ))}
      <mesh position={[side * 0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 24]} />
        <meshStandardMaterial color="#FF6A2B" emissive="#FF6A2B" emissiveIntensity={0.7} />
      </mesh>
    </group>
  )
  return (
    <group ref={bell} rotation={[0.3, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 4.4, 24]} />
        <meshStandardMaterial color="#c9d1e3" metalness={0.9} roughness={0.2} />
      </mesh>
      <Plates side={1} />
      <Plates side={-1} />
    </group>
  )
}


/* ───────── 04 ASH_ Watches: exploded watch ───────── */
function Watch() {
  const root = useRef(), crystal = useRef(), bezel = useRef(), dial = useRef(), movement = useRef(), hour = useRef(), minute = useRef(), second = useRef()
  useFrame((s, d) => {
    const t = s.clock.elapsedTime
    if (root.current && !reduced) root.current.rotation.y = Math.sin(t * 0.4) * 0.6 - 0.3
    // "Look inside": parts drift apart and back together
    const e = reduced ? 0.5 : (Math.sin(t * 0.7) + 1) / 2
    if (crystal.current) crystal.current.position.z = 0.32 + e * 1.1
    if (bezel.current) bezel.current.position.z = 0.24 + e * 0.75
    if (dial.current) dial.current.position.z = 0.12 + e * 0.4
    if (movement.current) { movement.current.position.z = -0.05 - e * 0.45; if (!reduced) movement.current.rotation.z -= d * 0.6 }
    if (second.current && !reduced) second.current.rotation.z -= d * 1.2
    if (minute.current && !reduced) minute.current.rotation.z -= d * 0.1
  })
  const gold = '#D8B26E'
  const Hand = ({ r, len, w, color, z }) => (
    <group ref={r} position={[0, 0, z]}>
      <mesh position={[0, len / 2, 0]}><boxGeometry args={[w, len, 0.02]} /><meshStandardMaterial color={color} metalness={0.8} roughness={0.25} /></mesh>
    </group>
  )
  return (
    <group ref={root} rotation={[0.15, -0.3, 0]} scale={0.78}>
      {/* strap */}
      {[1, -1].map((sd) => (
        <mesh key={sd} position={[0, sd * 2.05, -0.1]}><boxGeometry args={[0.95, 1.9, 0.14]} /><meshStandardMaterial color="#20253a" roughness={0.8} /></mesh>
      ))}
      {/* case */}
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.25, 1.25, 0.4, 64]} /><meshStandardMaterial color="#b9c0cf" metalness={0.95} roughness={0.2} /></mesh>
      {/* movement (gear) */}
      <group ref={movement}>
        <mesh><torusGeometry args={[0.7, 0.08, 8, 24]} /><meshStandardMaterial color={gold} metalness={0.9} roughness={0.3} /></mesh>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[Math.cos((i / 12) * Math.PI * 2) * 0.8, Math.sin((i / 12) * Math.PI * 2) * 0.8, 0]} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
            <boxGeometry args={[0.14, 0.1, 0.08]} /><meshStandardMaterial color={gold} metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
      </group>
      {/* dial + indices + hands */}
      <group ref={dial}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.1, 1.1, 0.04, 64]} /><meshStandardMaterial color="#1a2238" roughness={0.45} /></mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.sin(a) * 0.88, Math.cos(a) * 0.88, 0.04]} rotation={[0, 0, -a]}>
              <boxGeometry args={[0.06, i % 3 === 0 ? 0.22 : 0.12, 0.03]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.5} />
            </mesh>
          )
        })}
        <Hand r={hour} len={0.5} w={0.07} color="#e8ecf5" z={0.05} />
        <Hand r={minute} len={0.78} w={0.05} color="#e8ecf5" z={0.07} />
        <Hand r={second} len={0.85} w={0.02} color={gold} z={0.09} />
      </group>
      {/* bezel ring */}
      <mesh ref={bezel}><torusGeometry args={[1.18, 0.09, 16, 64]} /><meshStandardMaterial color="#d9dee8" metalness={1} roughness={0.15} /></mesh>
      {/* crystal */}
      <mesh ref={crystal} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.12, 1.12, 0.05, 64]} /><meshPhysicalMaterial color="#cfe8ff" transparent opacity={0.22} roughness={0} metalness={0} /></mesh>
    </group>
  )
}


/* ───────── Skills: labels orbiting a glowing core ───────── */
function labelTexture(text) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  const font = '600 44px Inter, system-ui, sans-serif'
  ctx.font = font
  const w = Math.ceil(ctx.measureText(text).width) + 56, h = 76
  c.width = w; c.height = h
  ctx.font = font
  ctx.fillStyle = 'rgba(11,15,26,0.82)'
  ctx.strokeStyle = 'rgba(125,227,244,0.65)'
  ctx.lineWidth = 3
  const r = h / 2 - 3
  ctx.beginPath()
  ctx.roundRect(1.5, 1.5, w - 3, h - 3, r)
  ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#E8ECF5'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, w / 2, h / 2 + 2)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return { tex, aspect: w / h }
}

function SkillLabel({ text, height }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    const make = () => alive && setData(labelTexture(text))
    // wait for the web font so labels don't render in a fallback face
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(make)
    else make()
    return () => { alive = false }
  }, [text])
  if (!data) return null
  return (
    <sprite scale={[height * data.aspect, height, 1]}>
      <spriteMaterial map={data.tex} transparent depthWrite={false} fog={false} />
    </sprite>
  )
}

function SkillsOrbit({ rings }) {
  const groups = useRef([]), core = useRef()
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const boost = useRef(0)
  const use = isMobile ? [rings.flat().slice(0, 6)] : isNarrow ? rings.slice(0, 2) : rings
  const radii = isMobile ? [1.55] : isNarrow ? [1.4, 1.95] : [1.4, 1.85, 2.3]
  const tilts = isMobile ? [[0.35, 0, 0.1]] : isNarrow ? [[0.45, 0, 0.12], [0.3, 0, -0.3]] : [[0.5, 0, 0.15], [0.25, 0, -0.35], [0.7, 0, 0.45]]
  useFrame((_, d) => {
    if (reduced) return
    const y = window.scrollY
    boost.current = Math.min(2.5, boost.current * 0.92 + Math.abs(y - lastY.current) * 0.004)
    lastY.current = y
    const slow = window.__skillsHover ? 0.3 : 1
    groups.current.forEach((g, i) => {
      if (g) g.rotation.y += d * (0.18 + i * 0.05) * (i % 2 ? -1 : 1) * slow * (1 + boost.current)
    })
    if (core.current) { core.current.rotation.y += d * 0.3; core.current.rotation.x += d * 0.1 }
  })
  return (
    <group>
      <group ref={core}>
        <mesh><icosahedronGeometry args={[0.8, 1]} /><meshStandardMaterial color="#7DE3F4" emissive="#7DE3F4" emissiveIntensity={0.35} wireframe /></mesh>
        <mesh><sphereGeometry args={[0.58, 32, 16]} /><meshStandardMaterial color="#0f2a3a" emissive="#1b6b80" emissiveIntensity={0.6} roughness={0.4} /></mesh>
      </group>
      <Glow color="#7DE3F4" size={isMobile ? 6 : 8} />
      {use.map((ring, ri) => (
        <group key={ri} rotation={tilts[ri]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radii[ri], 0.006, 6, 128]} /><meshBasicMaterial color="#7DE3F4" transparent opacity={0.25} /></mesh>
          <group ref={(el) => (groups.current[ri] = el)}>
            {ring.map((label, li) => {
              const a = (li / ring.length) * Math.PI * 2
              return (
                <group key={label} position={[Math.cos(a) * radii[ri], 0, Math.sin(a) * radii[ri]]}>
                  <SkillLabel text={label} height={isMobile ? 0.27 : 0.23} />
                </group>
              )
            })}
          </group>
        </group>
      ))}
    </group>
  )
}

/* ───────── Accent glow: soft radial sprite behind each 3D object ───────── */
let glowTex
function glowTexture() {
  if (glowTex) return glowTex
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.35, 'rgba(255,255,255,0.35)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  glowTex = new THREE.CanvasTexture(c)
  return glowTex
}
function Glow({ color, size = 9 }) {
  return (
    <sprite position={[0, 0, -2]} scale={[size, size, 1]}>
      <spriteMaterial map={glowTexture()} color={color} transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
    </sprite>
  )
}

/* ───────── Camera rig: scroll → camera Y + scene tint, mouse → parallax ───────── */
const BASE_RGB = [11, 15, 26] // #0B0F1A
const TINT_STRENGTH = 0.15 // share of the accent mixed into the navy, in sRGB (keeps it dark)
const tmpA = new THREE.Color(), tmpTarget = new THREE.Color()
const tintCache = {}

function sectionTint(el, out) {
  const t = (el && el.dataset.tint) || ''
  if (!tintCache[t]) {
    let rgb = BASE_RGB
    if (t) {
      const n = parseInt(t.slice(1), 16)
      const acc = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      rgb = BASE_RGB.map((b, i) => b + (acc[i] - b) * TINT_STRENGTH)
    }
    tintCache[t] = new THREE.Color().setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, THREE.SRGBColorSpace)
  }
  return out.copy(tintCache[t])
}

function Rig({ stops }) {
  const { camera, pointer, scene } = useThree()
  useFrame((_, d) => {
    // Find which [data-stop] section we're in and how far through it.
    const els = document.querySelectorAll('[data-stop]')
    const y = window.scrollY
    let idx = 0
    for (let i = 0; i < els.length; i++) {
      const top = els[i].offsetTop
      const next = els[i + 1] ? els[i + 1].offsetTop : top + els[i].offsetHeight
      if (y >= top) idx = i + Math.min(1, (y - top) / Math.max(1, next - top))
    }
    idx = Math.min(idx, stops - 1)
    const targetY = -idx * SPACING
    const k = reduced ? 1 : 1 - Math.pow(0.0015, d) // frame-rate-independent damping
    camera.position.y += (targetY - camera.position.y) * k
    if (!isMobile && !reduced) {
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * k
    }
    camera.lookAt(camera.position.x * 0.5, camera.position.y, 0)

    // Background + fog blend between the current and next section's tint.
    // Centre the blend on each section so the colour is fully reached mid-section.
    const f = Math.max(0, idx - 0.5)
    const i0 = Math.floor(f), frac = f - i0
    sectionTint(els[i0], tmpA)
    sectionTint(els[Math.min(i0 + 1, els.length - 1)], tmpTarget)
    tmpA.lerp(tmpTarget, idx < 0.5 ? 0 : frac)
    if (scene.background) reduced ? scene.background.copy(tmpA) : scene.background.lerp(tmpA, Math.min(1, k * 1.5))
    if (scene.fog) scene.fog.color.copy(scene.background)
  })
  return null
}

const SCENES = { spices: Spices, bakery: Bakery, gym: Gym, watch: Watch }

export default function Scene({ items, firstStop = 1, stops, skillsOrbit }) {
  // The 3D object is now an accent behind the device mockup.
  const objX = isMobile ? 1.9 : 5.2
  const objY = isMobile ? 2.6 : 1.9
  const objZ = isMobile ? -3 : -3.5
  return (
    <Canvas
      className="!fixed inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 8], fov: isMobile ? 60 : 45 }}
      gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0B0F1A']} />
      <fog attach="fog" args={['#0B0F1A', 10, 30]} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#9fb4ff', '#1a1208', 0.6]} />
      <directionalLight position={[5, 8, 6]} intensity={1.6} color="#ffe2b0" />
      <pointLight position={[-6, -SPACING * 2, 4]} intensity={30} color="#7DE3F4" />
      <pointLight position={[-4, -SPACING * 3, 3]} intensity={25} color="#FF6A2B" />
      <Stars radius={60} depth={40} count={isMobile ? 1200 : 3000} factor={3} fade speed={reduced ? 0 : 0.5} />
      <Rig stops={stops ?? items.length + 2} />

      <Mountains />
      {skillsOrbit && (
        <group position={isMobile ? [0, 2.5 - SPACING, -3] : isNarrow ? [0, 1.7 - SPACING, -3] : [2.9, -SPACING, -1]} scale={1}>
          <SkillsOrbit rings={skillsOrbit} />
        </group>
      )}
      {items.map((it, i) => {
        const Obj = SCENES[it.scene]
        return (
          <group key={it.id} position={[objX, objY - (i + firstStop) * SPACING, objZ]} scale={isMobile ? 0.6 : 0.85}>
            <Glow color={it.accent} size={isMobile ? 6 : 7.5} />
            <pointLight position={[0, 2, 3]} intensity={12} color={it.accent} distance={8} />
            <Obj />
          </group>
        )
      })}
    </Canvas>
  )
}
