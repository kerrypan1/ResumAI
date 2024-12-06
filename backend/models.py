import pickle
import openai

# Load the pickled models and functions
with open('resume_scoring_models.pkl', 'rb') as f:
    loaded_models = pickle.load(f)

# Extract components
model = loaded_models["model"]
section_scorer = loaded_models["section_scorer"]
analyze_resume = loaded_models["analyze_resume"]
resume_evaluator = loaded_models["resume_evaluator"]

print("Models and functions successfully loaded!")

# Example usage:

# Input data
resume = [
    "Bachelor's degree in Computer Science from XYZ University.",
    "Worked as a software engineer at ABC Corp for 2 years.",
    "Built a machine learning model that improved predictions by 15%.",
    "Python, Java, SQL, Machine Learning, React."
]

# Simulated dataframe (replace with your actual dataframe)
import pandas as pd
sample_data = {
    "Education": ["PhD in Computer Science", "Bachelor's in Electrical Engineering"],
    "Experience": ["Developed scalable web applications", "Managed a team of 5 engineers"],
    "Projects": ["Built a chatbot using NLP", "Implemented a recommendation system"],
    "Skills": ["Python, SQL, Machine Learning", "Java, React, Node.js"]
}
df = pd.DataFrame(sample_data)

# Use the resume evaluator
evaluation_results = resume_evaluator(resume, df)
print("Resume Evaluation Results:", evaluation_results)

# Use the analyze_resume function
resume_text = "Developed scalable web applications and increased team efficiency by 20%."
analysis_results = analyze_resume(resume_text)
print("Analyze Resume Results:", analysis_results)

# Load OpenAI API key
openai.api_key = "your_openai_api_key_here"

# Example resume input (replace with actual dataframe
resume_text = "John Doe has 5 years of experience in software engineering..."

# Analyze the resume using your loaded models
grammar_action_achievement_scores = analyze_resume(resume_text)
section_scores = resume_evaluator(
    ["Education section here", "Experience section here", "Projects section here", "Skills section here"],
    your_dataframe_variable_here,  # Replace with your DataFrame
    sample_size=10
)

# Combine results into a single string for OpenAI
results_summary = (
    f"Grammar Score: {grammar_action_achievement_scores['Grammar Score']}\n"
    f"Action Verb Score: {grammar_action_achievement_scores['Action Verb Score']}\n"
    f"Quantifiable Achievement Score: {grammar_action_achievement_scores['Quantifiable Achievement Score']}\n\n"
    f"Section Scores:\n"
    f"Education: {section_scores['Education']}\n"
    f"Experience: {section_scores['Experience']}\n"
    f"Projects: {section_scores['Projects']}\n"
    f"Skills: {section_scores['Skills']}\n"
    f"Total Score: {section_scores['Total']}\n"
)

# Send results to OpenAI for further processing (e.g., generating feedback)
response = openai.Completion.create(
    engine="text-davinci-003",  # Choose the engine
    prompt=f"Here is a resume analysis:\n{results_summary}\n"
           f"Please provide detailed feedback and suggestions for improvement.",
    max_tokens=500
)

# Print OpenAI's response
print("OpenAI Feedback:")
print(response.choices[0].text.strip())

