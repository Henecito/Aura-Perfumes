import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function NavbarAURA({ shown }) {
  const { carrito } = useCarrito();
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav
      className={`navbar fixed-top navbar-expand-md navbar-dark navbar-glass ${
        shown ? "nav-shown" : "nav-hidden"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          AURA
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navLinks"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navLinks">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/masculino">
                Masculino
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/femenino">
                Femenino
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/nicho">
                Nicho
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn position-relative text-white"
                data-bs-toggle="offcanvas"
                data-bs-target="#carritoCanvas"
              >
                <i className="bi bi-cart3 fs-4"></i>

                {totalUnidades > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalUnidades}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
