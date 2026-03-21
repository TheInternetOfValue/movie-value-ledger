"use client";

import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import IndividualLedger from "@/components/individual-ledger";

export default function IndividualPage() {
  return (
    <main className="dossier-bg min-h-screen text-white pb-32">
      <NavigationBar currentPage="individual" />
      
      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        <IndividualLedger />
      </div>

      <Footer />
    </main>
  );
}
