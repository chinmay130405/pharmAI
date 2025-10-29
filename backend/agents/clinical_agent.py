"""
Clinical Trials Agent
Fetches mock clinical trial data from ClinicalTrials.gov-like source.
Provides information about ongoing and completed trials for drug candidates.
"""

from typing import Dict, List
from datetime import datetime, timedelta


class ClinicalAgent:
    """
    Simulates ClinicalTrials.gov API for clinical trial intelligence.
    In production, this would connect to actual ClinicalTrials.gov data.
    """

    # Mock clinical trial database
    MOCK_TRIALS = {
        "aspirin": [
            {
                "trial_id": "NCT04123456",
                "title": "Aspirin in Secondary Prevention of Cardiovascular Disease",
                "status": "Active, not recruiting",
                "phase": "Phase 3",
                "enrollment": 3500,
                "condition": "Cardiovascular Disease",
                "sponsor": "Mayo Clinic",
                "start_date": "2020-01-15",
                "completion_date": "2025-06-30",
            },
            {
                "trial_id": "NCT03987654",
                "title": "Low-dose Aspirin for Cancer Prevention",
                "status": "Recruiting",
                "phase": "Phase 2",
                "enrollment": 1200,
                "condition": "Cancer Prevention",
                "sponsor": "National Cancer Institute",
                "start_date": "2021-06-01",
                "completion_date": "2026-12-31",
            },
        ],
        "metformin": [
            {
                "trial_id": "NCT04234567",
                "title": "Metformin for Diabetes Prevention in High-Risk Patients",
                "status": "Recruiting",
                "phase": "Phase 3",
                "enrollment": 2500,
                "condition": "Type 2 Diabetes",
                "sponsor": "Stanford University",
                "start_date": "2022-03-01",
                "completion_date": "2027-02-28",
            },
            {
                "trial_id": "NCT04098765",
                "title": "Metformin as Adjunct in Oncology Treatment",
                "status": "Active, not recruiting",
                "phase": "Phase 2",
                "enrollment": 800,
                "condition": "Oncology",
                "sponsor": "Johns Hopkins University",
                "start_date": "2020-11-10",
                "completion_date": "2025-10-31",
            },
        ],
        "doxycycline": [
            {
                "trial_id": "NCT04345678",
                "title": "Doxycycline in Periodontal Disease Management",
                "status": "Recruiting",
                "phase": "Phase 3",
                "enrollment": 600,
                "condition": "Periodontal Disease",
                "sponsor": "University of Pennsylvania",
                "start_date": "2021-09-15",
                "completion_date": "2025-08-31",
            },
        ],
    }

    def query_trials(self, molecule_name: str) -> Dict:
        """
        Query clinical trials for a specific molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            Dict: Clinical trial data for the molecule.
        """
        molecule_key = molecule_name.lower()

        if molecule_key in self.MOCK_TRIALS:
            trials = self.MOCK_TRIALS[molecule_key]
        else:
            # Generate plausible generic trial data
            trials = [
                {
                    "trial_id": f"NCT{molecule_name[:4].upper()}0001",
                    "title": f"Safety and Efficacy Study of {molecule_name}",
                    "status": "Recruiting",
                    "phase": "Phase 2",
                    "enrollment": 500,
                    "condition": "Multiple Indications",
                    "sponsor": "Research University",
                    "start_date": (
                        datetime.now() - timedelta(days=180)
                    ).isoformat()[:10],
                    "completion_date": (
                        datetime.now() + timedelta(days=365)
                    ).isoformat()[:10],
                }
            ]

        # Calculate additional fields for frontend
        total_enrollment = sum(t.get("enrollment", 0) for t in trials)
        recruiting_count = sum(1 for t in trials if "Recruiting" in t.get("status", ""))
        sponsors = list(set(t.get("sponsor", "Unknown") for t in trials))
        estimated_completion = max(t.get("completion_date", "") for t in trials) if trials else ""

        return {
            "molecule": molecule_name,
            "trials_count": len(trials),
            "total_enrollment": total_enrollment,
            "recruiting_trials": recruiting_count,
            "main_sponsors": sponsors[:3],
            "estimated_completion_date": estimated_completion,
            "trials": trials,
            "data_source": "ClinicalTrials.gov",
            "query_date": datetime.now().isoformat(),
        }

    def get_trial_status_summary(self, molecule_name: str) -> Dict:
        """
        Get summary of trial statuses for a molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            Dict: Summary of trial statuses.
        """
        trials_data = self.query_trials(molecule_name)
        trials = trials_data["trials"]

        status_count = {}
        for trial in trials:
            status = trial["status"]
            status_count[status] = status_count.get(status, 0) + 1

        phase_count = {}
        for trial in trials:
            phase = trial["phase"]
            phase_count[phase] = phase_count.get(phase, 0) + 1

        return {
            "molecule": molecule_name,
            "total_trials": len(trials),
            "status_breakdown": status_count,
            "phase_breakdown": phase_count,
            "total_enrollment": sum(t["enrollment"] for t in trials),
            "average_enrollment_per_trial": (
                sum(t["enrollment"] for t in trials) / len(trials)
                if trials
                else 0
            ),
        }

    def get_therapeutic_area_trials(self, therapeutic_area: str) -> List[Dict]:
        """
        Get trials for a specific therapeutic area.

        Args:
            therapeutic_area (str): Name of therapeutic area (e.g., Oncology, Cardiology).

        Returns:
            List[Dict]: List of trials in that area.
        """
        all_trials = []
        for molecule, trials in self.MOCK_TRIALS.items():
            for trial in trials:
                all_trials.append(trial)

        # Filter by therapeutic area
        filtered = [
            t
            for t in all_trials
            if therapeutic_area.lower() in t["condition"].lower()
        ]

        return filtered[:10]  # Return up to 10 most recent

    def get_trending_conditions(self) -> List[Dict]:
        """
        Get trending conditions (most actively researched).

        Returns:
            List[Dict]: Top trending conditions with trial count and info.
        """
        all_trials = []
        for molecule, trials in self.MOCK_TRIALS.items():
            all_trials.extend(trials)

        condition_count = {}
        for trial in all_trials:
            condition = trial["condition"]
            if condition not in condition_count:
                condition_count[condition] = {
                    "condition": condition,
                    "trial_count": 0,
                    "total_enrollment": 0,
                    "recruiting": 0,
                }
            condition_count[condition]["trial_count"] += 1
            condition_count[condition]["total_enrollment"] += trial["enrollment"]
            if "Recruiting" in trial["status"]:
                condition_count[condition]["recruiting"] += 1

        sorted_conditions = sorted(
            condition_count.values(),
            key=lambda x: x["recruiting"],
            reverse=True,
        )

        return sorted_conditions[:5]
