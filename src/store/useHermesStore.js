import { useState } from "react";

// Simple in-memory store using React state lifted to module level via a custom hook.
// No localStorage - all state lives in memory for this session.

let _state = {
  phase: 0,
  entryMode: null,         // "upload" | "paste" | "scratch"
  rawInput: null,          // raw text extracted from entry
  careerInventory: null,   // organized career data from Phase 0
  auditFindings: [],       // findings from Phase 1
  masterResume: null,      // built master resume text
  tailoredResume: null,    // tailored version text
  reviewFindings: [],      // three-tier review findings
  jdText: null,            // job description text
};

const listeners = new Set();

function getState() { return _state; }
function setState(updates) {
  _state = { ..._state, ...updates };
  listeners.forEach(fn => fn(_state));
}

export default function useHermesStore() {
  const [, forceRender] = useState(0);

  // Subscribe this component to state changes
  if (!listeners.has(forceRender)) {
    listeners.add(forceRender.bind(null, n => n + 1));
  }

  return {
    ..._state,
    setPhase: (phase) => setState({ phase }),
    setEntryMode: (entryMode) => setState({ entryMode }),
    setRawInput: (rawInput) => setState({ rawInput }),
    setCareerInventory: (careerInventory) => setState({ careerInventory }),
    setAuditFindings: (auditFindings) => setState({ auditFindings }),
    setMasterResume: (masterResume) => setState({ masterResume }),
    setTailoredResume: (tailoredResume) => setState({ tailoredResume }),
    setReviewFindings: (reviewFindings) => setState({ reviewFindings }),
    setJdText: (jdText) => setState({ jdText }),
  };
}
