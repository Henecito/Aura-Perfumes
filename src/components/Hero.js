import React from 'react';

export default function Hero(){
return (
<header className="vh-100 d-flex align-items-center justify-content-center hero-smoke text-center px-3" style={{position:'relative', overflow:'hidden'}}>
{/* Aura central - estilo imagen */}
<div style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '800px',
  background: 'radial-gradient(ellipse at center, rgba(0, 200, 255, 0.4) 0%, rgba(0, 150, 200, 0.3) 15%, rgba(0, 100, 150, 0.2) 30%, rgba(0, 80, 120, 0.1) 50%, transparent 70%)',
  filter: 'blur(100px)',
  zIndex: 0,
  pointerEvents: 'none',
  animation: 'pulse 8s ease-in-out infinite'
}}></div>

{/* Rayo superior */}
<div style={{
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '300px',
  height: '50%',
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.3) 40%, rgba(0, 150, 200, 0.2) 70%, transparent 100%)',
  filter: 'blur(50px)',
  zIndex: 0,
  pointerEvents: 'none'
}}></div>

{/* Rayo inferior */}
<div style={{
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '250px',
  height: '45%',
  background: 'linear-gradient(0deg, transparent 0%, rgba(0, 200, 255, 0.25) 40%, rgba(0, 150, 200, 0.15) 70%, transparent 100%)',
  filter: 'blur(45px)',
  zIndex: 0,
  pointerEvents: 'none'
}}></div>

{/* Rayo diagonal izquierda */}
<div style={{
  position: 'absolute',
  top: '50%',
  left: '10%',
  transform: 'translateY(-50%) rotate(-30deg)',
  width: '200px',
  height: '60%',
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.2) 50%, transparent 100%)',
  filter: 'blur(40px)',
  zIndex: 0,
  pointerEvents: 'none'
}}></div>

{/* Rayo diagonal derecha */}
<div style={{
  position: 'absolute',
  top: '50%',
  right: '10%',
  transform: 'translateY(-50%) rotate(30deg)',
  width: '200px',
  height: '60%',
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 200, 255, 0.2) 50%, transparent 100%)',
  filter: 'blur(40px)',
  zIndex: 0,
  pointerEvents: 'none'
}}></div>

{/* Partículas flotantes */}
{[...Array(20)].map((_, i) => (
  <div key={i} style={{
    position: 'absolute',
    width: Math.random() * 4 + 2 + 'px',
    height: Math.random() * 4 + 2 + 'px',
    background: 'rgba(0, 200, 255, 0.6)',
    borderRadius: '50%',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    filter: 'blur(1px)',
    boxShadow: '0 0 10px rgba(0, 200, 255, 0.8)',
    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 5}s`,
    zIndex: 0,
    pointerEvents: 'none'
  }}></div>
))}

<style>{`
  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
    50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
    75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
  }
`}</style>

<div className="container" style={{position:'relative', zIndex:1}}>
<h1 className="display-1 fw-bold" style={{letterSpacing:'0.12em'}}>AURA</h1>
<p className="lead text-white-50 mb-4">Aromas que cuentan tu historia</p>
<div className="d-flex justify-content-center gap-3">
<a href="#colecciones" className="btn btn-aura btn-lg">Explorar colecciones</a>
<a href="#destacados" className="btn btn-outline-light btn-lg">Ver destacados</a>
</div>
</div>
</header>
)
}