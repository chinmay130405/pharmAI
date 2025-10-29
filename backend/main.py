"""
FastAPI Backend for Pharmaceutical Agent AI Platform
Provides RESTful API endpoints for the Streamlit frontend.
Orchestrates all worker agents for pharmaceutical research.
"""

import os
import json
from typing import Optional
from io import BytesIO
from datetime import datetime

from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from agents.master_agent import MasterAgent
from routes_auth import router as auth_router
from routes_reports import router as reports_router

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Pharmaceutical Agent AI Platform",
    description="AI-powered platform for identifying drug repurposing opportunities",
    version="1.0.0",
)

# Enable CORS for Streamlit frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(reports_router)

# Initialize Master Agent
master_agent = MasterAgent(groq_api_key=os.getenv("GROQ_API_KEY"))

# Store generated reports in memory (in production, use database)
reports_store = {}


# ============================================================================
# Request/Response Models
# ============================================================================


class MoleculeQuery(BaseModel):
    """Request model for molecule analysis."""

    molecule_name: str
    include_insights: bool = True


class MoleculeAnalysisResponse(BaseModel):
    """Response model for molecule analysis."""

    molecule: str
    market_data: dict
    clinical_data: dict
    patent_data: dict
    web_data: dict
    ai_insights: str
    recommendations: str


class TrendsResponse(BaseModel):
    """Response model for trends data."""

    market_trends: list
    clinical_trends: list
    web_trends: list
    ai_summary: Optional[str] = None


# ============================================================================
# Health & Info Endpoints
# ============================================================================


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint with API information."""
    return {
        "status": "active",
        "platform": "Pharmaceutical Agent AI",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "query_molecule": "/query_molecule",
            "get_trends": "/get_trends",
            "generate_report": "/generate_report",
            "saved_reports": "/saved_reports",
        },
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "groq_configured": os.getenv("GROQ_API_KEY") is not None,
    }


# ============================================================================
# Main Query Endpoints
# ============================================================================


@app.post("/query_molecule", tags=["Analysis"])
async def query_molecule(query: MoleculeQuery):
    """
    Analyze a molecule using all available agents.

    Args:
        query (MoleculeQuery): Molecule name and analysis options.

    Returns:
        MoleculeAnalysisResponse: Comprehensive analysis results.

    Example:
        POST /query_molecule
        {"molecule_name": "aspirin", "include_insights": true}
    """
    try:
        if not query.molecule_name.strip():
            raise HTTPException(status_code=400, detail="Molecule name cannot be empty")

        # Query the Master Agent
        results = master_agent.query_molecule(query.molecule_name)

        # Store report for later download
        report_id = f"{query.molecule_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        reports_store[report_id] = results

        return JSONResponse(content=results, status_code=200)

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error analyzing molecule: {str(e)}"
        )


@app.get("/query_molecule/{molecule_name}", tags=["Analysis"])
async def query_molecule_get(molecule_name: str):
    """
    Get analysis for a molecule using GET request.

    Args:
        molecule_name (str): Name of the molecule.

    Returns:
        dict: Comprehensive analysis results.
    """
    try:
        results = master_agent.query_molecule(molecule_name)
        report_id = f"{molecule_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        reports_store[report_id] = results
        return JSONResponse(content=results, status_code=200)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error analyzing molecule: {str(e)}"
        )


# ============================================================================
# Trends and Insights Endpoints
# ============================================================================


@app.get("/get_trends", tags=["Trends"])
async def get_trends():
    """
    Get current pharmaceutical trends and opportunities.

    Returns:
        dict: Trending therapeutic areas, molecules, and AI analysis.

    Example:
        GET /get_trends
    """
    try:
        trends = master_agent.get_trends()
        return JSONResponse(content=trends, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trends: {str(e)}")


@app.get("/therapeutic_areas", tags=["Trends"])
async def get_therapeutic_areas():
    """
    Get trending therapeutic areas with market analysis.

    Returns:
        list: Top therapeutic areas with market data.
    """
    try:
        areas = master_agent.iqvia_agent.get_therapeutic_area_trends()
        return JSONResponse(content={"therapeutic_areas": areas}, status_code=200)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching therapeutic areas: {str(e)}"
        )


@app.get("/trending_conditions", tags=["Trends"])
async def get_trending_conditions():
    """
    Get trending clinical conditions and active research areas.

    Returns:
        list: Top trending medical conditions in clinical development.
    """
    try:
        conditions = master_agent.clinical_agent.get_trending_conditions()
        return JSONResponse(content={"trending_conditions": conditions}, status_code=200)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching trending conditions: {str(e)}"
        )


@app.get("/market_trends", tags=["Trends"])
async def get_market_trends():
    """
    Get pharmaceutical market trends by therapeutic area.

    Returns:
        list: Top therapeutic areas by market metrics.
    """
    try:
        trends = master_agent.webintel_agent.get_trending_therapeutic_areas()
        return JSONResponse(content={"web_trends": trends}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching market trends: {str(e)}")


# ============================================================================
# Report Generation Endpoints
# ============================================================================


@app.post("/generate_report", tags=["Reports"])
async def generate_report(query: MoleculeQuery):
    """
    Generate a comprehensive report for a molecule analysis.

    Args:
        query (MoleculeQuery): Molecule name and report format.

    Returns:
        JSON or PDF report as downloadable file.

    Example:
        POST /generate_report
        {"molecule_name": "aspirin"}
    """
    try:
        # Check if we already have analysis for this molecule
        report_id = None
        for existing_id, data in reports_store.items():
            if data.get("molecule").lower() == query.molecule_name.lower():
                report_id = existing_id
                aggregated_data = data
                break

        # If not found, perform analysis
        if not report_id:
            aggregated_data = master_agent.query_molecule(query.molecule_name)
            report_id = f"{query.molecule_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            reports_store[report_id] = aggregated_data

        # Generate JSON report
        json_report = master_agent.generate_report(
            query.molecule_name, aggregated_data, format="json"
        )

        # Save metadata
        reports_store[f"meta_{report_id}"] = {
            "molecule": query.molecule_name,
            "generated_date": datetime.now().isoformat(),
            "report_id": report_id,
        }

        return JSONResponse(
            content=json.loads(json_report),
            status_code=200,
            headers={
                "Content-Disposition": f"attachment; filename=report_{report_id}.json"
            },
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


@app.get("/generate_report_pdf/{molecule_name}", tags=["Reports"])
async def generate_report_pdf(molecule_name: str):
    """
    Generate and download a PDF report for a molecule.

    Args:
        molecule_name (str): Name of the molecule.

    Returns:
        BytesIO: PDF file as stream.
    """
    try:
        # Check for existing analysis
        report_id = None
        for existing_id, data in reports_store.items():
            if data.get("molecule").lower() == molecule_name.lower():
                report_id = existing_id
                aggregated_data = data
                break

        # If not found, perform analysis
        if not report_id:
            aggregated_data = master_agent.query_molecule(molecule_name)
            report_id = f"{molecule_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            reports_store[report_id] = aggregated_data

        # Generate PDF
        pdf_buffer = master_agent.generate_report(
            molecule_name, aggregated_data, format="pdf"
        )

        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=report_{molecule_name}.pdf"},
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating PDF: {str(e)}")


@app.get("/saved_reports", tags=["Reports"])
async def get_saved_reports():
    """
    Get list of all saved reports.

    Returns:
        list: Metadata of all generated reports.
    """
    try:
        reports_list = []

        for key, value in reports_store.items():
            if key.startswith("meta_"):
                reports_list.append(value)

        return JSONResponse(
            content={
                "total_reports": len(reports_list),
                "reports": reports_list,
            },
            status_code=200,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reports: {str(e)}")


# ============================================================================
# Agent-Specific Endpoints
# ============================================================================


@app.get("/market_data/{molecule_name}", tags=["Market Data"])
async def get_market_data(molecule_name: str):
    """Get IQVIA market data for a molecule."""
    try:
        data = master_agent.iqvia_agent.query_market_data(molecule_name)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching market data: {str(e)}")


@app.get("/clinical_trials/{molecule_name}", tags=["Clinical Trials"])
async def get_clinical_trials(molecule_name: str):
    """Get clinical trial data for a molecule."""
    try:
        data = master_agent.clinical_agent.query_trials(molecule_name)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trial data: {str(e)}")


@app.get("/patent_data/{molecule_name}", tags=["Patents"])
async def get_patent_data(molecule_name: str):
    """Get patent information for a molecule."""
    try:
        data = master_agent.patent_agent.query_patents(molecule_name)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching patent data: {str(e)}")


@app.get("/freedom_to_operate/{molecule_name}", tags=["Patents"])
async def get_fto_analysis(molecule_name: str):
    """Get freedom-to-operate analysis for a molecule."""
    try:
        data = master_agent.patent_agent.get_freedom_to_operate(molecule_name)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing FTO: {str(e)}")


@app.get("/web_publications/{molecule_name}", tags=["Web Intelligence"])
async def get_web_publications(molecule_name: str, limit: int = 10):
    """Get recent scientific publications for a molecule."""
    try:
        data = master_agent.webintel_agent.search_publications(molecule_name, limit)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching publications: {str(e)}")


@app.get("/web_trends/{keyword}", tags=["Web Intelligence"])
async def get_web_trends(keyword: str):
    """Get web trends for a keyword (molecule or therapeutic area)."""
    try:
        data = master_agent.webintel_agent.search_trends(keyword)
        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching web trends: {str(e)}")


# ============================================================================
# Batch Analysis Endpoint
# ============================================================================


@app.post("/batch_analyze", tags=["Analysis"])
async def batch_analyze(molecules: list):
    """
    Analyze multiple molecules in batch.

    Args:
        molecules (list): List of molecule names.

    Returns:
        dict: Analysis results for all molecules.

    Example:
        POST /batch_analyze
        ["aspirin", "metformin", "doxycycline"]
    """
    try:
        if not molecules or len(molecules) == 0:
            raise HTTPException(status_code=400, detail="Molecules list cannot be empty")

        results = master_agent.batch_analyze(molecules)
        return JSONResponse(content=results, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in batch analysis: {str(e)}")


# ============================================================================
# Error Handlers
# ============================================================================


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "timestamp": datetime.now().isoformat()},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """General exception handler."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc),
            "timestamp": datetime.now().isoformat(),
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info",
    )
