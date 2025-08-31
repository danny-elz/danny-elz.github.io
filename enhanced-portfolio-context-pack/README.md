# Enhanced Portfolio Context Pack — How to Use

1. Clone Cole’s template:
   ```bash
   git clone https://github.com/coleam00/context-engineering-intro.git
   cd context-engineering-intro
   ```
2. Copy this pack into the repo root, merging **examples/** and adding **.claude/** and **PRPs/**.
3. In Claude Code:
   ```
   /generate-prp INITIAL.md
   /execute-prp PRPs/<generated>.md
   ```
4. Replace `TODO` fields (metrics, URLs, envs) during execution.

Examples in `examples/` are canonical—mimic structure, a11y, and perf patterns.
