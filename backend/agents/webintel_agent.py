"""
Web Intelligence Agent
Performs web searches and gathers scientific trends, publications, and market sentiment.
Simulates web crawling and trend analysis capabilities.
"""

from typing import Dict, List
from datetime import datetime, timedelta


class WebIntelAgent:
    """
    Simulates web intelligence gathering for pharmaceutical trends.
    In production, this would integrate with real web APIs and sentiment analysis.
    """

    # Mock trending topics and scientific insights
    MOCK_TRENDS = {
        "oncology": {
            "trend": "Rising",
            "mentions_per_week": 2500,
            "sentiment": "Positive",
            "key_focus": ["Immunotherapy", "CAR-T cells", "Personalized medicine"],
            "recent_publications": 450,
            "media_coverage": "High",
        },
        "cns": {
            "trend": "Moderately Rising",
            "mentions_per_week": 1800,
            "sentiment": "Mixed",
            "key_focus": ["Neurodegeneration", "Mental health", "Pain management"],
            "recent_publications": 320,
            "media_coverage": "Medium",
        },
        "respiratory": {
            "trend": "Stable",
            "mentions_per_week": 1200,
            "sentiment": "Positive",
            "key_focus": ["COPD", "Asthma", "COVID-19 sequelae"],
            "recent_publications": 280,
            "media_coverage": "Medium",
        },
        "cardiovascular": {
            "trend": "Declining",
            "mentions_per_week": 950,
            "sentiment": "Neutral",
            "key_focus": ["Heart failure", "Arrhythmias", "Hypertension"],
            "recent_publications": 210,
            "media_coverage": "Low",
        },
        "infectious_disease": {
            "trend": "Rising",
            "mentions_per_week": 1600,
            "sentiment": "Positive",
            "key_focus": ["Antibiotic resistance", "Viral infections", "Vaccines"],
            "recent_publications": 380,
            "media_coverage": "High",
        },
    }

    # Mock publications database
    MOCK_PUBLICATIONS = {
        "aspirin": [
            {
                "title": "Aspirin in Primary Prevention of Cardiovascular Disease",
                "journal": "Circulation Research",
                "year": 2023,
                "citations": 250,
                "relevance": 0.95,
            },
            {
                "title": "Novel Uses of Aspirin: A Systematic Review",
                "journal": "Pharmaceutical Reviews",
                "year": 2024,
                "citations": 45,
                "relevance": 0.88,
            },
        ],
        "metformin": [
            {
                "title": "Metformin and Cancer Prevention: An Updated Meta-Analysis",
                "journal": "Diabetes Research and Clinical Practice",
                "year": 2024,
                "citations": 180,
                "relevance": 0.92,
            },
            {
                "title": "Metformin Beyond Diabetes: Emerging Applications",
                "journal": "Nature Reviews Drug Discovery",
                "year": 2023,
                "citations": 320,
                "relevance": 0.90,
            },
        ],
    }

    def search_trends(self, keyword: str) -> Dict:
        """
        Search for trending topics and scientific trends related to keyword.

        Args:
            keyword (str): Keyword to search (therapeutic area or molecule).

        Returns:
            Dict: Trending data including sentiment and publication count.
        """
        keyword_lower = keyword.lower()

        if keyword_lower in self.MOCK_TRENDS:
            trend_data = self.MOCK_TRENDS[keyword_lower].copy()
            trend_data["keyword"] = keyword
        else:
            # Generate plausible trend data for unknown keywords
            trend_data = {
                "keyword": keyword,
                "trend": "Emerging",
                "mentions_per_week": 600,
                "sentiment": "Positive",
                "key_focus": ["Innovation", "Clinical efficacy", "Safety"],
                "recent_publications": 150,
                "media_coverage": "Low",
            }

        trend_data["data_source"] = "Web Intelligence"
        trend_data["query_date"] = datetime.now().isoformat()

        return trend_data

    def search_publications(self, molecule_name: str, limit: int = 10) -> Dict:
        """
        Search for recent scientific publications about a molecule.

        Args:
            molecule_name (str): Name of the molecule.
            limit (int): Maximum number of publications to return.

        Returns:
            Dict: List of relevant publications.
        """
        molecule_key = molecule_name.lower()

        if molecule_key in self.MOCK_PUBLICATIONS:
            publications = self.MOCK_PUBLICATIONS[molecule_key]
        else:
            # Generate plausible publications
            publications = [
                {
                    "title": f"Novel Therapeutic Applications of {molecule_name}",
                    "journal": "Journal of Medicinal Chemistry",
                    "year": datetime.now().year,
                    "citations": 50,
                    "relevance": 0.85,
                },
                {
                    "title": f"Clinical Safety Profile of {molecule_name}: A Review",
                    "journal": "Drug Safety",
                    "year": datetime.now().year - 1,
                    "citations": 30,
                    "relevance": 0.80,
                },
            ]

        # Sort by citations (relevance proxy)
        sorted_pubs = sorted(publications, key=lambda x: x["citations"], reverse=True)

        # Calculate sentiment from publications
        avg_relevance = sum(p.get("relevance", 0) for p in sorted_pubs) / len(sorted_pubs) if sorted_pubs else 0
        scientific_sentiment = "Positive" if avg_relevance > 0.85 else "Mixed" if avg_relevance > 0.75 else "Neutral"
        
        # Calculate innovation index
        innovation_index = min(0.95, len(sorted_pubs) * 0.15 + avg_relevance)

        return {
            "molecule": molecule_name,
            "total_publications_found": len(sorted_pubs),
            "publications": sorted_pubs[:limit],
            "recent_publications_count": len(sorted_pubs),
            "innovation_index": innovation_index,
            "scientific_sentiment": scientific_sentiment,
            "data_source": "Scientific Literature",
            "query_date": datetime.now().isoformat(),
        }

    def get_scientific_sentiment(self, topic: str) -> Dict:
        """
        Get sentiment analysis for a scientific topic.

        Args:
            topic (str): Topic to analyze sentiment for.

        Returns:
            Dict: Sentiment analysis including positive/negative/neutral breakdown.
        """
        topic_lower = topic.lower()

        if topic_lower in self.MOCK_TRENDS:
            base_sentiment = self.MOCK_TRENDS[topic_lower]["sentiment"]
        else:
            base_sentiment = "Neutral"

        sentiment_map = {
            "Positive": {"positive": 65, "neutral": 25, "negative": 10},
            "Negative": {"positive": 15, "neutral": 25, "negative": 60},
            "Neutral": {"positive": 35, "neutral": 50, "negative": 15},
            "Mixed": {"positive": 40, "neutral": 40, "negative": 20},
        }

        percentages = sentiment_map.get(base_sentiment, sentiment_map["Neutral"])

        return {
            "topic": topic,
            "overall_sentiment": base_sentiment,
            "sentiment_breakdown": percentages,
            "confidence_score": 0.75,
            "sample_positive_mentions": 150,
            "sample_negative_mentions": 30,
            "data_source": "Scientific Sentiment Analysis",
            "query_date": datetime.now().isoformat(),
        }

    def get_trending_therapeutic_areas(self) -> List[Dict]:
        """
        Get currently trending therapeutic areas.

        Returns:
            List[Dict]: Top trending therapeutic areas with details.
        """
        trending_areas = []

        for area, data in self.MOCK_TRENDS.items():
            trending_areas.append(
                {
                    "therapeutic_area": area.replace("_", " ").title(),
                    "trend_direction": data["trend"],
                    "mentions_per_week": data["mentions_per_week"],
                    "sentiment": data["sentiment"],
                    "recent_publications": data["recent_publications"],
                    "key_focus_areas": data["key_focus"],
                    "media_coverage": data["media_coverage"],
                }
            )

        # Sort by mentions
        sorted_areas = sorted(
            trending_areas,
            key=lambda x: x["mentions_per_week"],
            reverse=True,
        )

        return sorted_areas[:5]

    def get_innovation_index(self, therapeutic_area: str) -> Dict:
        """
        Get innovation index for a therapeutic area (R&D intensity).

        Args:
            therapeutic_area (str): Name of therapeutic area.

        Returns:
            Dict: Innovation metrics.
        """
        area_lower = therapeutic_area.lower().replace(" ", "_")

        if area_lower in self.MOCK_TRENDS:
            publications = self.MOCK_TRENDS[area_lower]["recent_publications"]
            mentions = self.MOCK_TRENDS[area_lower]["mentions_per_week"]
        else:
            publications = 150
            mentions = 800

        # Innovation index based on publications and mentions
        innovation_index = (publications * 0.6 + mentions * 0.0001) / 100

        return {
            "therapeutic_area": therapeutic_area,
            "innovation_index": round(innovation_index, 2),
            "publications_last_year": publications,
            "web_mentions_per_week": mentions,
            "interpretation": (
                "High Innovation" if innovation_index > 5 else
                "Moderate Innovation" if innovation_index > 3 else
                "Emerging Innovation"
            ),
        }
