import { createContext, useEffect, useState } from "react";

export const ShippingContext = createContext();

function ShippingProvider({ children }) {
  const [address, setAddress] = useState(() => getAddress());
  const [haveAddress, setHaveAddress] = useState(!!address);

  async function saveAddress(address) {
    localStorage.setItem("FPSHIPUS", JSON.stringify(address));
    setAddress(address);
    setHaveAddress(true);
  }

  function clearAddress() {
    localStorage.removeItem("FPSHIPUS");
    setAddress(null);
    setHaveAddress(false);
  }

  function getAddress() {
    const address = localStorage.getItem("FPSHIPUS");
    return address ? JSON.parse(address) : null;
  }

  useEffect(() => {
    const address = getAddress();
    if (address) {
      setAddress(address);
      setHaveAddress(true);
    }
  }, []);

  return (
    <ShippingContext.Provider value={{ address, saveAddress, clearAddress, haveAddress }}>
      {children}
    </ShippingContext.Provider>
  );
}

export default ShippingProvider;


