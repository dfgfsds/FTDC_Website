import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of context
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

// Create context with undefined default to force use inside provider
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Props type for the provider
interface SidebarProviderProps {
  children: ReactNode;
}

// Sidebar Provider
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to use context
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
