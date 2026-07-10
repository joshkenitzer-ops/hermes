// Placeholder: runs adversarial resume audit
export async function runAudit(careerInventory) {
  // TODO: wire to Claude API
  await new Promise(r => setTimeout(r, 1200));
  return [
    {
      severity: "High",
      title: "Missing quantified accomplishments",
      detail: "Several roles list responsibilities without measurable outcomes. Numbers and scope indicators are absent.",
      fix: "Add specific metrics: headcount, budget, timeline, percentage improvement, or volume handled.",
    },
    {
      severity: "Medium",
      title: "AI slop detected: 'leveraged'",
      detail: "The word 'leveraged' appears three times. It is a known AI-generated term that trained readers flag immediately.",
      fix: "Replace with the specific action: used, applied, built on, or drew from.",
    },
    {
      severity: "Low",
      title: "Internal project names present",
      detail: "One or more project names may not be recognizable to readers outside the organization.",
      fix: "Add plain descriptors in the format: Plain Descriptor (Internal Name).",
    },
  ];
}
