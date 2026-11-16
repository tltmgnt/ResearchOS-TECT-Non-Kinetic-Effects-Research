# Model contract and research scope
This is a generic service continuity model. EW, DE and Cyber are organizational labels, not distinct physical or attack models. Inputs and examples are owner-declared normalized service-loss scenarios. There is no coupling between scenarios and no aggregate effects score.

## Units and event order
Time is integer hours. Horizon H samples t = 0 through H−1; each sample represents one hour. Service is normalized to [0,1], initially 1.
During [start, start+duration), service is 1−L.
For recovery R > 0, during [start+duration, start+duration+R), service is 1−L(1−(t−start−duration)/R).
After recovery service is 1. A zero-duration disruption has no effect; zero recovery restores service immediately at the disruption end. Events beyond the horizon are truncated.
Lost service-hours = sum(1−service). Mean service = 1−lost service-hours/H. Hours below the declared threshold count strict service<threshold. These are discrete sums, not continuous integration.

Lower and upper loss inputs are evaluated separately. Their results form a scenario envelope, not a probability distribution or statistical confidence interval. The same loss bounds apply throughout each event. No automatic ranking, likelihood estimate, empirical calibration, synergistic interaction, or causal attribution is provided.

## Evidence and review
Basis labels (synthetic/declared/measured) and source references are declarations. Flags identify synthetic inputs, missing references and an empty review. They never modify model results. A nonempty review does not authenticate a reviewer or certify the study. Preserve external evidence separately; the app neither uploads nor verifies it.

## Boundaries
No emitter design, waveform or exposure computation, weapon performance, target selection, exploit execution, network scanning, equipment control or operational planning is implemented. This is an independent research foundation, not a validated effects predictor. No DARPA affiliation or endorsement is claimed.

## Evaluation plan
Validate assumptions against authorized defensive tabletop or service-restoration observations. Record measurement methods, provenance and uncertainty. Repeat studies across declared loss and recovery values. Have a domain reviewer assess applicability. Browser accessibility, mobile layout, import/export and persistence require interactive verification before reliance. No real-world performance claim follows from passing software tests.
