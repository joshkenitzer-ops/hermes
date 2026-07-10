// Placeholder: runs three-tier verification
export async function runThreeTierReview(tailoredResume, onTierComplete) {
  // TODO: wire to Claude API for each tier

  // Critical pass
  await new Promise(r => setTimeout(r, 800));
  onTierComplete(0, [
    {
      severity: "High",
      title: "Unverified metric",
      detail: "One metric appears without sufficient context to be defensible in a 20-minute interview.",
      fix: "Add the source or qualifying context for this figure.",
    }
  ], null);

  // Pedantic pass
  await new Promise(r => setTimeout(r, 800));
  onTierComplete(1, [
    {
      severity: "Low",
      title: "Passive construction",
      detail: "'Was recognized by leadership' is passive and weak.",
      fix: "Rewrite as active: 'Leadership recognized the approach and adopted it across the team.'",
    }
  ], null);

  // Team Lead pass
  await new Promise(r => setTimeout(r, 1000));
  onTierComplete(2, [], "This document is ready to submit. Voice is consistent throughout. The research arc is clear and the metrics are specific. One High finding on the unverified metric should be addressed before sending. No em dashes. No AI slop detected.");
}
