import { useState } from "react";
import LoreHeader from "./components/shared/LoreHeader";
import Phase0Entry from "./components/phases/Phase0Entry";
import Phase1Audit from "./components/phases/Phase1Audit";
import Phase2MasterBuild from "./components/phases/Phase2MasterBuild";
import Phase5Tailoring from "./components/phases/Phase5Tailoring";
import Phase6Review from "./components/phases/Phase6Review";
import useHermesStore from "./store/useHermesStore";

const PHASES = [0, 1, 2, 5, 6];

export default function App() {
  const { phase, setPhase } = useHermesStore();

  function advance() {
    const idx = PHASES.indexOf(phase);
    if (idx < PHASES.length - 1) setPhase(PHASES[idx + 1]);
  }

  function retreat() {
    const idx = PHASES.indexOf(phase);
    if (idx > 0) setPhase(PHASES[idx - 1]);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      <LoreHeader currentPhase={phase} />
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px" }}>
        {phase === 0 && <Phase0Entry onComplete={advance} />}
        {phase === 1 && <Phase1Audit onComplete={advance} onBack={retreat} />}
        {phase === 2 && <Phase2MasterBuild onComplete={advance} onBack={retreat} />}
        {phase === 5 && <Phase5Tailoring onComplete={advance} onBack={retreat} />}
        {phase === 6 && <Phase6Review onBack={retreat} />}
      </main>
    </div>
  );
}
