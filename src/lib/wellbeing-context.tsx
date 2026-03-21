"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type WellbeingState = {
  battery: number; // 0 - 1000
  w: number;       // 0 - 1.0 (battery / 1000)
};

type WellbeingContextType = {
  wellbeing: WellbeingState;
  setBattery: (value: number) => void;
};

const WellbeingContext = createContext<WellbeingContextType | undefined>(undefined);

export function WellbeingProvider({ children }: { children: React.ReactNode }) {
  const [battery, setBatteryState] = useState(700);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("iov-wellbeing-battery");
    if (saved) {
      setBatteryState(Number(saved));
    }
  }, []);

  const setBattery = (value: number) => {
    const clamped = Math.max(0, Math.min(1000, value));
    setBatteryState(clamped);
    localStorage.setItem("iov-wellbeing-battery", String(clamped));
  };

  const wellbeing = {
    battery,
    w: battery / 1000,
  };

  return (
    <WellbeingContext.Provider value={{ wellbeing, setBattery }}>
      {children}
    </WellbeingContext.Provider>
  );
}

export function useWellbeing() {
  const context = useContext(WellbeingContext);
  if (context === undefined) {
    throw new Error("useWellbeing must be used within a WellbeingProvider");
  }
  return context;
}
