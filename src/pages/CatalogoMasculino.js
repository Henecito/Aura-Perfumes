import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useCarrito } from "../context/CarritoContext";
import "./catalogo.css";

export default function Catalogo() {
  const { agregarAlCarrito } = useCarrito();
  const [fragancias, setFragancias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agregando, setAgregando] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Ajustar tamaños según ancho de pantalla
  const getSizes = () => {
    if (windowWidth < 576) {
      return {
        cardHeight: 200,
        titleSize: "1rem",
        priceSize: "0.9rem",
        circleSize: 28,
        circleFont: 12,
        padding: 12,
        btnFont: "0.8rem",
        btnPadding: "5px 8px",
      };
    } else if (windowWidth < 768) {
      return {
        cardHeight: 220,
        titleSize: "1.1rem",
        priceSize: "1rem",
        circleSize: 32,
        circleFont: 14,
        padding: 15,
        btnFont: "0.85rem",
        btnPadding: "6px 10px",
      };
    } else {
      return {
        cardHeight: 260,
        titleSize: "1.3rem",
        priceSize: "1.1rem",
        circleSize: 38,
        circleFont: 16,
        padding: 20,
        btnFont: "1rem",
        btnPadding: "8px 12px",
      };
    }
  };

  const sizes = getSizes();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SUMAR VISITA
  const registrarVisita = async (numeroFragancia, visitasActuales) => {
    await supabase
      .from("fragancias")
      .update({ visitas: visitasActuales + 1 })
      .eq("numero", numeroFragancia);
  };

  useEffect(() => {
    async function fetchFragancias() {
      setLoading(true);
      const { data, error } = await supabase
        .from("fragancias")
        .select("*")
        .order("numero", { ascending: true });
      if (error) console.error("Error cargando fragancias:", error);
      else setFragancias(data);
      setLoading(false);
    }
    fetchFragancias();
  }, []);

  const handleAgregar = (f) => {
    setAgregando(f.numero);
    agregarAlCarrito({
      id: `fragancias-${f.numero}`,
      tabla: "fragancias",
      numero: f.numero,
      nombre: f.nombre,
      tipo: "Hombre",
      cantidad: 1,
    });
    setTimeout(() => setAgregando(null), 1000);
  };

  const handleVerDetalles = (f, e) => {
    e.preventDefault(); // Prevenir acción predeterminada (abrir enlace en la misma pestaña)
    e.stopPropagation(); // Evitar que el evento se propague a otros elementos

    // Abrir la nueva ventana en segundo plano
    const nuevaVentana = window.open(
      f.url_fragrantica,
      "_blank",
      "noopener,noreferrer"
    );

    // Si la nueva ventana no se abre (por ejemplo, por bloqueadores de ventanas emergentes), usar fallback
    if (!nuevaVentana) {
      window.location.href = f.url_fragrantica;
    }

    // Registrar visita en segundo plano
    registrarVisita(f.numero, f.visitas || 0);
  };

  return (
    <section className="container py-5 mt-5">
      <h2 className="text-center text-white mb-4">Catálogo</h2>

      {/* NOTA IMPORTANTE SUAVE */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderLeft: "4px solid #ffc107",
          padding: "10px 15px",
          borderRadius: "6px",
          marginBottom: "20px",
          color: "#f8f9fa",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Nota importante: NUESTRA MARCA NO ESTÁ ASOCIADA A NINGUNA CASA DE
        PERFUMES INTERNACIONAL. UTILIZAMOS LOS NOMBRES DE LAS FRAGANCIAS SOLO
        PARA INDICAR LA TENDENCIA OLFATIVA.
      </div>

      {loading && <p className="text-center text-light">Cargando...</p>}

      <div className="row">
        {fragancias.map((f) => (
          <div className="col-6 col-sm-6 col-md-3 mb-4" key={f.numero}>
            <div
              className="flip-card"
              onClick={(e) => e.stopPropagation()}
              style={{ height: sizes.cardHeight }}
            >
              <div
                className="flip-card-inner"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flip-card-front"
                  style={{ padding: sizes.padding }}
                >
                  <div
                    className="circulo-numero"
                    style={{
                      width: sizes.circleSize,
                      height: sizes.circleSize,
                      fontSize: sizes.circleFont,
                    }}
                  >
                    {f.numero}
                  </div>

                  {f.imagen && (
                    <div
                      style={{
                        width: "100%",
                        height: sizes.cardHeight - 100,
                        backgroundImage: `url(${f.imagen})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                    ></div>
                  )}

                  <h5
                    className="title text-center"
                    style={{ fontSize: sizes.titleSize }}
                  >
                    {f.nombre}
                  </h5>
                  <p className="text-light">{f.marca}</p>
                  {f.precio && (
                    <p className="price" style={{ fontSize: sizes.priceSize }}>
                      ${f.precio}
                    </p>
                  )}
                </div>

                <div
                  className="flip-card-back"
                  style={{ padding: sizes.padding }}
                >
                  <p
                    className="text-light mb-3 text-center"
                    style={{ fontSize: sizes.priceSize }}
                  >
                    Visitas: {f.visitas || 0}
                    <br />
                    Tipo: {f.tipo_fragancia}
                  </p>

                  {f.url_fragrantica && (
                    <button
                      className="btn btn-outline-light btn-accion mb-2"
                      style={{
                        fontSize: sizes.btnFont,
                        padding: sizes.btnPadding,
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={(e) => handleVerDetalles(f, e)}
                    >
                      Ver detalles
                    </button>
                  )}

                  <button
                    className="btn btn-light btn-accion text-dark fw-bold d-flex align-items-center justify-content-center"
                    style={{
                      fontSize: sizes.btnFont,
                      padding: sizes.btnPadding,
                    }}
                    onClick={() => handleAgregar(f)}
                    disabled={agregando === f.numero}
                  >
                    {agregando === f.numero && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                    )}
                    {agregando === f.numero ? "Agregado" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
