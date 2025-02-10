"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface BuildContextType {
  buildItems: Record<string, string>; // Changed to store category -> productId pairs
  addToBuild: (category: string, productId: string) => void;
  removeFromBuild: (category: string) => void;
  getBuildItem: (category: string) => string | undefined;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [buildItems, setBuildItems] = useState<Record<string, string>>({});

  const addToBuild = (category: string, productId: string) => {
    setBuildItems(prev => ({
      ...prev,
      [category]: productId
    }));
  };

  const removeFromBuild = (category: string) => {
    setBuildItems(prev => {
      const newItems = { ...prev };
      delete newItems[category];
      return newItems;
    });
  };

  const getBuildItem = (category: string) => {
    return buildItems[category];
  };

  return (
    <BuildContext.Provider value={{ buildItems, addToBuild, removeFromBuild, getBuildItem }}>
      {children}
    </BuildContext.Provider>
  );
}

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
};
