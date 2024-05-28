import { createContext, useContext, useState } from "react";

type CityContextType = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

export const CityContext = createContext<CityContextType>({
  city: "Itapetininga",
  setCity: () => {},
});

export const useCityContext = () => useContext(CityContext);

export function CityProvider({ children }: any) {
  const [city, setCity] = useState("Itapetininga");
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}
