// Placeholder: tailors master resume to a job description
export async function tailorResume(masterResume, jdText) {
  // TODO: wire to Claude API
  await new Promise(r => setTimeout(r, 1500));
  return `[Tailored version of master resume]\n\nJob description keywords extracted and mirrored. Strongest matching experience leads. Summary rewritten for this role.\n\n${masterResume}`;
}

// Re-export slop check for consistency
export async function checkSlop(text) {
  const { checkSlop: check } = await import("./buildService.js");
  return check(text);
}
