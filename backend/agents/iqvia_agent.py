"""
IQVIA Market Data Agent
Fetches mock market data for pharmaceuticals including market size, growth rates, and competitive landscape.
"""

from typing import Dict, List
from datetime import datetime


class IQVIAAgent:
    """
    Simulates IQVIA API for market intelligence data.
    In production, this would connect to actual IQVIA data services.
    """

    # Mock market data database
    MOCK_MARKET_DATA = {
        "aspirin": {
            "market_size_usd": 2.1e9,
            "market_size_units": 5.3e9,
            "growth_rate": 0.03,
            "therapeutic_area": "Cardiovascular",
            "top_competitors": [
                {"name": "Bayer Aspirin", "market_share": 0.35},
                {"name": "Generic Aspirin", "market_share": 0.50},
                {"name": "Ecotrin", "market_share": 0.15},
            ],
            "regions": {
                "North America": {"market_size": 1.1e9, "growth": 0.02},
                "Europe": {"market_size": 0.7e9, "growth": 0.01},
                "Asia": {"market_size": 0.3e9, "growth": 0.08},
            },
        },
        "metformin": {
            "market_size_usd": 1.8e9,
            "market_size_units": 8.2e9,
            "growth_rate": 0.05,
            "therapeutic_area": "Endocrinology",
            "top_competitors": [
                {"name": "Generic Metformin", "market_share": 0.75},
                {"name": "Glucophage", "market_share": 0.20},
                {"name": "Glumetza", "market_share": 0.05},
            ],
            "regions": {
                "North America": {"market_size": 0.9e9, "growth": 0.04},
                "Europe": {"market_size": 0.5e9, "growth": 0.03},
                "Asia": {"market_size": 0.4e9, "growth": 0.10},
            },
        },
        "doxycycline": {
            "market_size_usd": 0.6e9,
            "market_size_units": 3.1e9,
            "growth_rate": 0.02,
            "therapeutic_area": "Anti-Infective",
            "top_competitors": [
                {"name": "Generic Doxycycline", "market_share": 0.85},
                {"name": "Vibramycin", "market_share": 0.10},
                {"name": "Doryx", "market_share": 0.05},
            ],
            "regions": {
                "North America": {"market_size": 0.35e9, "growth": 0.01},
                "Europe": {"market_size": 0.15e9, "growth": 0.00},
                "Asia": {"market_size": 0.10e9, "growth": 0.05},
            },
        },
    }

    def query_market_data(self, molecule_name: str) -> Dict:
        """
        Query market data for a specific molecule.

        Args:
            molecule_name (str): Name of the molecule (case-insensitive).

        Returns:
            Dict: Market data including size, growth, competitors, and regions.
        """
        molecule_key = molecule_name.lower()

        if molecule_key in self.MOCK_MARKET_DATA:
            data = self.MOCK_MARKET_DATA[molecule_key].copy()
            data["molecule"] = molecule_name
            data["data_source"] = "IQVIA"
            data["query_date"] = datetime.now().isoformat()
            
            # Add additional fields
            data["competitors_count"] = len(data.get("top_competitors", []))
            data["market_trend"] = "Upward" if data.get("growth_rate", 0) > 0.04 else "Stable" if data.get("growth_rate", 0) > 0.01 else "Downward"
            data["therapeutic_sub_areas"] = ["Research Focus 1", "Research Focus 2", "Research Focus 3"]
            
            return data
        else:
            # Return plausible generic market data for unknown molecules
            return {
                "molecule": molecule_name,
                "market_size_usd": 5e8,
                "market_size_units": 2.5e9,
                "growth_rate": 0.04,
                "therapeutic_area": "Unknown",
                "competitors_count": 3,
                "market_trend": "Stable",
                "therapeutic_sub_areas": ["Research Focus 1", "Research Focus 2"],
                "top_competitors": [
                    {"name": "Competitor A", "market_share": 0.40},
                    {"name": "Competitor B", "market_share": 0.35},
                    {"name": "Competitor C", "market_share": 0.25},
                ],
                "regions": {
                    "North America": {"market_size": 0.3e9, "growth": 0.03},
                    "Europe": {"market_size": 0.15e9, "growth": 0.02},
                    "Asia": {"market_size": 0.05e9, "growth": 0.06},
                },
                "data_source": "IQVIA",
                "query_date": datetime.now().isoformat(),
                "note": "Generic data - molecule not in primary database",
            }

    def get_therapeutic_area_trends(self) -> List[Dict]:
        """
        Get trending therapeutic areas based on market growth.

        Returns:
            List[Dict]: Top therapeutic areas with market data.
        """
        therapeutic_areas = {}

        for molecule, data in self.MOCK_MARKET_DATA.items():
            area = data["therapeutic_area"]
            if area not in therapeutic_areas:
                therapeutic_areas[area] = {
                    "area": area,
                    "total_market_size": 0,
                    "avg_growth_rate": 0,
                    "molecule_count": 0,
                }
            therapeutic_areas[area]["total_market_size"] += data["market_size_usd"]
            therapeutic_areas[area]["avg_growth_rate"] += data["growth_rate"]
            therapeutic_areas[area]["molecule_count"] += 1

        # Calculate averages and sort by growth
        for area in therapeutic_areas.values():
            area["avg_growth_rate"] = area["avg_growth_rate"] / area["molecule_count"]

        sorted_areas = sorted(
            therapeutic_areas.values(),
            key=lambda x: x["avg_growth_rate"],
            reverse=True,
        )

        return sorted_areas[:5]  # Return top 5

    def get_regional_analysis(self, molecule_name: str) -> Dict:
        """
        Get regional market analysis for a molecule.

        Args:
            molecule_name (str): Name of the molecule.

        Returns:
            Dict: Regional market breakdown.
        """
        molecule_key = molecule_name.lower()

        if molecule_key in self.MOCK_MARKET_DATA:
            return self.MOCK_MARKET_DATA[molecule_key].get(
                "regions", {}
            )
        else:
            return {
                "North America": {"market_size": 0.3e9, "growth": 0.03},
                "Europe": {"market_size": 0.15e9, "growth": 0.02},
                "Asia": {"market_size": 0.05e9, "growth": 0.06},
            }
