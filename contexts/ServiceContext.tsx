import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";

type ServiceContextType = {
  service: boolean;
  setService: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServiceContext = createContext<ServiceContextType>({
  service: false,
  setService: () => {},
});

export const useServiceContext = () => useContext(ServiceContext);

export function ServiceProvider({ children }: any) {
  const [service, setService] = useLocalStorage<boolean>({
    key: "service",
    defaultValue: false,
  });
  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
}
