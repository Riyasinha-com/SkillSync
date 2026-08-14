import { useEffect, useRef } from 'react'

/**
 * Fixed, full-viewport atmosphere layer: a deep radial void, two slow
 * nebula blooms (violet + lavender), and a lightweight canvas starfield
 * with a handful of stars that gently twinkle. Sits behind all page
 * content at z-0; pages only need to render their own foreground.
 *
 * Kept intentionally quiet — this is atmosphere, not the signature
 * moment, so motion is slow and opacity is low throughout.
 */
export function CelestialBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: { x: number; y: number; r: number; phase: number; speed: number }[] = []

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    function resize() {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx!.scale(dpr, dpr)

      const count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
      }))
    }

    function draw(t: number) {
      const canvas = canvasRef.current
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const s of stars) {
        const twinkle = prefersReducedMotion
          ? 0.6
          : 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(231, 229, 240, ${0.15 + twinkle * 0.5})`
        ctx.fill()
      }
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw(0)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, #1c1638 0%, #0b0f10 60%, #0b0f10 100%)',
        }}
      />
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-container/50 rounded-full glow-bloom opacity-40" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-secondary-container/50 rounded-full glow-bloom opacity-30" />
      <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-tertiary-container/40 rounded-full glow-bloom opacity-[0.15]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
