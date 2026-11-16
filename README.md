# ResearchOS TECT — Non-Kinetic Effects Research
Independent research workspace for EW, DE and cyber research, with an emphasis on defensive service continuity, declared uncertainty bounds, evidence references and human review.

## Browser app
Node 22+, no npm dependencies:
```sh
npm test
npm run build
python -m http.server 8000 --directory dist
```
Open http://localhost:8000. The repository root can also be served directly. Modules and JSON loading require localhost or HTTPS; file:// is not supported.

Edit the synthetic scenarios, evaluate service and recovery envelopes, inspect trajectories, record source declarations and reviewer rationale, and export JSON/CSV/Markdown. Use the advanced JSON editor to add scenarios or change domain and evidence basis; apply JSON before evaluating. Save/load stores one study in the same browser and origin. Export backups. No telemetry or live integrations are configured.

## CLI
```sh
node cli.mjs example.json
node cli.mjs example.json results.json
node cli.mjs example.json results.csv
```
Outputs refuse to overwrite existing files. The CLI and app share one deterministic model. See [model contract](docs/MODEL.md) for equations, hourly sampling and research limits.

## Validation and distribution
Nine automated tests cover hand-calculated recovery, bounds, invalid inputs, evidence separation and CSV escaping. CI checks Node 22/24, JavaScript syntax, CLI execution and static builds, and uploads downloadable app artifacts.
Local execution and interactive browser testing were unavailable during implementation. Consult CI results; do not assume tests passed. Hosting is not yet configured.

EW, DE and Cyber are research labels. The app does not predict physical effects, execute cyber actions, or control equipment. Scenario bounds are not probabilities or operational recommendations. No DARPA endorsement or demonstrated novelty is claimed.

Apache-2.0 license retained.
