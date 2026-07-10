// Placeholder: generates and downloads the resume as a docx file
// TODO: wire to a server-side docx generation endpoint or use a client-side library
export async function generateDocx(resumeText) {
  await new Promise(r => setTimeout(r, 600));

  // For now, download as a plain text file to prove the flow works.
  // Replace this with real docx generation in V1 build.
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "-");
  const filename = `Resume_Master_${date}.txt`;
  const blob = new Blob([resumeText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
