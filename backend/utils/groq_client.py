"""
Groq API Client Utility
Handles all interactions with Groq LLM API for generating AI-powered insights.
"""

import os
from typing import Optional
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()


class GroqClient:
    """
    Wrapper class for Groq API interactions.
    Provides methods to query the Groq LLM for analysis and summarization.
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "llama-3.1-8b-instant"):
        """
        Initialize Groq client.

        Args:
            api_key (str, optional): Groq API key. If None, reads from GROQ_API_KEY env var.
            model (str): Model to use. Default is llama-3.1-8b-instant.
        """
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError(
                "GROQ_API_KEY not found. Please set it in .env or pass it to __init__"
            )

        self.model = model
        self.client = Groq(api_key=self.api_key)

    def query(
        self,
        prompt: str,
        system_message: str = "You are a pharmaceutical research AI assistant. Provide accurate, evidence-based insights.",
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ) -> str:
        """
        Query Groq API with a prompt and return the response.

        Args:
            prompt (str): The user prompt/question.
            system_message (str): System context for the AI.
            temperature (float): Sampling temperature (0-1). Higher = more creative.
            max_tokens (int): Maximum tokens in response.

        Returns:
            str: The AI-generated response.
        """
        try:
            message = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt},
                ],
                temperature=temperature,
                max_tokens=max_tokens,
            )
            return message.choices[0].message.content
        except Exception as e:
            return f"Error querying Groq API: {str(e)}"

    def summarize(self, content: str, max_tokens: int = 512) -> str:
        """
        Summarize provided content using Groq.

        Args:
            content (str): Content to summarize.
            max_tokens (int): Maximum tokens in summary.

        Returns:
            str: Summarized content.
        """
        prompt = f"Please provide a concise summary of the following content:\n\n{content}"
        return self.query(
            prompt,
            system_message="You are a concise summarization assistant. Keep summaries brief and focused.",
            max_tokens=max_tokens,
        )

    def analyze_drug_potential(self, molecule_name: str, indication: str) -> str:
        """
        Analyze drug repurposing potential for a molecule.

        Args:
            molecule_name (str): Name of the molecule.
            indication (str): Target indication or disease.

        Returns:
            str: AI analysis of drug repurposing potential.
        """
        prompt = f"""
        Analyze the drug repurposing potential for {molecule_name} in treating {indication}.
        
        Consider:
        1. Therapeutic relevance
        2. Market opportunity
        3. Clinical feasibility
        4. Potential risks
        5. Similar successful repurposing examples
        
        Provide a structured analysis.
        """
        return self.query(
            prompt,
            system_message="You are a pharmaceutical research expert specializing in drug repurposing. Provide detailed, evidence-based analysis.",
            max_tokens=1024,
        )

    def generate_insights(self, data_dict: dict) -> str:
        """
        Generate insights from aggregated pharmaceutical data.

        Args:
            data_dict (dict): Dictionary containing market, trial, patent, and web intelligence data.

        Returns:
            str: AI-generated insights and recommendations.
        """
        prompt = f"""
        Based on the following pharmaceutical research data, generate key insights and recommendations:
        
        {str(data_dict)}
        
        Provide:
        1. Key opportunities
        2. Risk factors
        3. Market potential assessment
        4. Clinical viability
        5. Recommended next steps
        """
        response = self.query(
            prompt,
            system_message="You are a pharmaceutical intelligence analyst. Provide actionable, strategic insights.",
            max_tokens=1024,
        )
        return self._clean_markdown(response)

    def _clean_markdown(self, text: str) -> str:
        """
        Remove markdown formatting from text.
        
        Args:
            text (str): Text with markdown formatting.
            
        Returns:
            str: Text with markdown removed.
        """
        import re
        # Remove ** bold markers
        text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
        # Remove * italic markers
        text = re.sub(r'\*(.+?)\*', r'\1', text)
        # Remove _ italic/bold markers
        text = re.sub(r'_{1,2}(.+?)_{1,2}', r'\1', text)
        # Remove markdown headers
        text = re.sub(r'^#+\s+', '', text, flags=re.MULTILINE)
        # Remove markdown list markers
        text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
        # Remove markdown code blocks
        text = re.sub(r'```[\s\S]*?```', '', text)
        text = re.sub(r'`(.+?)`', r'\1', text)
        # Remove markdown links
        text = re.sub(r'\[(.+?)\]\(.+?\)', r'\1', text)
        # Clean extra whitespace
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()
