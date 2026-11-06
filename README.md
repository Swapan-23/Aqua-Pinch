# AQUA PINCH 

> **Automated n8n & LLM Orchestration for Industrial Water Pinch Optimization**  
> *Submitted for NOVEX 2026: TECH-NOVENTION (PS Category: Water Reuse & Recycling in Chemicals & Petrochemicals)*

---

##  Overview
Traditional Water Pinch Analysis relies on manual source-sink stream matching across hundreds of piping permutations—a slow, error-prone workflow that delays industrial water reuse. 

**AQUA PINCH** bridges this execution gap by combining Python-based mathematical targeting algorithms with Large Language Models (Claude/DeepSeek), seamlessly orchestrated via **n8n**. The framework converts complex theoretical mass balance data into deployable physical water routing networks in under **10–12 minutes**.

---

##  System Architecture & Workflow

[ User Input / Stream Data ]
│
▼
[ Python Engine (Pinch Cal Node) ] ──> Mass Balances & Composite Curves
│
▼
[ n8n Workflow Orchestrator ] ──────> Passes Targets & Constraints
│
▼
[ LLM Layout Agent (Claude) ] ──────> Computes Feasible Stream Connections
│
▼
[ SVG Generator Node ] ────────────> Renders Dynamic Water Allocation Diagram

1. **Python Computational Engine**: Calculates mass balances, concentration intervals, limiting composite curves, minimum freshwater targeting ($91.46\text{ t/hr}$), and pinch concentration ($200\text{ ppm}$).
2. **n8n Workflow Orchestrator**: Automatically passes numerical target outputs to LLM prompt templates.
3. **LLM Layout Agent**: Converts numerical targeting outputs into non-crossing physical water routing topologies.
4. **SVG Generator**: Dynamically renders an orthogonally routed SVG network diagram for immediate operational visualization.
5. **Human-in-the-Loop**: Permits real-time prompt updates when physical plant constraints change.

---

## 🧪 Proof of Concept Case Study Results

### Input Process Streams
| Operation | Mass Load ($g/hr$) | $C_{in}$ (ppm) | $C_{out}$ (ppm) | Flow Rate ($t/hr$) |
| :---: | :---: | :---: | :---: | :---: |
| **Op 1** | 3,000 | 0 | 200 | 15.00 |
| **Op 2** | 5,000 | 60 | 200 | 35.70 |
| **Op 3** | 25,000 | 60 | 400 | 73.53 |
| **Op 4** | 6,000 | 500 | 800 | 20.00 |

### Key Optimization Metrics
* **Minimum Freshwater Requirement**: `91.46 t/hr`
* **Pinch Concentration**: `200 ppm`
* **Design Execution Time**: Reduced from hours to `~10–12 minutes`

---

## 📂 Repository Structure

```text
Aqua-Pinch/
├── README.md                          # Main Project Overview & Quickstart
├── requirements.txt                   # Python Dependencies
├── .gitignore                         # Git Ignore Rules
├── LICENSE                            # Open Source License (MIT)
├── src/
│   ├── pinch_engine.py                # Mathematical Targeting & Graph Generator
│   └── dynamic_svg_generator.js       # Dynamic SVG Network Diagram Renderer
└── workflows/
    └── water_pinch_agent.json         # Exported n8n Orchestration Workflow
