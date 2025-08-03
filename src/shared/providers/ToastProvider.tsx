import { createContext, useContext, useEffect, ReactNode } from "react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

interface ToastContextType {
  showToast: (options: UseToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useToast();

  // Lógica para manejar toast desde localStorage (extraída de App.tsx y RootLayout.tsx)
  useEffect(() => {
    const toastData = localStorage.getItem("toast");

    if (toastData) {
      const { title, description, status, duration, isClosable } =
        JSON.parse(toastData);

      toast({
        position: "top",
        title,
        description,
        status,
        duration,
        isClosable,
      });

      localStorage.removeItem("toast");
    }
  }, [toast]);

  const showToast = (options: UseToastOptions) => {
    toast({
      position: "top",
      duration: 3000,
      isClosable: true,
      ...options,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
