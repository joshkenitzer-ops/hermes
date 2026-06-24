[verification-workflow.md](https://github.com/user-attachments/files/29301375/verification-workflow.md)
# The Verification Workflow

Every document Hermes produces goes through a three-tier adversarial review before it ships. The goal is to catch what the generation pass missed: unsupported claims, drifted figures, AI-writing patterns, and missing keywords.

---

## Why adversarial verification exists

AI-generated resumes and cover letters fail in predictable ways. Claims drift from their evidence. Statistics get softened into impressions. Writing patterns emerge that signal automation to anyone paying attention. ATS systems reject documents for reasons that have nothing to do with the candidate's qualifications.

Most of these failures are invisible in the output itself, reading as finished work until someone looks closely enough to find the drift.

Each tier requires a different posture: adversarial for defensibility, obsessive for accuracy, skeptical for pattern detection. Running them as a single pass with a fixed sequence is what makes the workflow reliable.

---

## The three tiers

### Tier 1: Critical

**Posture:** Adversarial. Assume every claim will be challenged.

The Critical pass audits defensibility. Every quantified claim is checked against source documentation. Every framing decision is tested against the evidence that would have to support it in a room where someone was actively trying to disprove it.

The standard is defensibility under direct challenge, not plausibility.

Unsupported framing is cut entirely, not softened or hedged into vagueness.

---

### Tier 2: Pedantic

**Posture:** Obsessive. Every figure is a potential error.

The Pedantic pass cross-checks every specific claim (statistics, dates, metrics, percentages, timeframes) against the master document as the authoritative source of truth.

The master document is ground truth. If the generated document says something different, the generated document is wrong regardless of how reasonable it sounds.

This tier exists because approximation is a form of inaccuracy. "Roughly 50%" and "48%" carry different implications and only one of them is what the source document says.

---

### Tier 3: TL Review

**Posture:** Skeptical reader with a red pen and an ATS scanner.

The TL pass runs three checks in sequence:

**Em-dash sweep.** Em dashes are prohibited. Every instance is replaced with a period, comma, or colon as the syntax requires. This is an absolute rule with no exceptions.

**AI-writing detection.** Three patterns are flagged and removed:
- Parallel sentence fragment triplets ("Built systems. Drove outcomes. Shaped culture.")
- Parallel pair endings ("X is learnable. Y is not.")
- Triplet formula closings (three parallel clauses ending a paragraph or section)

These patterns are the fingerprints of generated text. They read as confident; they signal automation to anyone who has read enough of it, and they get flagged and removed regardless of how well the surrounding prose reads.

**ATS keyword scan.** The document is checked for presence of role-relevant keywords. Missing a keyword the role requires is a structural failure, not a style decision.

---

## Single-pass architecture

All three tiers run in a single generation pass. The document is loaded once, Critical through TL findings are returned in sequence within a single structured output, and the revised artifact is produced at the end. Findings are returned in order: tier, issue, fix. No commentary. No softening. Issue and fix only.

---

## What this produces

This is the minimum bar. It is not a guarantee of quality. It is a guarantee that the document has been examined by someone trying to break it, and that every claim left standing survived that examination.

---

*Part of [Hermes](https://github.com/joshkenitzer-ops/hermes) · [Lore](https://github.com/joshkenitzer-ops/lore)*
