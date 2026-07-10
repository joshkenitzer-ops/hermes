// Placeholder: extracts text from uploaded file
export async function extractFromFile(file) {
  // TODO: wire to Claude API with document input
  return `[Extracted content from ${file.name}]`;
}

// Placeholder: organizes raw text into career inventory by role and time period
export async function extractFromText(text, mode) {
  // TODO: wire to Claude API
  await new Promise(r => setTimeout(r, 800));
  return {
    mode,
    roles: [],
    rawText: text,
    extractedAt: new Date().toISOString(),
  };
}
