import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Complete Creator Research Pvt Ltd Knowledge Base
COMPANY_INFO = """
CREATOR RESEARCH PVT LTD - COMPANY INFORMATION

=== OVERVIEW ===
Creator Research Pvt Ltd is a PhD Research Company with 10+ years of experience. We are a team of experienced and dedicated professionals who provide quality research services to PhD students and academic researchers.

=== VISION ===
To become a global leader in PhD research services. We aim to provide innovative and practical research solutions that meet our clients' needs and contribute to advancing knowledge in various fields.

=== MISSION ===
To provide high-quality research services that help our clients achieve their academic and research goals. We are committed to providing personalised and tailored solutions to meet each client's unique needs. Our team is dedicated to delivering timely and accurate results that meet the highest standards of academic research.

=== SERVICES ===

1. THESIS WRITING
   - Complete PhD thesis writing support
   - Valuable tips and guidance throughout the research process
   - Dedicated support for empirical data-based studies
   - Methods for collecting and analyzing data

2. DATA ANALYTICS
   - Data collection and lab experiments
   - Quantitative studies support
   - Statistical analysis
   - SPSS statistics help
   - Empirical research methods

3. ARTICLE WRITING
   - Research paper writing for publication
   - Establishing expertise in your field
   - Sharing research with academic community
   - Professional academic writing support

4. CONFERENCE & SEMINAR
   - Conference presentation support
   - Networking opportunities
   - Feedback on research work
   - Latest research trends and insights

5. PLAGIARISM CHECKING
   - Comprehensive plagiarism detection
   - Ensuring 100% originality
   - Academic integrity protection
   - Avoiding academic sanctions

6. PhD TOPIC SELECTION
   - Guidance on selecting appropriate research topics
   - Field-specific expertise

7. RESEARCH PROPOSAL WRITING
   - Professional proposal development
   - Academic standard compliance

8. THESIS REVIEW AND CORRECTIONS
   - Expert review services
   - Detailed corrections and improvements

9. THESIS EDITING AND PROOFREADING
   - Professional editing services
   - Quality assurance

10. RESEARCH PAPER PUBLICATION
    - Publication support and guidance
    - Journal selection assistance

=== IT SOLUTIONS ===
- Cyber Security
- Data Analytics
- Web Development
- Apps Development
- Educational Projects

=== WHY CHOOSE US ===
✓ Best in PhD Research
✓ Award Winning Company
✓ Professional Staff with PhD holders, academic writers, statisticians, and editors
✓ 24/7 Support
✓ Security and Confidentiality
✓ 100% Originality
✓ Satisfaction Guarantee
✓ Fair Prices
✓ 10+ Years of Experience

=== ACHIEVEMENTS ===
- 12,345+ Happy Clients
- 12,345+ Projects Done
- 12,345+ Awards Won

=== OUR TEAM ===
Highly qualified and experienced professionals including:
- PhD holders
- Academic writers
- Statisticians
- Editors
Expert in wide range of fields, committed to delivering high-quality work and exceptional customer service.

=== CONTACT INFORMATION ===
Address: 73 Pannalal Nagar, Ch.Sambhaji Nagar, India
Email: info@creatorresearch.com
Phone: +91 9545415111
Support: 24 hours telephone support
Response Time: Reply within 24 hours

=== HOW IT WORKS ===
Our professionals help you through every step of your PhD journey, from topic selection to final publication.

=== WORK-LIFE BALANCE ===
We understand the challenges of PhD journey and provide support for maintaining work-life balance during research.

=== PhD ENTRANCE TEST ===
We provide guidance and support for PhD entrance examinations.
"""

def creator_research_chat(message: str, conversation_history: list = None):
    """
    Official chatbot for Creator Research Pvt Ltd.
    
    Args:
        message: User's question
        conversation_history: Previous messages for context
    
    Returns:
        Assistant's response
    """
    if conversation_history is None:
        conversation_history = []
    
    messages = [
        {
            "role": "system",
            "content": f"""You are the official AI assistant for Creator Research Pvt Ltd, a PhD Research Company with 10+ years of experience.

STRICT GUIDELINES:
1. ONLY answer questions about Creator Research Pvt Ltd - services, research solutions, PhD support, pricing, contact information, team, achievements, and company details.
2. If asked about ANY other topic (weather, news, other companies, general knowledge, recipes, etc.), politely decline and redirect to company services.
3. Use ONLY the company information provided below. Do not invent information.
4. If specific information is not available, acknowledge it and provide the contact number (+91 9545415111) or email (info@creatorresearch.com).
5. Be professional, helpful, and empathetic - understand that PhD students may be stressed.
6. Emphasize key benefits: 24/7 support, 100% originality, confidentiality, and 10+ years experience.
7. Always mention relevant contact information when appropriate.

{COMPANY_INFO}

Remember: You represent Creator Research Pvt Ltd. Focus exclusively on helping PhD students and researchers with their academic needs."""
        }
    ]
    
    messages.extend(conversation_history)
    messages.append({"role": "user", "content": message})
    
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages,
        temperature=0.3,
        max_tokens=1024,
    )
    
    return completion.choices[0].message.content


def chat_session():
    """Interactive chat session with conversation history."""
    print("=" * 70)
    print("    CREATOR RESEARCH PVT LTD - AI ASSISTANT")
    print("    PhD Research Company with 10+ Years Experience")
    print("=" * 70)
    print("Ask me about our PhD research services, thesis writing, data analytics,")
    print("plagiarism checking, and more! Type 'exit' to end.\n")
    
    conversation_history = []
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
            print("\n" + "=" * 70)
            print("Thank you for contacting Creator Research Pvt Ltd!")
            print("Contact us: +91 9545415111 | info@creatorresearch.com")
            print("We're available 24/7 to help with your PhD research needs!")
            print("=" * 70)
            break
        
        if not user_input:
            continue
        
        try:
            response = creator_research_chat(user_input, conversation_history)
            print(f"\nAssistant: {response}\n")
            
            conversation_history.append({"role": "user", "content": user_input})
            conversation_history.append({"role": "assistant", "content": response})
            
            # Keep last 10 messages for context management
            if len(conversation_history) > 10:
                conversation_history = conversation_history[-10:]
                
        except Exception as e:
            print(f"\nError: {e}")
            print("Please try again or call us at +91 9545415111\n")


# Example usage and testing
if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("TESTING CREATOR RESEARCH PVT LTD CHATBOT")
    print("=" * 70 + "\n")
    
    # Test 1: About services
    print("Test 1: What services do you offer?")
    print("-" * 70)
    reply = creator_research_chat("What services do you offer?")
    print(f"Assistant: {reply}\n\n")
    
    # Test 2: Pricing question
    print("Test 2: What are your prices?")
    print("-" * 70)
    reply = creator_research_chat("What are your prices?")
    print(f"Assistant: {reply}\n\n")
    
    # Test 3: Off-topic question (should redirect)
    print("Test 3: What's the weather today? (Should redirect)")
    print("-" * 70)
    reply = creator_research_chat("What's the weather today?")
    print(f"Assistant: {reply}\n\n")
    
    # Test 4: Contact information
    print("Test 4: How can I contact you?")
    print("-" * 70)
    reply = creator_research_chat("How can I contact you?")
    print(f"Assistant: {reply}\n\n")
    
    # Start interactive session
    print("\n" + "=" * 70)
    print("STARTING INTERACTIVE SESSION")
    print("=" * 70 + "\n")
    chat_session()
