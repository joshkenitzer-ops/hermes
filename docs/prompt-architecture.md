[prompt-architecture.md](https://github.com/user-attachments/files/29301316/prompt-architecture.md)
# Prompt Architecture

Hermes produces tailored documents from a single authoritative source. The prompt architecture is what makes that possible without sacrificing accuracy, voice, or verifiability.

A tailored resume and cover letter package that previously took hours to write from scratch now takes minutes to produce. What remains for the human is review: evaluating the output for accuracy, catching any discrepancies against the master document, and flagging anything the verification pass missed. The writing is done; the judgment still belongs to the human.

---

## The master document

Everything starts with the master resume, a single, fully-cited, version-controlled source of truth. Every metric, date, and claim in every generated document traces back to it.

The master document is not a template. It is ground truth. Generated documents are derived from it. When a generated document conflicts with the master, the generated document is wrong.

This distinction matters because AI generation introduces drift. Figures get approximated. Framing migrates. The master document is the anchor that prevents that drift from compounding across packages.

The pipeline also runs in reverse. When a job description surfaces a credential, experience, or framing that belongs in the master but isn't there yet, the master gets updated before the tailored package ships. The master document grows with every application cycle; it doesn't get left behind by it.

---

## Role tailoring

Each generated package is built from a role-specific prompt that does three things:

**1. Selects the relevant signal.** Not every credential is relevant to every role. The prompt identifies which experience, metrics, and framing serve this specific application, instructing the model to weight accordingly.

**2. Adapts the framing.** The same work means different things to different audiences. A curriculum pipeline that shipped 11 courses against a forecast of 4 is an execution story for an operations role and a systems-thinking story for a design role. Same underlying fact, different emphasis.

**3. Preserves verifiable specifics.** Tailoring is not license to invent. Every figure in the output must exist in the master document. The prompt enforces this explicitly.

---

## Cover letter architecture

Cover letters operate under a separate constraint: they must do work the resume cannot.

A cover letter that restates resume evidence has already failed. Hiring managers have the resume; restating it in paragraph form wastes the one place in the package where judgment and voice can do work the bullet format cannot. The prompt architecture for cover letters instructs the model to:

It should connect the candidate's experience to the specific company's context, surface judgment calls and decisions that don't fit in a bullet, and answer the unstated objection the hiring manager is likely carrying into the room.

The resume carries the evidence. The cover letter makes the case for why it matters to this employer, for this role.

---

## Banned patterns

The following are prohibited across all Hermes outputs and enforced at the prompt level:

**Structural:** Em dashes, parallel fragment triplets, parallel pair endings (X is Y. Z is not.), triplet formula closings.

**Lexical:** "seamlessly," "leverage," "throughline," "convergence point," "AI-era," "at the moment of need."

**Conceptual:** Any framing that cannot be defended against direct challenge. Any stat that does not exist in the master document.

These are not style preferences. They are failure modes: structural tells that signal the document was generated rather than written.

---

## The verification pass

Every output goes through the three-tier adversarial verification workflow before it is considered complete. The prompt is designed to anticipate what the verifier will check; generation and verification are one system, not two sequential steps.

See [verification-workflow.md](./verification-workflow.md) for the full standard.

---

## What this produces

The goal is not a finished document that ships without review. The goal is a tailored resume and cover letter package that arrives in near-final condition, where the human's job is evaluation and spot-check rather than drafting. Hermes handles the generation and the verification; what remains is judgment: confirming the output accurately represents the candidate and is the right fit for the role.

---

*Part of [Hermes](https://github.com/joshkenitzer-ops/hermes) · [Lore](https://github.com/joshkenitzer-ops/lore)*
