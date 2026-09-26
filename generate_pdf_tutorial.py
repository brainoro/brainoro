import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas that enables two-pass page numbering and headers/footers."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Header
        self.drawString(54, 750, "Brainoro: Next-Gen K-12 Learning OS — Complete User Guide")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 744, 558, 744)

        # Footer
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, "Confidential — Educational Architecture & System Operations Guide")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_text)
        self.restoreState()


def build_tutorial_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#0f172a") # Slate 900
    brand_blue = colors.HexColor("#0284c7")    # Sky 600
    accent_emerald = colors.HexColor("#059669")# Emerald 600
    card_bg = colors.HexColor("#f8fafc")       # Slate 50
    border_color = colors.HexColor("#e2e8f0")

    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=primary_color,
        spaceAfter=10,
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=brand_blue,
        spaceAfter=25,
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=primary_color,
        spaceBefore=16,
        spaceAfter=10,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=brand_blue,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=8,
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4,
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a"),
        backColor=colors.HexColor("#f1f5f9"),
        borderPadding=6,
        spaceAfter=8,
    )

    caption_style = ParagraphStyle(
        'ImageCaption',
        parent=styles['Italic'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#64748b"),
        alignment=1, # Center
        spaceAfter=10,
        spaceBefore=4,
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=body_style,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#0f766e"),
    )

    story = []

    # -------------------------------------------------------------------------
    # COVER PAGE / HEADER
    # -------------------------------------------------------------------------
    story.append(Spacer(1, 20))
    story.append(Paragraph("BRAINORO OS", ParagraphStyle('Badge', fontName='Helvetica-Bold', fontSize=10, textColor=brand_blue, spaceAfter=8)))
    story.append(Paragraph("Next-Gen K-12 Learning OS<br/>Complete Operations & Tutorial Guide", title_style))
    story.append(Paragraph("A Step-by-Step Practical Manual to Mastering the 5-Pillar Decoupled Cognitive Architecture", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=brand_blue, spaceBefore=0, spaceAfter=15))

    meta_table = Table([
        [Paragraph("<b>Author:</b> Principal Software Engineer", body_style), Paragraph("<b>Version:</b> 2.0.0 (Production)", body_style)],
        [Paragraph("<b>Target Stack:</b> Next.js + FastAPI + PostgreSQL", body_style), Paragraph("<b>Audience:</b> Educators, Developers, Parents", body_style)],
    ], colWidths=[250, 250])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), card_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 20))

    # Executive Summary Card
    exec_summary = [
        [Paragraph("<b>Executive Overview: What Problem Does Brainoro Solve?</b><br/>"
                   "Traditional educational software suffers from <b>rigid schema constraints</b> (hardcoded boards and subjects) "
                   "and awards opaque, unhelpful scores (like '72%') that lead to rote cramming and rapid memory decay.<br/><br/>"
                   "<b>Brainoro decouples cognitive mechanisms from curriculum metadata.</b> It empowers students to achieve "
                   "<b>measurable cognitive acceleration</b> across CBSE, Cambridge IGCSE, and IB MYP using 5 interconnected pillars: "
                   "Universal Cornell Notes, Psychometric Adaptive Testing (IRT), Spaced Repetition (SM-2), Upward Prerequisite Remediation (DAG), "
                   "and a Parent Portal tracking memory half-life.", body_style)]
    ]
    t_sum = Table(exec_summary, colWidths=[500])
    t_sum.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0f9ff")),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#0284c7")),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_sum)
    story.append(Spacer(1, 25))

    # -------------------------------------------------------------------------
    # TABLE OF CONTENTS / 5-PILLAR ARCHITECTURE MAP
    # -------------------------------------------------------------------------
    story.append(Paragraph("System Map: The 5 Core Pillars", h2_style))
    
    pillars_data = [
        [Paragraph("<b>#</b>", body_style), Paragraph("<b>Pillar Name</b>", body_style), Paragraph("<b>Underlying Algorithm / Framework</b>", body_style), Paragraph("<b>User Benefit</b>", body_style)],
        [Paragraph("1", body_style), Paragraph("<b>Cornell Notes Layer</b>", body_style), Paragraph("Universal 3-zone layout + First-Principles AI", body_style), Paragraph("Learn concepts intuitively in 5 mins with diagrams & worked steps.", body_style)],
        [Paragraph("2", body_style), Paragraph("<b>Adaptive Testing</b>", body_style), Paragraph("Item Response Theory (1PL/2PL Rasch Model)", body_style), Paragraph("Questions dynamically adjust to ability; switches CBSE/CIE/IB UX.", body_style)],
        [Paragraph("3", body_style), Paragraph("<b>Spaced Memory Hub</b>", body_style), Paragraph("SuperMemo-2 (SM-2) + 5-Box Leitner Queues", body_style), Paragraph("Locks formulas into long-term memory permanently without cramming.", body_style)],
        [Paragraph("4", body_style), Paragraph("<b>Remediation Graph</b>", body_style), Paragraph("Directed Acyclic Graph (DAG) Adjacency List", body_style), Paragraph("Traces mistakes upward to isolate exact foundational knowledge gaps.", body_style)],
        [Paragraph("5", body_style), Paragraph("<b>Parent Acceleration Portal</b>", body_style), Paragraph("Ebbinghaus Forgetting & Retention Stability S", body_style), Paragraph("Auditable memory half-life in days, not ambiguous percentage marks.", body_style)],
    ]
    t_pillars = Table(pillars_data, colWidths=[20, 110, 180, 190])
    t_pillars.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_pillars)

    story.append(PageBreak())

    # -------------------------------------------------------------------------
    # SECTION 1: HOW TO RUN & LAUNCH THE PLATFORM
    # -------------------------------------------------------------------------
    story.append(Paragraph("1. Quickstart: Launching Brainoro in 30 Seconds", h1_style))
    story.append(Paragraph("Brainoro consists of a high-performance <b>Next.js frontend</b> and a decoupled <b>Python FastAPI cognitive backend</b>. Both can be started with pre-configured 1-click launcher scripts.", body_style))

    story.append(Paragraph("<b>Step 1: Launch the Frontend Learning OS</b>", h2_style))
    story.append(Paragraph("Open Windows PowerShell or double-click the launcher at <code>C:\\Users\\pali0\\Brainoro\\start_frontend.bat</code>:", body_style))
    story.append(Paragraph("cd C:\\Users\\pali0\\Brainoro\\frontend\nnpm run dev", code_style))
    story.append(Paragraph("Open your web browser at <b>http://localhost:3000</b>. The complete OS with the dynamic board switcher, Cornell notes, and test engines will load immediately.", body_style))

    story.append(Paragraph("<b>Step 2: Launch the FastAPI Cognitive Engine</b>", h2_style))
    story.append(Paragraph("Open a second PowerShell tab or double-click <code>C:\\Users\\pali0\\Brainoro\\start_backend.bat</code>:", body_style))
    story.append(Paragraph("cd C:\\Users\\pali0\\Brainoro\\backend\n.\\venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --port 8000", code_style))
    story.append(Paragraph("Interactive OpenAPI / Swagger documentation will be available at <b>http://localhost:8000/docs</b>.", body_style))

    # Image 1: Main Platform UI
    img_main = r"C:\Users\pali0\.gemini\antigravity\brain\18467d00-0434-4220-ab42-b4b18a825b81\.user_uploaded\media_1789420276315.png"
    if os.path.exists(img_main):
        story.append(Spacer(1, 10))
        story.append(Image(img_main, width=6.8*inch, height=3.4*inch))
        story.append(Paragraph("Figure 1.1: Brainoro OS Main Dashboard featuring the 5-Pillar Tour Banner, Dynamic Board Selector, and Cornell Study Layer.", caption_style))

    story.append(Spacer(1, 15))

    # -------------------------------------------------------------------------
    # SECTION 2: THE UNIVERSAL CORNELL NOTE LAYER
    # -------------------------------------------------------------------------
    story.append(Paragraph("2. Pillar 1: Universal Cornell Note Layer", h1_style))
    story.append(Paragraph("The Cornell Note Layer transforms dense, dry textbook chapters into interactive, high-retention mental models structured in 3 synchronized learning zones.", body_style))

    cornell_steps = [
        Paragraph("• <b>The Real-World Intuition Card:</b> Connects abstract math to daily life (e.g. Pythagoras is explained as the diagonal shortcut across a rectangular park: 30m East + 40m North = 70m vs 50m straight across).", bullet_style),
        Paragraph("• <b>The Key Formula & Axiom Card:</b> Highlighted in bold mathematical typography with zero ambiguous jargon (e.g. <code>a² + b² = c²</code>).", bullet_style),
        Paragraph("• <b>The Systemic Exam Trap Card:</b> Shows students the exact mistakes examiners penalize in CBSE, Cambridge, and IB (e.g. applying Pythagoras to non-right triangles or confusing focal length signs).", bullet_style),
        Paragraph("• <b>Interactive SVG Geometry:</b> Crisp diagrams showing right-angled triangles with labels, ray vectors, and Cartesian axes.", bullet_style),
        Paragraph("• <b>Step-by-Step Worked Numerical Examples:</b> Tabbed derivation breaking problems into 4-6 sequential steps with highlighted arithmetic.", bullet_style),
        Paragraph("• <b>Instant Concept Check Quizzes:</b> Interactive multiple-choice questions with immediate green/red feedback and explanatory rationale.", bullet_style),
    ]
    story.append(Spacer(1, 8))
    # Image 2: Cornell Notes
    img_cornell = r"C:\Users\pali0\.gemini\antigravity\brain\18467d00-0434-4220-ab42-b4b18a825b81\.user_uploaded\media_1789417787644.png"
    if os.path.exists(img_cornell):
        story.append(Image(img_cornell, width=6.5*inch, height=2.8*inch))
        story.append(Paragraph("Figure 2.1: The Universal Cornell Note Structure showing Intuition Pump, Axiom Formula, Exam Traps, and Sub-Tab Navigation.", caption_style))

    story.append(Spacer(1, 8))
    quick_nav_box = [
        [Paragraph("<b>💡 Quick Navigation & Topic Selection Guide:</b><br/>"
                   "• <b>Where to find Pre-Loaded Curriculums:</b> Look at the <b>Pre-Loaded Syllabus Topics</b> bar right below the module tabs. "
                   "Brainoro comes loaded with full curriculums: <b>CBSE (Class 9 Math)</b>, <b>Cambridge (IGCSE Physics)</b>, and <b>IB MYP (Science)</b>. "
                   "Simply click the board pill at the very top (CBSE / CAMBRIDGE / IB_MYP) and then click any of the numbered topic pills below!<br/>"
                   "• <b>Where to find '⚡ Quick Concept Check':</b> Inside the Cornell Note card, directly above the notes, click the green sub-tab "
                   "<b>'⚡ Quick Concept Check (2 Qs)'</b> next to '📖 Cornell Study Notes' and '✏️ Worked Numerical Example' to take an immediate interactive validation quiz.", body_style)]
    ]
    t_nav = Table(quick_nav_box, colWidths=[500])
    t_nav.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ecfdf5")),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#059669")),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_nav)

    story.append(PageBreak())

    # -------------------------------------------------------------------------
    # SECTION 3: MULTI-BOARD RUNTIME UX ADAPTERS & IRT ADAPTIVE TESTING
    # -------------------------------------------------------------------------
    story.append(Paragraph("3. Pillar 2: Dynamic Board UX & Adaptive Testing (IRT)", h1_style))
    story.append(Paragraph("Unlike traditional platforms that force all students into identical multiple-choice quizzes, Brainoro dynamically changes both its <b>underlying psychometric difficulty</b> and its <b>board-specific user interface</b> at runtime.", body_style))

    story.append(Paragraph("<b>The Psychometric IRT Engine (1PL / 2PL Rasch Model)</b>", h2_style))
    story.append(Paragraph("Every assessment item carries two calibrated parameters: <b>Difficulty (b)</b> and <b>Discrimination (a)</b>. When a student answers:", body_style))
    story.append(Paragraph("• If correct: Latent ability <b>θ</b> increases, and the engine queries the item bank for a more challenging question.<br/>"
                           "• If incorrect: Latent ability <b>θ</b> decreases, and foundational remediation is triggered.<br/>"
                           "• Next Question Selection: Uses <b>Fisher Information maximization</b> to select the exact question that provides the highest diagnostic clarity at the student's current ability boundary.", body_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>The 3 Runtime Board UX Adapters</b>", h2_style))

    board_table_data = [
        [Paragraph("<b>Board Matrix</b>", body_style), Paragraph("<b>Active Features & Constraints</b>", body_style), Paragraph("<b>Pedagogical Purpose</b>", body_style)],
        [Paragraph("<b>CBSE Matrix</b><br/>(Class 9-10)", body_style),
         Paragraph("• <b>Calculation Locks Active</b><br/>• Sequential Step-by-Step Proof Builder<br/>• Keyword validation for intermediate steps", body_style),
         Paragraph("CBSE marking schemes award marks strictly for sequential derivation. Skimming to final answers receives 0 marks.", body_style)],
        [Paragraph("<b>Cambridge (CIE)</b><br/>(IGCSE Grade 10)", body_style),
         Paragraph("• <b>Command Word Highlighter</b> (<i>Calculate, Deduce, State, Explain</i>)<br/>• Interactive Scientific Calculator window<br/>• Strict 3 Significant Figures precision rule", body_style),
         Paragraph("Enforces international scientific rigor, units conformity, and official command taxonomy.", body_style)],
        [Paragraph("<b>IB MYP Matrix</b><br/>(Middle Years 4-5)", body_style),
         Paragraph("• <b>Criteria A–D Formative Rubrics</b> (Scale 1-8 per criterion)<br/>• Dynamic mapping to standard <b>1–7 Achievement Levels</b><br/>• Global context inquiry prompt", body_style),
         Paragraph("Evaluates holistic inquiry, experimental design, and societal impacts rather than rote answers.", body_style)],
    ]
    t_boards = Table(board_table_data, colWidths=[110, 200, 190])
    t_boards.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_boards)

    story.append(Spacer(1, 20))

    # -------------------------------------------------------------------------
    # SECTION 4: SPACED REPETITION & GRAPH REMEDIATION
    # -------------------------------------------------------------------------
    story.append(Paragraph("4. Pillars 3 & 4: Spaced Memory & DAG Remediation", h1_style))
    story.append(Paragraph("These two mathematical engines ensure students never suffer from memory decay and can immediately diagnose why they failed an advanced problem.", body_style))

    story.append(Paragraph("<b>Pillar 3: The SM-2 Spaced Repetition Engine</b>", h2_style))
    story.append(Paragraph("Every concept flashcard lives in an automated 5-Box Leitner queue (Box 1: Daily ➔ Box 5: Mastered). When self-evaluating quality from 0 (Blackout) to 5 (Perfect Recall):", body_style))
    story.append(Paragraph("• <b>Ease Factor (EF):</b> Recalculates dynamically: <code>EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))</code><br/>"
                           "• <b>Interval Expansion:</b> Jumps from 1 day ➔ 6 days ➔ <code>Interval * EF</code> days on success; resets to Day 1 on failure.<br/>"
                           "• <b>#HardToMemorize Flag:</b> If tagged, penalizes interval growth by 0.75x to force higher review frequency.", body_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Pillar 4: Knowledge Graph & Upward Remediation</b>", h2_style))
    story.append(Paragraph("Concepts are linked as a Directed Acyclic Graph (DAG). When a student fails a target concept (e.g. <i>Linear Equations</i>), the engine traverses upward along <code>parent_node_id</code> and dependency edges to identify root-cause knowledge gaps (e.g. <i>Real Numbers & Algebraic Identities</i>).", body_style))

    story.append(PageBreak())

    # -------------------------------------------------------------------------
    # SECTION 5: INGESTING OPEN EDUCATIONAL RESOURCES (OER)
    # -------------------------------------------------------------------------
    story.append(Paragraph("5. Content Ingestion Pipeline: Turning OER into Owned IP", h1_style))
    story.append(Paragraph("Brainoro eliminates licensing fees by ingesting Creative Commons textbooks (<b>OpenStax</b> and <b>CK-12 FlexBooks</b>) through an AI transformation pipeline that strictly generates 100% original owned IP.", body_style))

    story.append(Paragraph("<b>Step-by-Step Ingestion Tutorial:</b>", h2_style))
    ingest_steps = [
        Paragraph("1. Click the green <b>'Ingest OER'</b> button in the top navigation bar.", bullet_style),
        Paragraph("2. Select the <b>Target Board</b> (e.g. CBSE, Cambridge, or IB MYP).", bullet_style),
        Paragraph("3. Select the <b>Subject Field</b> (e.g. Physics or Mathematics).", bullet_style),
        Paragraph("4. Enter the <b>Topic Tracking Key</b> (e.g. <code>LIGHT</code> or <code>PYTHAGORAS</code>).", bullet_style),
        Paragraph("5. Paste the raw Markdown text from any OpenStax or CK-12 section into the text area.", bullet_style),
        Paragraph("6. Click <b>'Execute Ingestion'</b>.", bullet_style),
        Paragraph("7. The system dynamically validates the key as uppercase slug <code>CBSE-G9-PHYSICS-LIGHT</code>, registers the node, synthesizes the Cornell blueprint, and opens it directly in your workspace!", bullet_style),
    ]
    for s in ingest_steps:
        story.append(s)

    # Image 3: OER Modal Ingestion
    img_modal = r"C:\Users\pali0\.gemini\antigravity\brain\18467d00-0434-4220-ab42-b4b18a825b81\.user_uploaded\media_1789420272162.png"
    if os.path.exists(img_modal):
        story.append(Spacer(1, 10))
        story.append(Image(img_modal, width=5.5*inch, height=4.2*inch))
        story.append(Paragraph("Figure 5.1: The OER Content Ingestion Modal binding Target Board, Subject, and Topic Tracking Key ('LIGHT') dynamically.", caption_style))

    story.append(Spacer(1, 15))

    # -------------------------------------------------------------------------
    # SECTION 6: THE PARENT COGNITIVE ACCELERATION PORTAL
    # -------------------------------------------------------------------------
    story.append(Paragraph("6. Pillar 5: The Parent Cognitive Acceleration Portal", h1_style))
    story.append(Paragraph("Brainoro eliminates opaque school percentage scores (e.g. '78%') in favor of trackable, auditable memory retention metrics:", body_style))

    parent_table = [
        [Paragraph("<b>Metric</b>", body_style), Paragraph("<b>Sample Value</b>", body_style), Paragraph("<b>Practical Meaning for Parents</b>", body_style)],
        [Paragraph("<b>Retention Stability (S)</b>", body_style), Paragraph("<b>18.5 Days</b>", body_style), Paragraph("The elapsed time before memory retrieval probability drops by 1/e (~37%). Indicates deep cognitive consolidation.", body_style)],
        [Paragraph("<b>Memory Half-Life</b>", body_style), Paragraph("<b>12.8 Days</b>", body_style), Paragraph("Exact window until there is a 50% chance of forgetting without reinforcement.", body_style)],
        [Paragraph("<b>Retrieval Velocity</b>", body_style), Paragraph("<b>42 Cards/Wk</b>", body_style), Paragraph("Active neural pathway reconsolidations completed each week.", body_style)],
        [Paragraph("<b>Long-Term Retention</b>", body_style), Paragraph("<b>87.4%</b>", body_style), Paragraph("Audited 90-day retention rate across foundational STEM concepts.", body_style)],
    ]
    t_parent = Table(parent_table, colWidths=[130, 90, 280])
    t_parent.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, card_bg]),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_parent)

    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceBefore=10, spaceAfter=15))
    story.append(Paragraph("<b>Trademark & Intellectual Property Disclaimer:</b> Brainoro is an independent learning OS. CBSE, Cambridge IGCSE, and IB MYP are registered trademarks of their respective owners. Reference to these curricula is strictly for educational alignment and compatibility purposes. Brainoro is not affiliated with, endorsed by, or sponsored by any official examination board.", ParagraphStyle('Disclaimer', parent=body_style, fontSize=7.5, leading=10, textColor=colors.HexColor("#64748b"))))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF Successfully generated at: {output_path}")

if __name__ == "__main__":
    out_pdf = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\pali0\Brainoro\Brainoro_Complete_User_Guide.pdf"
    build_tutorial_pdf(out_pdf)
