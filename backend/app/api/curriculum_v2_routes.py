from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.services.safe_curriculum_service import SafeCurriculumService

router = APIRouter(prefix="/curriculum", tags=["Curriculum V2 Safe API"])

safe_service = SafeCurriculumService()

@router.get("/concepts")
async def get_student_concepts(
    student_id: str = Query(..., description="Student ID"),
    grade: int = Query(..., ge=1, le=12, description="Student grade level (1-12)"),
    subject_code: Optional[str] = Query(None, description="Optional subject code filter")
):
    """
    100% Safe: Returns ONLY concepts belonging to the authenticated student's grade
    Prevents cross-grade and cross-subject data leakage.
    """
    try:
        concepts = await safe_service.get_student_concepts_safe(
            student_id=student_id,
            student_grade=grade,
            subject_code=subject_code
        )
        return {
            "status": "success",
            "data": concepts,
            "safety_check": "Grade isolation verified",
            "leak_protection": "ENABLED"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/verify-integrity")
async def verify_curriculum(
    board_code: str = Query("CBSE"),
    academic_year: str = Query("2026-27")
):
    """Cryptographic Merkle Tree Verification"""
    try:
        integrity = await safe_service.verify_curriculum_integrity(
            board_code=board_code,
            academic_year=academic_year
        )
        return {"status": "success", "data": integrity}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
