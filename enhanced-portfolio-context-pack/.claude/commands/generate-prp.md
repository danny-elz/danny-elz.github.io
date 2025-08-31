# /generate-prp — Create a PRP from INITIAL.md (Enhanced)

**Goal:** Turn `INITIAL.md` + `CLAUDE.md` + `examples/` into a Product Requirements Prompt in `PRPs/`.

## Behavior
1) Read **CLAUDE.md** and the file at `$ARGUMENTS` (default `INITIAL.md`).  
2) Inspect **examples/** for code patterns (hero, metrics bar, projects, timeline, contact, analytics).  
3) Use `PRPs/templates/prp_base.md` as the skeleton.  
4) Output `PRPs/<kebab-case-title>.md` with:
   - Context & goals
   - Implementation plan with **validation gates**
   - Tests (perf/a11y/SEO/security), analytics checks
   - Success criteria mapping to **CLAUDE.md** acceptance

## Arguments
- `$ARGUMENTS` — path to initial brief (default: `INITIAL.md`).

## Notes
- Prefer the enhanced examples; keep steps deterministic and budget‑aware.
