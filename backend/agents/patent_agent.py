"""
Patent Intelligence Agent
Fetches mock patent data for molecules and chemical formulations.
Provides insights on patent landscapes, exclusivity periods, and freedom-to-operate analysis.
"""

from typing import Dict, List
from datetime import datetime, timedelta


class PatentAgent:
    """
    Simulates patent database (EXIM-like) for patent intelligence.
    In production, this would connect to USPTO, WIPO, or commercial patent databases.
    """

    # Mock patent database
    MOCK_PATENTS = {
        "aspirin": [
            {
                "patent_id": "US123456789",
                "title": "Acetylsalicylic Acid Formulations",
                "assignee": "Bayer AG",
                "filing_date": "1999-05-10",
                "grant_date": "2002-08-20",
                "expiration_date": "2022-05-10",
                "status": "Expired",
                "jurisdiction": "United States",
            },
            {
                "patent_id": "US234567890",
                "title": "Extended-Release Aspirin Compositions",
                "assignee": "Boston Scientific",
                "filing_date": "2010-03-15",
                "grant_date": "2013-11-05",
                "expiration_date": "2033-03-15",
                "status": "Active",
                "jurisdiction": "United States",
            },
        ],
        "metformin": [
            {
                "patent_id": "US345678901",
                "title": "Metformin Hydrochloride Extended-Release Tablets",
                "assignee": "Merck & Cie",
                "filing_date": "2005-07-22",
                "grant_date": "2010-02-16",
                "expiration_date": "2025-07-22",
                "status": "Active",
                "jurisdiction": "United States",
            },
            {
                "patent_id": "EU456789012",
                "title": "Metformin Combination Therapies for Diabetes",
                "assignee": "Novo Nordisk",
                "filing_date": "2008-11-11",
                "grant_date": "2012-05-30",
                "expiration_date": "2028-11-11",
                "status": "Active",
                "jurisdiction": "European Union",
            },
        ],
        "doxycycline": [
            {
                "patent_id": "US567890123",
                "title": "Doxycycline Monohydrate Compositions",
                "assignee": "Pfizer Inc.",
                "filing_date": "1998-01-20",
                "grant_date": "2001-06-05",
                "expiration_date": "2018-01-20",
                "status": "Expired",
                "jurisdiction": "United States",
            },
        ],
    }

    def query_patents(self, molecule_name: str) -> Dict:
        """
        Query patents for a specific molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            Dict: Patent data including portfolio size and key patents.
        """
        molecule_key = molecule_name.lower()

        if molecule_key in self.MOCK_PATENTS:
            patents = self.MOCK_PATENTS[molecule_key]
        else:
            # Generate plausible generic patent data
            patents = [
                {
                    "patent_id": f"US999999999",
                    "title": f"{molecule_name} Formulation Patent",
                    "assignee": "Pharmaceutical Company A",
                    "filing_date": "2015-01-10",
                    "grant_date": "2018-06-15",
                    "expiration_date": "2035-01-10",
                    "status": "Active",
                    "jurisdiction": "United States",
                }
            ]

        active_patents = [p for p in patents if p["status"] == "Active"]
        expired_patents = [p for p in patents if p["status"] == "Expired"]
        
        # Calculate FTO risk score
        if not active_patents:
            fto_risk_score = 0.1
        elif len(active_patents) <= 2:
            fto_risk_score = 0.5
        else:
            fto_risk_score = 0.8

        # Calculate expiring soon (within 1-2 years from now)
        from datetime import datetime as dt
        today = dt.now()
        expiring_soon = 0
        for p in active_patents:
            try:
                exp_date = dt.fromisoformat(p.get("expiration_date", "2099-01-01"))
                if 0 <= (exp_date - today).days <= 730:  # 1-2 years
                    expiring_soon += 1
            except:
                pass

        return {
            "molecule": molecule_name,
            "total_patents": len(patents),
            "active_patents": len(active_patents),
            "expired_patents": len(expired_patents),
            "fto_risk_score": fto_risk_score,
            "expiring_soon": expiring_soon,
            "patents": patents,
            "data_source": "Patent Database (EXIM-like)",
            "query_date": datetime.now().isoformat(),
        }

    def get_freedom_to_operate(self, molecule_name: str) -> Dict:
        """
        Assess freedom to operate (FTO) for a molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            Dict: FTO assessment including risk factors.
        """
        patents_data = self.query_patents(molecule_name)
        patents = patents_data["patents"]

        active_patents = [p for p in patents if p["status"] == "Active"]

        # Simple FTO risk calculation
        if not active_patents:
            fto_risk = "Low - No active patents detected"
            fto_score = 0.1
        elif len(active_patents) <= 2:
            fto_risk = "Medium - Limited patent coverage"
            fto_score = 0.5
        else:
            fto_risk = "High - Significant patent portfolio"
            fto_score = 0.8

        return {
            "molecule": molecule_name,
            "fto_assessment": fto_risk,
            "fto_score": fto_score,  # 0-1 scale (lower is better)
            "active_patent_count": len(active_patents),
            "analysis": "Freedom-to-operate analysis based on active patent portfolio.",
            "recommendation": (
                "Consider generic entry" if fto_score < 0.3 else
                "Evaluate patent landscapes carefully" if fto_score < 0.7 else
                "Significant patent barriers exist"
            ),
        }

    def get_expiration_timeline(self, molecule_name: str) -> List[Dict]:
        """
        Get patent expiration timeline for a molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            List[Dict]: Patents ordered by expiration date.
        """
        patents_data = self.query_patents(molecule_name)
        patents = patents_data["patents"]

        # Sort by expiration date
        sorted_patents = sorted(
            patents, key=lambda x: x["expiration_date"]
        )

        return [
            {
                "patent_id": p["patent_id"],
                "title": p["title"],
                "expiration_date": p["expiration_date"],
                "status": p["status"],
                "years_remaining": (
                    (datetime.strptime(p["expiration_date"], "%Y-%m-%d") - datetime.now()).days / 365
                    if p["status"] == "Active" else 0
                ),
            }
            for p in sorted_patents
        ]

    def get_competing_molecules_by_patent_class(
        self, therapeutic_area: str
    ) -> List[Dict]:
        """
        Get competing molecules in the same patent classes.

        Args:
            therapeutic_area (str): Therapeutic area of interest.

        Returns:
            List[Dict]: Competing molecules with patent information.
        """
        # Simplified: return example competitors
        competitors = [
            {
                "molecule": "Molecule A",
                "active_patents": 3,
                "expiration_soon": False,
            },
            {
                "molecule": "Molecule B",
                "active_patents": 2,
                "expiration_soon": True,
            },
            {
                "molecule": "Molecule C",
                "active_patents": 5,
                "expiration_soon": False,
            },
        ]
        return competitors[:5]
