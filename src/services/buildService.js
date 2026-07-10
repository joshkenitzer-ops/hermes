// Placeholder: builds master resume draft in bold-lead format
export async function buildMaster(careerInventory, auditFindings) {
  // TODO: wire to Claude API
  await new Promise(r => setTimeout(r, 1500));
  return `SUMMARY

One of the few professionals who has both conducted large-scale workforce skills research and built the systems that proved the findings. Nineteen years designing adaptive learning systems, training technical workforces, and leading pedagogy strategy across one of the largest engineering organizations in the world. Co-author of peer-reviewed research on developer skills in the AI era.

---

EXPERIENCE

Pedagogy Lead | [Company] | Remote, NY | 2023 - June 2026

Led pedagogy strategy and instructional standards for next-generation learning ecosystem development. Research and applied learning design for AI-era workforce capability.

Bold lead example: Peer-reviewed publication: Co-authored arXiv research on software developer skills in the AI era, drawing on the largest skills research initiative ever conducted by an L&D function at the organization.`;
}

// Placeholder: checks text for AI slop and formatting issues
export async function checkSlop(text) {
  // TODO: wire to Claude API
  await new Promise(r => setTimeout(r, 400));
  const findings = [];
  const slopTerms = ["seamlessly", "leverage", "leveraged", "utilized", "spearheaded", "effectively"];
  slopTerms.forEach(term => {
    if (text.toLowerCase().includes(term)) {
      findings.push({
        severity: "Medium",
        title: `AI slop: "${term}"`,
        detail: `The word "${term}" is a known AI-generated term that trained readers recognize immediately.`,
        fix: `Replace with the specific action or plain language equivalent.`,
      });
    }
  });
  if (text.includes("--") || text.includes("\u2014")) {
    findings.push({
      severity: "High",
      title: "Em dash detected",
      detail: "Em dashes are prohibited. They are a signature AI writing pattern.",
      fix: "Replace with a period, comma, or colon as the syntax requires.",
    });
  }
  return findings;
}
