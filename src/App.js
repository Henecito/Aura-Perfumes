import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavbarAURA from "./components/NavbarAURA";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Featured from "./components/Featured";
import FooterAURA from "./components/FooterAURA";
import CarritoAURA from "./components/CarritoAURA";

import CatalogoMasculino from "./pages/CatalogoMasculino";
import CatalogoFemenino from "./pages/CatalogoFemenino";
import CatalogoNicho from "./pages/CatalogoNicho";

import ScrollToTop from "./ScrollToTop";

function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Featured />
    </>
  );
}

export default function App() {
  const [navShown, setNavShown] = useState(false);
  const location = useLocation();

  // Efecto de scroll siempre activo
  useEffect(() => {
    const onScroll = () => setNavShown(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollToTop />

      {/* Navbar: en Home depende del scroll, en otras rutas siempre visible */}
      <NavbarAURA shown={location.pathname === "/" ? navShown : true} />

      <CarritoAURA />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masculino" element={<CatalogoMasculino />} />
          <Route path="/femenino" element={<CatalogoFemenino />} />
          <Route path="/nicho" element={<CatalogoNicho />} />
          {/* Fallback: cualquier ruta desconocida muestra Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <FooterAURA />
    </>
  );
}
