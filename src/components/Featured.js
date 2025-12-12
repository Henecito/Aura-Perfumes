import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useCarrito } from "../context/CarritoContext";

const IMG_GENERIC =
  "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=60";

export default function Featured() {
  const { agregarAlCarrito } = useCarrito();
  const [items, setItems] = useState([]);

  // Definir categorías directamente desde el código
  const tablas = [
    { nombre: "fragancias", categoria: "Hombre" },
    { nombre: "fraganciasf", categoria: "Mujer" },
    { nombre: "nicho", categoria: "Nicho" },
  ];

  const registrarVisita = async (tabla, numero, visitasActuales) => {
    await supabase
      .from(tabla)
      .update({ visitas: visitasActuales + 1 })
      .eq("numero", numero);
  };

  useEffect(() => {
    async function cargarDestacados() {
      let todas = [];

      for (const t of tablas) {
        const { data, error } = await supabase
          .from(t.nombre)
          .select("numero, nombre, marca, visitas, url_fragrantica");

        if (error || !data) continue;

        const normalizadas = data.map((f) => ({
          tabla: t.nombre,
          categoria: t.categoria, // <-- categoría generada
          numero: f.numero,
          nombre: f.nombre,
          marca: f.marca,
          visitas: f.visitas || 0,
          url: f.url_fragrantica || null,
          imagen: f.imagen || IMG_GENERIC,
        }));

        todas = [...todas, ...normalizadas];
      }

      const top = todas.sort((a, b) => b.visitas - a.visitas).slice(0, 6);
      setItems(top);
    }

    cargarDestacados();
  }, []);

  // Función para definir color del badge
  const badgeStyle = (categoria) => {
    switch (categoria) {
      case "Hombre":
        return {
          background: "rgba(80,150,255,0.3)",
          color: "#bcd8ff",
          border: "1px solid rgba(80,150,255,0.4)",
        };
      case "Mujer":
        return {
          background: "rgba(255,120,150,0.3)",
          color: "#ffc7d4",
          border: "1px solid rgba(255,120,150,0.4)",
        };
      case "Nicho":
        return {
          background: "rgba(255,215,100,0.25)",
          color: "#ffe9a8",
          border: "1px solid rgba(255,215,100,0.35)",
        };
      default:
        return { background: "rgba(255,255,255,0.2)", color: "#fff" };
    }
  };

  return (
    <section id="destacados" className="py-5">
      <div className="container">
        <h2 className="text-center text-white mb-4">Fragancias Destacadas</h2>

        <div className="row g-4">
          {items.map((p) => (
            <div
              key={`${p.tabla}-${p.numero}`}
              className="col-12 col-md-6 col-lg-4"
            >
              <div className="p-4 card-aura rounded-3 fade-up h-100 d-flex flex-column position-relative">
                {/* Número */}
                {/* CÍRCULO NÚMERO */}
                <div
                  className="numero-circulo"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 40,
                    height: 40,
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {p.numero}
                </div>

                {/* Imagen */}
                <div
                  style={{
                    height: 180,
                    borderRadius: 12,
                    backgroundImage: `url(${p.imagen})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: 15,
                  }}
                ></div>

                {/* Badge categoría */}
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                    marginBottom: 10,
                    ...badgeStyle(p.categoria),
                  }}
                >
                  {p.categoria}
                </span>

                {/* Info */}
                <h5 className="text-white">{p.nombre}</h5>

                <p className="text-light opacity-75 mb-2">
                  {p.marca}
                  <br />
                  Visitas: {p.visitas}
                </p>

                {/* Botones */}
                <div className="mt-auto d-grid gap-2">
                  {p.url && (
                    <button
                      className="btn btn-outline-light"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        // Abrir pestaña inmediatamente
                        const win = window.open(
                          p.url,
                          "_blank",
                          "noopener,noreferrer"
                        );

                        // Fallback para Safari si bloquea
                        if (!win) {
                          const a = document.createElement("a");
                          a.href = p.url;
                          a.target = "_blank";
                          a.rel = "noopener noreferrer";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }

                        // Registrar visita en background SIN await
                        registrarVisita(p.tabla, p.numero, p.visitas);
                      }}
                    >
                      Ver detalles
                    </button>
                  )}

                  <button
                    className="btn btn-aura text-dark fw-bold"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
