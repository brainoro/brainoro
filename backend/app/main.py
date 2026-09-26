import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app.api.curriculum import router as curriculum_router
from app.api.engine import router as engine_router
from app.api.curriculum_v2_routes import router as curriculum_v2_router

app = FastAPI(
    title="Brainoro Cognitive Engine API",
    description="Next-Gen K-12 Learning OS: Extensible Multi-Board Pedagogical Engine",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure Cross-Origin Resource Sharing (CORS)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount polymorphic API routes under /api/v2
app.include_router(curriculum_router, prefix="/api/v2")
app.include_router(engine_router, prefix="/api/v2")
app.include_router(curriculum_v2_router, prefix="/api/v2")

@app.get("/")
def root():
    return {
        "engine": "Brainoro Cognitive Engine",
        "version": "2.0.0",
        "status": "operational",
        "spec_compliance": "Open-Closed Principle (Multi-Board Pedagogical Architecture)",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    gemini_active = bool(os.environ.get("GEMINI_API_KEY"))
    return {
        "status": "healthy",
        "gemini_api_configured": gemini_active,
        "supported_boards": ["CBSE", "CAMBRIDGE", "IB_MYP"],
        "supported_engines": ["SM-2_Spaced_Repetition", "IRT_1PL_2PL_Adaptive", "DAG_Adjacency_Remediation"]
    }
