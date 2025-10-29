"""
Report Generation Agent
Generates downloadable PDF and JSON reports from aggregated pharmaceutical research data.
Uses ReportLab for PDF generation.
"""

import json
from typing import Dict
from datetime import datetime
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer,
    PageBreak,
    Image,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY


class ReportAgent:
    """
    Generates comprehensive pharmaceutical research reports in PDF and JSON formats.
    Aggregates data from all agents into a single, professional document.
    """

    def __init__(self):
        """Initialize report agent with styling."""
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def _setup_custom_styles(self):
        """Set up custom paragraph styles for reports."""
        self.styles.add(
            ParagraphStyle(
                name="CustomTitle",
                parent=self.styles["Heading1"],
                fontSize=24,
                textColor=colors.HexColor("#1f4788"),
                spaceAfter=30,
                alignment=TA_CENTER,
                fontName="Helvetica-Bold",
            )
        )
        self.styles.add(
            ParagraphStyle(
                name="CustomHeading",
                parent=self.styles["Heading2"],
                fontSize=14,
                textColor=colors.HexColor("#2e5c8a"),
                spaceAfter=12,
                fontName="Helvetica-Bold",
            )
        )
        self.styles.add(
            ParagraphStyle(
                name="CustomBody",
                parent=self.styles["BodyText"],
                fontSize=11,
                alignment=TA_JUSTIFY,
                spaceAfter=12,
                leading=14,
            )
        )

    def generate_json_report(
        self, aggregated_data: Dict, molecule_name: str
    ) -> str:
        """
        Generate a JSON report from aggregated pharmaceutical data.

        Args:
            aggregated_data (Dict): Aggregated data from all agents.
            molecule_name (str): Name of the molecule being analyzed.

        Returns:
            str: JSON-formatted report.
        """
        report = {
            "report_metadata": {
                "title": f"Pharmaceutical Research Report: {molecule_name}",
                "generated_date": datetime.now().isoformat(),
                "molecule": molecule_name,
                "report_type": "Comprehensive Pharmaceutical Intelligence",
            },
            "market_intelligence": aggregated_data.get("market_data", {}),
            "clinical_trials": aggregated_data.get("clinical_data", {}),
            "patent_landscape": aggregated_data.get("patent_data", {}),
            "web_intelligence": aggregated_data.get("web_data", {}),
            "ai_insights": aggregated_data.get("ai_insights", ""),
            "recommendations": aggregated_data.get("recommendations", ""),
        }

        return json.dumps(report, indent=2, default=str)

    def generate_pdf_report(
        self, aggregated_data: Dict, molecule_name: str
    ) -> BytesIO:
        """
        Generate a comprehensive PDF report from aggregated data.

        Args:
            aggregated_data (Dict): Aggregated data from all agents.
            molecule_name (str): Name of the molecule being analyzed.

        Returns:
            BytesIO: PDF file as bytes buffer.
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=0.75 * inch,
            leftMargin=0.75 * inch,
            topMargin=0.5 * inch,
            bottomMargin=0.5 * inch,
        )

        story = []

        # Title
        story.append(
            Paragraph(
                f"Pharmaceutical Research Report: {molecule_name}",
                self.styles["CustomTitle"],
            )
        )
        story.append(
            Paragraph(
                f"Report Generated: {datetime.now().strftime('%B %d, %Y')}",
                self.styles["Normal"],
            )
        )
        story.append(Spacer(1, 0.3 * inch))

        # Executive Summary
        story.append(
            Paragraph("Executive Summary", self.styles["CustomHeading"])
        )
        ai_insights = aggregated_data.get("ai_insights", "Analysis in progress...")
        story.append(
            Paragraph(str(ai_insights)[:500] + "...", self.styles["CustomBody"])
        )
        story.append(Spacer(1, 0.2 * inch))

        # Market Intelligence Section
        story.append(
            Paragraph("Market Intelligence", self.styles["CustomHeading"])
        )
        market_data = aggregated_data.get("market_data", {})
        if market_data:
            market_info = [
                ["Metric", "Value"],
                [
                    "Market Size (USD)",
                    f"${market_data.get('market_size_usd', 'N/A'):,.0f}",
                ],
                [
                    "Growth Rate",
                    f"{market_data.get('growth_rate', 0) * 100:.1f}%",
                ],
                [
                    "Therapeutic Area",
                    market_data.get("therapeutic_area", "N/A"),
                ],
            ]
            market_table = Table(market_info)
            market_table.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2e5c8a")),
                        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                        ("FONTSIZE", (0, 0), (-1, 0), 12),
                        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                        ("GRID", (0, 0), (-1, -1), 1, colors.black),
                        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
                    ]
                )
            )
            story.append(market_table)
        story.append(Spacer(1, 0.2 * inch))

        # Clinical Trials Section
        story.append(
            Paragraph("Clinical Trials Overview", self.styles["CustomHeading"])
        )
        clinical_data = aggregated_data.get("clinical_data", {})
        if clinical_data:
            clinical_info = [
                ["Metric", "Value"],
                ["Total Trials", str(clinical_data.get("trials_count", 0))],
                [
                    "Total Enrollment",
                    str(clinical_data.get("total_enrollment", 0)),
                ],
            ]
            clinical_table = Table(clinical_info)
            clinical_table.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2e5c8a")),
                        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                        ("FONTSIZE", (0, 0), (-1, 0), 12),
                        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                        ("GRID", (0, 0), (-1, -1), 1, colors.black),
                        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
                    ]
                )
            )
            story.append(clinical_table)
        story.append(Spacer(1, 0.2 * inch))

        # Patent Landscape Section
        story.append(
            Paragraph("Patent Landscape", self.styles["CustomHeading"])
        )
        patent_data = aggregated_data.get("patent_data", {})
        if patent_data:
            patent_info = [
                ["Metric", "Value"],
                ["Total Patents", str(patent_data.get("total_patents", 0))],
                ["Active Patents", str(patent_data.get("active_patents", 0))],
                ["Expired Patents", str(patent_data.get("expired_patents", 0))],
            ]
            patent_table = Table(patent_info)
            patent_table.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2e5c8a")),
                        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                        ("FONTSIZE", (0, 0), (-1, 0), 12),
                        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                        ("GRID", (0, 0), (-1, -1), 1, colors.black),
                        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
                    ]
                )
            )
            story.append(patent_table)
        story.append(Spacer(1, 0.3 * inch))

        # Recommendations
        story.append(
            Paragraph("Recommendations", self.styles["CustomHeading"])
        )
        recommendations = aggregated_data.get("recommendations", "Further analysis recommended.")
        story.append(
            Paragraph(str(recommendations), self.styles["CustomBody"])
        )

        # Build PDF
        doc.build(story)
        buffer.seek(0)

        return buffer

    def save_report_metadata(self, molecule_name: str, report_path: str) -> Dict:
        """
        Save report metadata to track generated reports.

        Args:
            molecule_name (str): Name of the molecule.
            report_path (str): Path where report was saved.

        Returns:
            Dict: Report metadata.
        """
        metadata = {
            "molecule": molecule_name,
            "report_path": report_path,
            "generated_date": datetime.now().isoformat(),
            "report_id": f"RPT_{molecule_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        }

        return metadata
