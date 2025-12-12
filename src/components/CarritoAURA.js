import React from "react";
import { createPortal } from "react-dom";
import { useCarrito } from "../context/CarritoContext";

export default function CarritoAURA() {
  const { carrito, eliminarProducto, limpiarCarrito } = useCarrito();

  function enviarWhatsApp() {
    const numero = "56933365599";

    const mensaje = carrito
      .map(
        (item, i) =>
          `${i + 1}. (${item.tipo}) ${item.nombre} - Nº ${item.numero} (${item.cantidad}x)`
      )
      .join("%0A");

    window.open(
      `https://wa.me/${numero}?text=Hola quiero comprar:%0A%0A${mensaje}`,
      "_blank"
    );
  }

  return createPortal(
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      id="carritoCanvas"
      style={{ paddingTop: "70px", zIndex: 1055 }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Carrito</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column" style={{ paddingBottom: 0 }}>
        <div
          className="flex-grow-1 overflow-auto px-1"
          style={{ maxHeight: "70vh" }}
        >
          {carrito.length === 0 ? (
            <p className="text-white-50">Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={limpiarCarrito}
                >
                  <i className="bi bi-trash3"></i> Vaciar carrito
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div>
                      <strong>{item.nombre}</strong>
                      <br />
                      <span className="text-white-50">
                        {item.tipo} • Nº {item.numero} • {item.cantidad}x
                      </span>
                    </div>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {carrito.length > 0 && (
          <div className="mt-3 pb-3">
            <button
              onClick={enviarWhatsApp}
              className="btn btn-success w-100"
            >
              Finalizar compra por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("offcanvas-root")
  );
}