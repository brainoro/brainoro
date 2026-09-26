# Brainoro: Next-Gen K-12 Learning OS
**Extensible Multi-Board Pedagogical Engine**

Built strictly on the **Open-Closed Principle (OCP)**, Brainoro decouples core cognitive mechanisms (Spaced Repetition, Item Response Theory, DAG Concept Remediation) from curriculum-specific metadata. It seamlessly supports international curricula (**Cambridge IGCSE**, **IB MYP**) and national curricula (**CBSE**) through dynamic database registries and polymorphic UX adapters.

---

## 🏛️ System Architecture

```
Brainoro/
├── backend/                    # Python FastAPI Cognitive Engine
│   ├── app/
│   │   ├── api/
│   │   │   ├── curriculum.py   # Registry lookup & Copyright-safe AI ingestion pipeline
│   │   │   └── engine.py       # Spaced repetition, IRT test session, & graph endpoints
│   │   ├── engine/
│   │   │   ├── spaced_repetition.py  # SM-2 / Leitner variant with #HardToMemorize logic
│   │   │   ├── irt.py                # 1PL (Rasch) & 2PL Item Response Theory engine
│   │   │   └── dependency_graph.py   # DAG concept dependency & upward remediation resolver
│   │   ├── models/
│   │   │   └── schemas.py      # Pydantic polymorphic models & payload schemas
│   │   └── main.py             # FastAPI entrypoint with CORS & error handlers
│   ├── db/
│   │   └── schema.sql          # PostgreSQL / Supabase DDL, RLS policies, & synthetic seed data
│   ├── setup_venv.bat          # Automated Windows venv creation script
│   ├── setup_venv.ps1          # PowerShell venv setup script
│   └── requirements.txt        # Python dependencies
│
├── frontend/                   # Modern Next.js 14 React Learning OS
│   ├── src/
│   │   ├── app/                # App Router (layout, page, globals)
│   │   ├── components/
│   │   │   ├── board-adapters/ # Dynamic Board UX Switcher
│   │   │   │   ├── BoardSwitchHeader.tsx
│   │   │   │   ├── CBSEAdapter.tsx       # Step proofs & calculation lock
│   │   │   │   ├── CambridgeAdapter.tsx  # Command words & scientific calculator
│   │   │   │   └── IBMYPAdapter.tsx      # Criteria A-D rubrics & 1-7 grade scale
│   │   │   ├── cornell/        # Universal Cornell Note-Taking Editor with AI synthesis
│   │   │   ├── memory/         # Spaced Repetition Hub & Leitner queues
│   │   │   ├── testing/        # Multi-variate IRT Adaptive Testing Simulator
│   │   │   ├── graph/          # DAG Prerequisite Graph & Remediation Visualizer
│   │   │   ├── parent/         # Parent Cognitive Acceleration Dashboard
│   │   │   ├── ingestion/      # OER / FlexBooks Ingestion Form
│   │   │   └── legal/          # Trademark & Copyright Disclaimer component
│   │   └── lib/                # Client-side engines, Supabase client, & synthetic seed data
│   └── package.json
└── .gitignore
```

---

## 🛡️ Intellectual Property & Copyright Safety Guardrails
1. **Original Synthesis Enforced**: The Gemini ingestion pipeline strictly prompts the model to generate original explanatory analogies, step proofs, and novel problems. Verbatim textbook or copyrighted exam questions are forbidden.
2. **100% Synthetic Seed Data**: All pre-loaded curriculum questions and concept models are original synthetic creations.
3. **Trademark Disclaimer**: Prominently displayed in all user layouts:
   > *"Brainoro is an independent learning OS. CBSE, Cambridge IGCSE, and IB MYP are registered trademarks of their respective owners. Reference to these curricula is strictly for educational alignment and compatibility purposes. Brainoro is not affiliated with, endorsed by, or sponsored by any official examination board."*

---

## 🚀 Quickstart

### 1. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:3000`. It includes an integrated engine bridge so all features (Board UX matrix, Cornell editor, SM-2 flashcards, IRT adaptive test, Knowledge DAG, and Parent dashboard) run immediately in the browser.

### 2. Backend (FastAPI)
```bash
cd backend
# Run automated setup:
.\setup_venv.bat
# Or manually:
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation: `http://localhost:8000/docs`
