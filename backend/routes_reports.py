from fastapi import APIRouter, HTTPException, status, Header
from typing import Optional, List
from bson import ObjectId
from datetime import datetime
from schemas import ReportCreate, ReportResponse
from database import get_reports_collection, get_users_collection
from routes_auth import get_current_user

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.post("/save")
async def save_report(report_data: ReportCreate, authorization: Optional[str] = Header(None)):
    """Save a report (optionally linked to user if authenticated)."""
    reports_collection = get_reports_collection()
    
    if reports_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    user = get_current_user(authorization)
    user_id = str(user["_id"]) if user else None
    
    new_report = {
        "user_id": user_id,
        "molecule_name": report_data.molecule_name,
        "data": report_data.data,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = reports_collection.insert_one(new_report)
    report_id = str(result.inserted_id)
    
    return {
        "id": report_id,
        "message": "Report saved successfully",
        "user_id": user_id
    }


@router.get("/user-reports", response_model=List[ReportResponse])
async def get_user_reports(authorization: Optional[str] = Header(None)):
    """Get all reports for logged-in user."""
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    reports_collection = get_reports_collection()
    if reports_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    user_id = str(user["_id"])
    reports = list(reports_collection.find({"user_id": user_id}).sort("created_at", -1))
    
    return [
        ReportResponse(
            _id=str(report["_id"]),
            user_id=report.get("user_id"),
            molecule_name=report["molecule_name"],
            data=report["data"],
            created_at=report["created_at"],
            updated_at=report.get("updated_at")
        )
        for report in reports
    ]


@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: str, authorization: Optional[str] = Header(None)):
    """Get a specific report."""
    try:
        report_oid = ObjectId(report_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid report ID"
        )
    
    reports_collection = get_reports_collection()
    if reports_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    report = reports_collection.find_one({"_id": report_oid})
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    # Check if user has access to this report
    user = get_current_user(authorization)
    if report.get("user_id") and user and str(user["_id"]) != report.get("user_id"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    return ReportResponse(
        _id=str(report["_id"]),
        user_id=report.get("user_id"),
        molecule_name=report["molecule_name"],
        data=report["data"],
        created_at=report["created_at"],
        updated_at=report.get("updated_at")
    )


@router.delete("/{report_id}")
async def delete_report(report_id: str, authorization: Optional[str] = Header(None)):
    """Delete a report (must be report owner)."""
    try:
        report_oid = ObjectId(report_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid report ID"
        )
    
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    reports_collection = get_reports_collection()
    if reports_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    report = reports_collection.find_one({"_id": report_oid})
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    if report.get("user_id") != str(user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only delete your own reports"
        )
    
    reports_collection.delete_one({"_id": report_oid})
    return {"message": "Report deleted successfully"}


@router.put("/{report_id}")
async def update_report(report_id: str, report_data: dict, authorization: Optional[str] = Header(None)):
    """Update a report (must be report owner)."""
    try:
        report_oid = ObjectId(report_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid report ID"
        )
    
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    
    reports_collection = get_reports_collection()
    if reports_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    report = reports_collection.find_one({"_id": report_oid})
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    if report.get("user_id") != str(user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only update your own reports"
        )
    
    reports_collection.update_one(
        {"_id": report_oid},
        {
            "$set": {
                "data": report_data.get("data", report["data"]),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_report = reports_collection.find_one({"_id": report_oid})
    return ReportResponse(
        _id=str(updated_report["_id"]),
        user_id=updated_report.get("user_id"),
        molecule_name=updated_report["molecule_name"],
        data=updated_report["data"],
        created_at=updated_report["created_at"],
        updated_at=updated_report.get("updated_at")
    )
