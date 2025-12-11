import React from 'react';


export default function Hero(){
return (
<header className="vh-100 d-flex align-items-center justify-content-center hero-smoke text-center px-3" style={{position:'relative'}}>
<div className="container">
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