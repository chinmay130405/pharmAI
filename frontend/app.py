"""
Streamlit Frontend for Pharmaceutical Agent AI Platform
Interactive dashboard for drug repurposing research.
"""

import streamlit as st
import requests
import json
import pandas as pd
from datetime import datetime
from typing import Optional

# ============================================================================
# Configuration
# ============================================================================

st.set_page_config(
    page_title="Pharma Agent AI",
    page_icon="💊",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Configure backend API
BACKEND_URL = "http://localhost:8000"

# Custom CSS styling
st.markdown(
    """
    <style>
    :root {
        --primary-color: #1f4788;
        --secondary-color: #2e5c8a;
        --accent-color: #4CAF50;
    }
    
    .metric-card {
        background: linear-gradient(135deg, #1f4788 0%, #2e5c8a 100%);
        padding: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .insight-box {
        background: #f0f4f8;
        padding: 15px;
        border-left: 4px solid #1f4788;
        border-radius: 5px;
        margin: 10px 0;
    }
    
    .trending-badge {
        background: #4CAF50;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# ============================================================================
# Helper Functions
# ============================================================================


def check_backend_health():
    """Check if backend is running."""
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=2)
        return response.status_code == 200
    except:
        return False


def query_molecule_api(molecule_name: str) -> Optional[dict]:
    """Call backend API to analyze a molecule."""
    try:
        with st.spinner(f"🔬 Analyzing {molecule_name}..."):
            response = requests.post(
                f"{BACKEND_URL}/query_molecule",
                json={"molecule_name": molecule_name, "include_insights": True},
                timeout=30,
            )
            if response.status_code == 200:
                return response.json()
            else:
                st.error(f"Backend error: {response.status_code}")
                return None
    except requests.exceptions.ConnectionError:
        st.error("❌ Cannot connect to backend. Please ensure FastAPI is running on http://localhost:8000")
        return None
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return None


def get_trends_api() -> Optional[dict]:
    """Get trending therapeutic areas and molecules."""
    try:
        with st.spinner("📈 Fetching trends..."):
            response = requests.get(f"{BACKEND_URL}/get_trends", timeout=10)
            if response.status_code == 200:
                return response.json()
            else:
                return None
    except:
        return None


def download_report_json(molecule_name: str):
    """Download report as JSON."""
    try:
        with st.spinner("📄 Generating JSON report..."):
            response = requests.post(
                f"{BACKEND_URL}/generate_report",
                json={"molecule_name": molecule_name},
                timeout=30,
            )
            if response.status_code == 200:
                return response.json()
            else:
                st.error("Error generating report")
                return None
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return None


def get_saved_reports_api() -> Optional[dict]:
    """Get list of saved reports."""
    try:
        response = requests.get(f"{BACKEND_URL}/saved_reports", timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except:
        return None


# ============================================================================
# Main Sidebar Navigation
# ============================================================================

st.sidebar.markdown("# 🧬 Pharma Agent AI")
st.sidebar.markdown("---")

page = st.sidebar.radio(
    "Navigate",
    ["🏠 Home", "📈 Trends", "📊 Reports"],
    key="navigation",
)

# Health check in sidebar
if check_backend_health():
    st.sidebar.success("✅ Backend Connected")
else:
    st.sidebar.error("❌ Backend Offline")
    st.sidebar.info("Start backend with: `python backend/main.py`")

st.sidebar.markdown("---")
st.sidebar.markdown("### 📚 About")
st.sidebar.markdown(
    """
    **Pharma Agent AI** uses intelligent agents to identify
    drug repurposing opportunities by analyzing:
    
    - 💰 Market Intelligence (IQVIA)
    - 🏥 Clinical Trials Data
    - 📜 Patent Landscapes
    - 🌐 Scientific Trends
    - 🤖 AI-Powered Insights (Groq)
    """
)

# ============================================================================
# PAGE 1: HOME (MOLECULE ANALYSIS)
# ============================================================================

if page == "🏠 Home":
    st.markdown("# 🏠 Molecule Intelligence Query")
    st.markdown(
        "Enter a drug name or molecule to get comprehensive pharmaceutical intelligence."
    )

    col1, col2 = st.columns([3, 1])

    with col1:
        molecule_input = st.text_input(
            "Enter molecule name",
            placeholder="e.g., aspirin, metformin, doxycycline",
            key="molecule_query",
        )

    with col2:
        search_button = st.button("🔍 Analyze", use_container_width=True)

    st.markdown("---")

    # Quick suggestions
    st.markdown("### 💡 Try These Examples:")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("🩺 Aspirin"):
            molecule_input = "aspirin"
            search_button = True

    with col2:
        if st.button("💊 Metformin"):
            molecule_input = "metformin"
            search_button = True

    with col3:
        if st.button("🧬 Doxycycline"):
            molecule_input = "doxycycline"
            search_button = True

    # Analysis Results
    if search_button and molecule_input:
        analysis_result = query_molecule_api(molecule_input)

        if analysis_result:
            st.success("✅ Analysis Complete!")

            # Display tabs for different data sections
            tab1, tab2, tab3, tab4, tab5 = st.tabs(
                ["📊 Market", "🏥 Trials", "📜 Patents", "🌐 Web", "💡 Insights"]
            )

            # Market Data Tab
            with tab1:
                st.markdown("### Market Intelligence")
                market = analysis_result.get("market_data", {})

                col1, col2, col3, col4 = st.columns(4)

                with col1:
                    st.metric(
                        "Market Size",
                        f"${market.get('market_size_usd', 0)/1e9:.2f}B",
                    )

                with col2:
                    growth = market.get("growth_rate", 0) * 100
                    st.metric("Growth Rate", f"{growth:.1f}%")

                with col3:
                    st.metric(
                        "Therapeutic Area",
                        market.get("therapeutic_area", "N/A"),
                    )

                with col4:
                    st.metric("Data Source", "IQVIA")

                # Regional breakdown
                if "regions" in market:
                    st.markdown("#### Regional Breakdown")
                    regions_data = market["regions"]
                    regions_df = pd.DataFrame(
                        [
                            {
                                "Region": region,
                                "Market Size ($B)": data["market_size"] / 1e9,
                                "Growth (%)": data["growth"] * 100,
                            }
                            for region, data in regions_data.items()
                        ]
                    )
                    st.dataframe(regions_df, use_container_width=True)

                    # Chart
                    st.bar_chart(
                        regions_df.set_index("Region")["Market Size ($B)"]
                    )

                # Competitors
                if "top_competitors" in market:
                    st.markdown("#### Top Competitors")
                    competitors_df = pd.DataFrame(market["top_competitors"])
                    st.dataframe(competitors_df, use_container_width=True)

            # Clinical Trials Tab
            with tab2:
                st.markdown("### Clinical Trials")
                clinical = analysis_result.get("clinical_data", {})

                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric("Total Trials", clinical.get("trials_count", 0))

                with col2:
                    total_enrollment = 0
                    trials = clinical.get("trials", [])
                    for trial in trials:
                        total_enrollment += trial.get("enrollment", 0)
                    st.metric("Total Enrollment", f"{total_enrollment:,}")

                with col3:
                    st.metric("Data Source", "ClinicalTrials.gov")

                # Trials Table
                if "trials" in clinical:
                    st.markdown("#### Active Trials")
                    trials_df = pd.DataFrame(clinical["trials"])
                    trials_display = trials_df[
                        ["trial_id", "title", "status", "phase", "enrollment"]
                    ]
                    st.dataframe(trials_display, use_container_width=True)

            # Patents Tab
            with tab3:
                st.markdown("### Patent Landscape")
                patents = analysis_result.get("patent_data", {})

                col1, col2, col3, col4 = st.columns(4)

                with col1:
                    st.metric("Total Patents", patents.get("total_patents", 0))

                with col2:
                    st.metric("Active Patents", patents.get("active_patents", 0))

                with col3:
                    st.metric("Expired Patents", patents.get("expired_patents", 0))

                with col4:
                    st.metric("Data Source", "Patent DB")

                # Patents Table
                if "patents" in patents:
                    st.markdown("#### Patent Portfolio")
                    patents_df = pd.DataFrame(patents["patents"])
                    patents_display = patents_df[
                        ["patent_id", "title", "status", "expiration_date"]
                    ]
                    st.dataframe(patents_display, use_container_width=True)

            # Web Intelligence Tab
            with tab4:
                st.markdown("### Scientific Publications")
                web = analysis_result.get("web_data", {})

                col1, col2 = st.columns(2)

                with col1:
                    st.metric(
                        "Publications Found",
                        web.get("total_publications_found", 0),
                    )

                with col2:
                    st.metric("Data Source", "Scientific Literature")

                # Publications Table
                if "publications" in web:
                    st.markdown("#### Recent Publications")
                    pubs_df = pd.DataFrame(web["publications"])
                    st.dataframe(pubs_df, use_container_width=True)

            # AI Insights Tab
            with tab5:
                st.markdown("### 🤖 AI-Powered Insights")

                insights = analysis_result.get("ai_insights", "")
                st.markdown(
                    f"""
                    <div class="insight-box">
                    {insights}
                    </div>
                    """,
                    unsafe_allow_html=True,
                )

                st.markdown("### 📋 Recommendations")
                recommendations = analysis_result.get("recommendations", "")
                st.markdown(
                    f"""
                    <div class="insight-box">
                    {recommendations}
                    </div>
                    """,
                    unsafe_allow_html=True,
                )

            # Download Report
            st.markdown("---")
            st.markdown("### 📥 Download Report")

            col1, col2 = st.columns(2)

            with col1:
                json_report = download_report_json(molecule_input)
                if json_report:
                    st.download_button(
                        label="📄 Download JSON Report",
                        data=json.dumps(json_report, indent=2),
                        file_name=f"report_{molecule_input}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                        mime="application/json",
                    )

            with col2:
                st.info(
                    "💡 PDF reports can be generated from the Reports page"
                )

# ============================================================================
# PAGE 2: TRENDS
# ============================================================================

elif page == "📈 Trends":
    st.markdown("# 📈 Pharmaceutical Trends & Opportunities")
    st.markdown(
        "Discover currently trending therapeutic areas and emerging drug opportunities."
    )

    if st.button("🔄 Refresh Trends", use_container_width=True):
        st.rerun()

    trends_data = get_trends_api()

    if trends_data:
        # Create tabs for different trend categories
        tab1, tab2, tab3 = st.tabs(
            ["💰 Market Trends", "🏥 Clinical Trends", "🌐 Web Trends"]
        )

        # Market Trends
        with tab1:
            st.markdown("### Top Therapeutic Areas by Market")
            market_trends = trends_data.get("market_trends", [])

            if market_trends:
                for idx, trend in enumerate(market_trends[:5], 1):
                    col1, col2, col3 = st.columns([2, 1, 1])

                    with col1:
                        st.markdown(f"#### {idx}. {trend.get('area', 'N/A')}")
                        st.write(
                            f"**Molecules:** {trend.get('molecule_count', 0)}"
                        )

                    with col2:
                        st.metric(
                            "Market Size",
                            f"${trend.get('total_market_size', 0)/1e9:.1f}B",
                        )

                    with col3:
                        growth = trend.get("avg_growth_rate", 0) * 100
                        st.metric("Growth", f"{growth:.1f}%")

                    st.markdown("---")

        # Clinical Trends
        with tab2:
            st.markdown("### Top Clinical Conditions")
            clinical_trends = trends_data.get("clinical_trends", [])

            if clinical_trends:
                for idx, trend in enumerate(clinical_trends[:5], 1):
                    col1, col2, col3 = st.columns([2, 1, 1])

                    with col1:
                        st.markdown(f"#### {idx}. {trend.get('condition', 'N/A')}")

                    with col2:
                        st.metric(
                            "Trials",
                            f"{trend.get('trial_count', 0)}",
                        )

                    with col3:
                        st.metric(
                            "Recruiting",
                            f"{trend.get('recruiting', 0)}",
                        )

                    enrollment = trend.get("total_enrollment", 0)
                    st.caption(f"Total Enrollment: {enrollment:,}")
                    st.markdown("---")

        # Web Trends
        with tab3:
            st.markdown("### Trending on the Web & Publications")
            web_trends = trends_data.get("web_trends", [])

            if web_trends:
                for idx, trend in enumerate(web_trends[:5], 1):
                    col1, col2 = st.columns([2, 1])

                    with col1:
                        area = trend.get("therapeutic_area", "N/A")
                        st.markdown(f"#### {idx}. {area}")
                        st.write(
                            f"**Trend:** {trend.get('trend_direction', 'Stable')}"
                        )
                        st.write(
                            f"**Sentiment:** {trend.get('sentiment', 'Neutral')}"
                        )
                        focus = trend.get("key_focus_areas", [])
                        if focus:
                            st.write(f"**Focus:** {', '.join(focus)}")

                    with col2:
                        st.metric(
                            "Publications",
                            trend.get("recent_publications", 0),
                        )

                    st.markdown("---")

        # AI Summary
        if "ai_summary" in trends_data:
            st.markdown("---")
            st.markdown("### 🤖 AI Analysis Summary")
            st.markdown(
                f"""
                <div class="insight-box">
                {trends_data.get('ai_summary', '')}
                </div>
                """,
                unsafe_allow_html=True,
            )

    else:
        st.warning("Unable to fetch trends. Please check backend connection.")

# ============================================================================
# PAGE 3: REPORTS
# ============================================================================

elif page == "📊 Reports":
    st.markdown("# 📊 Saved Reports")
    st.markdown("View and download all generated pharmaceutical research reports.")

    reports = get_saved_reports_api()

    if reports and reports.get("total_reports", 0) > 0:
        st.success(f"✅ {reports.get('total_reports', 0)} reports available")

        # Display reports as a table
        reports_list = reports.get("reports", [])

        if reports_list:
            reports_df = pd.DataFrame(reports_list)
            st.dataframe(reports_df, use_container_width=True)

            st.markdown("---")
            st.markdown("### Download Reports")

            for report in reports_list:
                col1, col2 = st.columns([3, 1])

                with col1:
                    st.markdown(
                        f"**{report.get('molecule', 'Unknown')}** - {report.get('generated_date', 'N/A')}"
                    )

                with col2:
                    if st.button(
                        "📥 Download",
                        key=f"download_{report.get('report_id', '')}",
                    ):
                        st.info(
                            "Reports are generated on demand. Use Home page to generate new reports."
                        )

    else:
        st.info(
            "📭 No saved reports yet. Generate one by analyzing a molecule on the Home page!"
        )

        st.markdown("### 📋 How to Generate Reports:")
        st.markdown(
            """
            1. Go to the **Home** page
            2. Enter a molecule name (e.g., aspirin, metformin)
            3. Click **Analyze**
            4. Click **Download JSON Report** at the bottom
            5. Generated reports will appear here
            """
        )

# ============================================================================
# Footer
# ============================================================================

st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666; font-size: 12px;'>
    🧬 Pharma Agent AI Platform | Powered by FastAPI, Groq AI, and Streamlit
    </div>
    """,
    unsafe_allow_html=True,
)
