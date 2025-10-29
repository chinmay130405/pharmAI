"""
Master Agent
Orchestrates all worker agents (IQVIA, Clinical, Patent, WebIntel).
Aggregates their outputs and generates unified summaries using Groq AI.
"""

from typing import Dict
from datetime import datetime

from .iqvia_agent import IQVIAAgent
from .clinical_agent import ClinicalAgent
from .patent_agent import PatentAgent
from .webintel_agent import WebIntelAgent
from .report_agent import ReportAgent
from utils.groq_client import GroqClient


class MasterAgent:
    """
    Orchestrates all pharmaceutical research agents.
    Coordinates data gathering, aggregation, and AI-powered analysis.
    """

    def __init__(self, groq_api_key: str = None):
        """
        Initialize Master Agent with all worker agents.

        Args:
            groq_api_key (str, optional): Groq API key. If None, reads from environment.
        """
        self.iqvia_agent = IQVIAAgent()
        self.clinical_agent = ClinicalAgent()
        self.patent_agent = PatentAgent()
        self.webintel_agent = WebIntelAgent()
        self.report_agent = ReportAgent()

        try:
            self.groq_client = GroqClient(api_key=groq_api_key)
        except ValueError:
            # If Groq API key is not available, create a dummy client that won't be used
            self.groq_client = None

    def query_molecule(self, molecule_name: str) -> Dict:
        """
        Execute comprehensive analysis for a molecule using all agents.

        Args:
            molecule_name (str): Name of the molecule to analyze.

        Returns:
            Dict: Aggregated results from all agents plus AI insights.
        """
        print(f"🔬 Master Agent: Starting analysis for {molecule_name}...")

        # Gather data from all agents
        print("📊 Gathering market data...")
        market_data = self.iqvia_agent.query_market_data(molecule_name)

        print("🏥 Gathering clinical trial data...")
        clinical_data = self.clinical_agent.query_trials(molecule_name)

        print("📜 Gathering patent data...")
        patent_data = self.patent_agent.query_patents(molecule_name)

        print("🌐 Gathering web intelligence...")
        web_data = self.webintel_agent.search_publications(molecule_name)

        # Aggregate all data
        aggregated_data = {
            "molecule": molecule_name,
            "timestamp": datetime.now().isoformat(),
            "market_data": market_data,
            "clinical_data": clinical_data,
            "patent_data": patent_data,
            "web_data": web_data,
        }

        # Generate AI insights using Groq
        print("🤖 Generating AI insights...")
        if self.groq_client:
            ai_insights = self._generate_ai_insights(aggregated_data)
            ai_recommendations = self._generate_recommendations(aggregated_data)
        else:
            ai_insights = "Groq API not configured. Please set GROQ_API_KEY in .env"
            ai_recommendations = "Unable to generate recommendations without Groq API."

        aggregated_data["ai_insights"] = ai_insights
        aggregated_data["recommendations"] = ai_recommendations

        print("✅ Master Agent: Analysis complete!")

        return aggregated_data

    def _generate_ai_insights(self, aggregated_data: Dict) -> str:
        """
        Generate AI-powered insights from aggregated data.

        Args:
            aggregated_data (Dict): All aggregated pharmaceutical data.

        Returns:
            str: AI-generated insights.
        """
        try:
            # Prepare summary for Groq
            summary = f"""
            Molecule: {aggregated_data['molecule']}
            
            Market Data:
            - Market Size: ${aggregated_data['market_data'].get('market_size_usd', 'N/A'):,.0f}
            - Growth Rate: {aggregated_data['market_data'].get('growth_rate', 0) * 100:.1f}%
            - Therapeutic Area: {aggregated_data['market_data'].get('therapeutic_area', 'N/A')}
            
            Clinical Development:
            - Active Trials: {aggregated_data['clinical_data'].get('trials_count', 0)}
            - Total Enrollment: {aggregated_data['clinical_data'].get('total_enrollment', 0) if 'trials_count' in aggregated_data['clinical_data'] else 'N/A'}
            
            Patent Landscape:
            - Total Patents: {aggregated_data['patent_data'].get('total_patents', 0)}
            - Active Patents: {aggregated_data['patent_data'].get('active_patents', 0)}
            
            Publications:
            - Recent Publications: {aggregated_data['web_data'].get('total_publications_found', 0)}
            """

            insights = self.groq_client.generate_insights({"data": summary})
            return insights
        except Exception as e:
            return f"Error generating insights: {str(e)}"

    def _generate_recommendations(self, aggregated_data: Dict) -> str:
        """
        Generate strategic recommendations from analysis.

        Args:
            aggregated_data (Dict): All aggregated pharmaceutical data.

        Returns:
            str: Strategic recommendations.
        """
        try:
            recommendation_prompt = f"""
            Based on the pharmaceutical research analysis for {aggregated_data['molecule']}, 
            provide strategic recommendations for drug repurposing opportunities considering:
            
            1. Market attractiveness (size and growth)
            2. Clinical development status (ongoing trials)
            3. Patent landscape and freedom-to-operate
            4. Scientific trends and publication activity
            
            Focus on actionable next steps for R&D teams.
            """

            recommendations = self.groq_client.query(
                recommendation_prompt,
                system_message="You are a pharmaceutical strategy consultant. Provide actionable recommendations.",
                max_tokens=800,
            )
            return self.groq_client._clean_markdown(recommendations)
        except Exception as e:
            return f"Error generating recommendations: {str(e)}"

    def get_trends(self) -> Dict:
        """
        Get trending therapeutic areas and molecules.

        Returns:
            Dict: Trending opportunities with AI analysis.
        """
        print("📈 Master Agent: Analyzing trends...")

        # Get trending data from various agents
        market_trends = self.iqvia_agent.get_therapeutic_area_trends()
        clinical_trends = self.clinical_agent.get_trending_conditions()
        web_trends = self.webintel_agent.get_trending_therapeutic_areas()

        # Transform data for frontend
        trending_therapeutic_areas = []
        for trend in market_trends:
            trending_therapeutic_areas.append({
                "area": trend.get("area", "Unknown"),
                "description": f"Market Size: ${trend.get('total_market_size', 0):,.0f}, Molecules: {trend.get('molecule_count', 0)}",
                "growth": trend.get("avg_growth_rate", 0),
            })

        # Transform clinical trends
        trending_conditions = []
        for condition in clinical_trends:
            trending_conditions.append({
                "condition": condition.get("condition", "Unknown"),
                "description": f"{condition.get('trial_count', 0)} active trials",
                "trials_count": condition.get("trial_count", 0),
                "interest_trend": 0.85 if condition.get("recruiting", 0) > 0 else 0.50,
            })

        # Transform web trends
        web_trends_formatted = {
            "publication_growth": 0.25,  # 25% growth
            "avg_sentiment": 0.72,  # 72/100
        }

        # Prepare trends data
        trends_data = {
            "timestamp": datetime.now().isoformat(),
            "trending_therapeutic_areas": trending_therapeutic_areas,
            "trending_conditions": trending_conditions,
            "web_trends": web_trends_formatted,
            "market_insights": "The pharmaceutical market is experiencing significant growth in oncology and infectious disease areas, driven by increased R&D investment and rising patient populations.",
        }

        # Generate AI summary
        if self.groq_client:
            try:
                trend_summary = self.groq_client.query(
                    f"Summarize the key pharmaceutical trends based on: {str(trends_data)}. Focus on drug repurposing opportunities.",
                    system_message="You are a pharmaceutical trends analyst.",
                    max_tokens=500,
                )
                trends_data["ai_summary"] = self.groq_client._clean_markdown(trend_summary)
            except Exception as e:
                trends_data["ai_summary"] = f"Unable to generate summary: {str(e)}"

        return trends_data

    def generate_report(self, molecule_name: str, aggregated_data: Dict, format: str = "json") -> any:
        """
        Generate a report from analysis results.

        Args:
            molecule_name (str): Name of the molecule.
            aggregated_data (Dict): Aggregated analysis data.
            format (str): Report format ('json' or 'pdf').

        Returns:
            str or BytesIO: Report in requested format.
        """
        print(f"📝 Master Agent: Generating {format.upper()} report...")

        if format.lower() == "json":
            return self.report_agent.generate_json_report(aggregated_data, molecule_name)
        elif format.lower() == "pdf":
            return self.report_agent.generate_pdf_report(aggregated_data, molecule_name)
        else:
            raise ValueError(f"Unsupported report format: {format}. Use 'json' or 'pdf'.")

    def batch_analyze(self, molecule_list: list) -> Dict:
        """
        Analyze multiple molecules in batch.

        Args:
            molecule_list (list): List of molecule names.

        Returns:
            Dict: Analysis results for all molecules.
        """
        print(f"⚙️  Master Agent: Starting batch analysis for {len(molecule_list)} molecules...")

        batch_results = {
            "timestamp": datetime.now().isoformat(),
            "molecules_analyzed": len(molecule_list),
            "results": {},
        }

        for molecule in molecule_list:
            try:
                result = self.query_molecule(molecule)
                batch_results["results"][molecule] = result
            except Exception as e:
                batch_results["results"][molecule] = {"error": str(e)}

        print("✅ Master Agent: Batch analysis complete!")
        return batch_results
