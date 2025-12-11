import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useCarrito } from "../context/CarritoContext";
import "./catalogo.css";

export default function CatalogoFemenino() {
  const { agregarAlCarrito } = useCarrito();
  const [fragancias, setFragancias] = useState([]);
  const [loading, setLoading] = useState(true);

  // SUMAR VISITA A fraganciasF
  const registrarVisita = async (numeroFragancia, visitasActuales) => {
    await supabase
      .from("fraganciasf")
      .update({ visitas: visitasActuales + 1 })
      .eq("numero", numeroFragancia);
  };

  useEffect(() => {
    async function fetchFraganciasF() {
      setLoading(true);

      console.log("Consultando tabla fraganciasF...");

      const { data, error } = await supabase
        .from("fraganciasf")
        .select("*")
        .order("numero", { ascending: true });

      console.log("Respuesta Supabase fraganciasF:", { data, error });

      if (error) {
        console.error("ERROR Supabase:", error);
      } else {
        if (!data || data.length === 0) {
          console.warn("Tabla fraganciasF está vacía o RLS bloquea SELECT");
        } else {
          console.log("Fragancias femeninas cargadas:", data);
        }

        setFragancias(data);
      }

      setLoading(false);
    }

    fetchFraganciasF();
  }, []);

  return (
    <section className="container py-5 mt-5">
      <h2 className="text-center text-white mb-4">Catálogo Femenino</h2>

      {loading && <p className="text-center text-light">Cargando...</p>}

      <div className="row">
        {fragancias.map((f) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={f.numero}>
            <div className="flip-card">
              <div className="flip-card-inner">
                {/* Frente */}
                <div className="flip-card-front">
                  <div className="circulo-numero">{f.numero}</div>

                  {f.imagen && (
                    <div
                      style={{
                        width: "100%",
                        height: 160,
                        backgroundImage: `url(${f.imagen})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                    ></div>
                  )}

                  <h5 className="title text-center">{f.nombre}</h5>
                  <p className="text-light">{f.marca}</p>
                  {f.precio && <p className="price">${f.precio}</p>}
                </div>

                {/* Parte trasera */}
                <div className="flip-card-back">
                  <h5 className="mb-2">{f.nombre}</h5>
                  <p className="text-light mb-3 text-center">
                    Marca: {f.marca}
                    <br />
                    Tipo: {f.tipo_fragancia}
                  </p>

                  {/* VER DETALLES CON VISITAS */}
                  {f.url_fragrantica && (
                    <a
                      href={f.url_fragrantica}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light btn-accion mb-2"
                      onClick={async (e) => {
                        e.preventDefault(); // evitamos abrir antes
                        await registrarVisita(f.numero, f.visitas || 0);
                        window.open(f.url_fragrantica, "_blank"); // abrir después
                      }}
                    >
                      Ver detalles
                    </a>
                  )}

                  <button
                    className="btn btn-light btn-accion text-dark fw-bold"
                    onClick={() =>
                      agregarAlCarrito({
                        id: `fraganciasf-${f.numero}`,
                        tabla: "fraganciasf",
                        numero: f.numero,
                        nombre: f.nombre,
                        tipo: "Mujer",
                        cantidad: 1,
                      })
                    }
                  >
                    Agregar al carrito
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
