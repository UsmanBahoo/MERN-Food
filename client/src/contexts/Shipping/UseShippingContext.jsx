import { useContext } from "react";
import { ShippingContext } from "./ShippingContext";

function useShippingContext() {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShippingContext must be used within a ShippingProvider");
  }
  return context;
}

export default useShippingContext;