import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Mujer",
    desc: "Fragancias femeninas, sofisticadas",
    route: "/femenino",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Hombre",
    desc: "Aromas potentes y elegantes",
    route: "/masculino",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=60",
  },
{
    title: "Nicho",
    desc: "Fragancias exclusivas y únicas",
    route: "/nicho",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=60",
  },
];

export default function Collections() {
  const navigate = useNavigate();

  return (
    <section id="colecciones" className="py-5">
      <div className="container">
        <h2 className="text-center text-white mb-4">Colecciones</h2>

        <div className="row g-4">
          {categories.map((c, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="p-4 card-aura rounded-3 fade-up h-100">
                <div
                  className="mb-3"
                  style={{
                    height: 180,
                    borderRadius: 12,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${c.image})`,
                  }}
                ></div>

                <h5 className="text-white">{c.title}</h5>
                <p className="text-light">{c.desc}</p>

                <button
                  className="btn btn-aura"
                  onClick={() => navigate(c.route)}
                >
                  Ver catálogo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
