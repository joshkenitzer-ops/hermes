[README.md](https://github.com/user-attachments/files/29301257/README.md)
# Hermes

> *He always got through.*

**Hermes** is a tailored document pipeline. It produces role-specific resumes, cover letters, and application packages from a single master source, with structured adversarial verification built into every output.

Part of the [Lore](https://github.com/joshkenitzer-ops/lore) toolkit.

---

## What it does

Most job application pipelines are one of two things: a generic resume blasted at every role, or a manual process that takes hours per application. Hermes replaces both with a single pipeline that tailors from a verified master source and checks its own output before it ships.

The pipeline also runs in reverse. When a job description surfaces something that belongs in the master but isn't represented there yet, the master gets updated. Every application cycle makes the master more complete.

---

## Verification pipeline

Every package produced by Hermes goes through three passes:

**Tier 1: Critical**
Defensibility audit. Every claim checked against source documentation. Unsupported framing is cut, not softened.

**Tier 2: Pedantic**
Figure and date verification. Every stat, metric, and date cross-checked against the master resume as source of truth.

**Tier 3: TL Review**
- Em-dash sweep (absolute prohibition)
- AI-writing detection: parallel fragment triplets, parallel pair endings, triplet formula structures
- ATS keyword scan

---

## Status

**In development.** Prompt architecture and verification pipeline are defined. Generation tooling is in progress.

---

## Structure

```
hermes/
├── hermes/
│   ├── __init__.py
│   ├── pipeline.py         # Document generation pipeline
│   ├── verifier.py         # Three-tier verification logic
│   └── templates/          # Role-specific prompt templates
├── docs/
│   ├── prompt-architecture.md
│   └── verification-workflow.md
├── tests/
├── pyproject.toml
└── README.md
```

---

## Roadmap

- [ ] Prompt architecture documentation
- [ ] CLI (`hermes generate --role <role> --master <file>`)
- [ ] Cassandra integration for prompt validation
- [ ] Janus integration for session continuity

---

## Philosophy

Writing a tailored resume and cover letter for every role is one of the most time-consuming parts of a job search, and most of that time goes toward work that doesn't require human judgment: adapting language, adjusting emphasis, reformatting. Hermes handles that work. What remains for the human is the part that actually requires judgment: deciding which roles to pursue, which stories to tell, and whether the output accurately represents them.

---

## Part of Lore

| Tool | Description |
|------|-------------|
| [Cassandra](https://github.com/joshkenitzer-ops/cassandra) | Prompt red-teaming |
| [Janus](https://github.com/joshkenitzer-ops/janus) | Session context management |
| **Hermes** | Document pipeline |

---

*[Josh Kenitzer](https://github.com/joshkenitzer-ops) · Staff Learning Designer, Pedagogy Lead, AI Education Researcher*
