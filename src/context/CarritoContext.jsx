import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carritoAURA");
    return saved ? JSON.parse(saved) : [];
  });

  // guardar automáticamente
  useEffect(() => {
    localStorage.setItem("carritoAURA", JSON.stringify(carrito));
  }, [carrito]);

  // agregar CON identificador basado en tabla+numero
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarProducto(id) {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  }

  function limpiarCarrito() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarProducto, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
