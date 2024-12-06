# Folder of pdfs to categorized csv

import spacy
import pandas as pd
import re
import fitz
import os
from rapidfuzz import fuzz, process
from datetime import datetime
import dateutil.parser
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Define categories to extract with expanded keywords
CATEGORIES = {
    "Education": [
        "degree", "university", "college", "school", "graduated", "studied", "degree program",
        "bachelor", "master", "phd", "doctorate", "gpa", "major", "minor", "thesis",
        "academic", "diploma", "certification", "coursework", "honors program"
    ],
    "Experience": [
        "experience", "work", "job", "company", "role", "position", "internship",
        "employment", "tenure", "career", "responsibilities", "contributions",
        "led", "managed", "developed", "implemented", "coordinated", "supervised",
        "achieved", "created", "launched", "spearheaded", "orchestrated"
    ],
    "Projects": [
        "projects", "case study", "portfolio", "implementation", "demonstrated",
        "initiative", "proof of concept", "prototype", "hackathon", "research",
        "developed", "built", "designed", "collaborated", "architected", "deployed"
    ],
    "Skills": [
        "skills", "technologies", "tools", "framework", "languages", "expertise",
        "proficiencies", "competencies", "aptitude", "specialization",
        "proficient in", "experienced with", "knowledge of", "familiar with"
    ]
}

# Define section headers patterns
SECTION_HEADERS = {
    "education": r"(?i)^[\s]*(?:education|academic background|educational background)[\s]*$",
    "experience": r"(?i)^[\s]*(?:experience|work experience|professional experience|employment history)[\s]*$",
    "skills": r"(?i)^[\s]*(?:skills|technical skills|core competencies|expertise)[\s]*$",
    "projects": r"(?i)^[\s]*(?:projects|personal projects|professional projects)[\s]*$"
}

# Define format patterns
FORMAT_PATTERNS = {
    "phone": r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b",
    "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
    "linkedin": r"linkedin.com/in/[\w-]+",
    "date": r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[.,]?\s+(?:19|20)\d{2}\b"
}

def clean_experience_text(text):
    """
    Enhanced cleaning of the extracted experience text.
    """
    # Remove unwanted symbols while preserving important punctuation
    text = re.sub(r"[^\w\s,.:;()-]", "", text)
    text = re.sub(r"\s+", " ", text)
    text = text.strip()
    
    # Remove common noise words
    noise_words = ["page", "resume", "curriculum vitae", "cv"]
    for word in noise_words:
        text = re.sub(rf"\b{word}\b", "", text, flags=re.IGNORECASE)
    
    return text

def extract_dates(text):
    """Extract and normalize dates from text."""
    date_patterns = [
        r"\b(19|20)\d{2}\b",
        r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[.,]?\s+(?:19|20)\d{2}\b",
        r"\b(?:Present|Current)\b"
    ]
    dates = []
    for pattern in date_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            date_str = match.group()
            if date_str.lower() in ['present', 'current']:
                dates.append(datetime.now())
            else:
                try:
                    dates.append(dateutil.parser.parse(date_str))
                except:
                    continue
    return sorted(dates)

def find_original_text_with_position(extracted_text, full_pdf_text, threshold=85):
    """
    Find the original text in the PDF and return it with its position.
    """
    # Clean the extracted text for comparison
    cleaned_extracted = ' '.join(extracted_text.lower().split())
    
    # Find the position in the original text
    position = full_pdf_text.lower().find(cleaned_extracted)
    if position == -1:  # If exact match not found, use fuzzy matching
        # Split the PDF text into paragraphs
        pdf_sections = re.split(r'\n{2,}', full_pdf_text)
        best_match = None
        best_ratio = 0
        best_position = 0
        current_position = 0
        
        for section in pdf_sections:
            cleaned_section = ' '.join(section.strip().lower().split())
            if len(cleaned_section) > 10:
                ratio = fuzz.token_sort_ratio(cleaned_extracted, cleaned_section)
                if ratio > threshold and ratio > best_ratio:
                    best_ratio = ratio
                    best_match = section.strip()
                    best_position = current_position
            current_position += len(section) + 2  # +2 for the newlines
        
        if best_match:
            return best_match, best_position
    else:
        # Find the complete sentence or section around the matched position
        start = max(0, full_pdf_text.rfind('\n', 0, position))
        end = full_pdf_text.find('\n', position + len(cleaned_extracted))
        if end == -1:
            end = len(full_pdf_text)
        return full_pdf_text[start:end].strip(), position
    
    return extracted_text, float('inf')  # Return original with infinite position if no match found

def extract_text_by_category(text, category_keywords, full_pdf_text, threshold=80):
    """
    Extract all text between section headers for a given category.
    """
    sections = {}
    current_section = None
    section_content = []
    
    # Split text into lines
    lines = text.split('\n')
    
    # Find the target category name
    category_name = next((k for k, v in CATEGORIES.items() if set(v) == set(category_keywords)), '').lower()
    
    # Create a list of all section header patterns
    all_section_patterns = list(SECTION_HEADERS.values())
    
    # Process line by line
    for line in lines:
        # Check if line matches any section header
        for section, pattern in SECTION_HEADERS.items():
            if re.match(pattern, line, re.IGNORECASE):
                # Save previous section content if it exists
                if current_section:
                    sections[current_section] = '\n'.join(section_content)
                current_section = section
                section_content = []
                break
        else:
            # If no section header match found and we're in a section, add line to content
            if current_section:
                section_content.append(line)
    
    # Save the last section
    if current_section:
        sections[current_section] = '\n'.join(section_content)
    
    # If the target category exists in the sections
    if category_name in sections:
        # Find the index of our category in the ordered list of sections
        section_order = list(sections.keys())
        category_index = section_order.index(category_name)
        
        # Get the next category index (if it exists)
        next_category_index = category_index + 1
        if next_category_index < len(section_order):
            next_category = section_order[next_category_index]
        else:
            next_category = None
        
        # Extract all content from this category until the next category
        extracted_text = sections[category_name]
        
        # Clean and format the extracted text
        cleaned_text = clean_experience_text(extracted_text)
        if cleaned_text and len(cleaned_text) > 10:
            return cleaned_text
    
    return ""

def get_context_window(text, keyword, window_size=200):  # Increased window size
    """Extract text around a keyword with context, handling multiple occurrences."""
    contexts = []
    start_pos = 0
    text_lower = text.lower()
    keyword_lower = keyword.lower()
    
    while True:
        keyword_index = text_lower.find(keyword_lower, start_pos)
        if keyword_index == -1:
            break
            
        # Find the start of the sentence or section
        sentence_start = text.rfind('.', max(0, keyword_index - window_size), keyword_index)
        sentence_start = text.rfind('\n', max(0, keyword_index - window_size), keyword_index) if sentence_start == -1 else sentence_start
        sentence_start = max(0, sentence_start + 1)
        
        # Find the end of the sentence or section
        sentence_end = text.find('.', keyword_index + len(keyword))
        sentence_end = text.find('\n', keyword_index + len(keyword)) if sentence_end == -1 else sentence_end
        sentence_end = len(text) if sentence_end == -1 else sentence_end + 1
        
        context = text[sentence_start:sentence_end].strip()
        if context:
            contexts.append(context)
        
        start_pos = keyword_index + len(keyword)
    
    return '\n'.join(contexts)

def fuzzy_keyword_match(text, keywords, threshold=80):
    """
    Enhanced fuzzy keyword matching with context consideration.
    """
    matches = []
    for keyword in keywords:
        try:
            # Process the entire text against the keyword, not individual words
            result = process.extractOne(keyword, [text], scorer=fuzz.token_set_ratio)
            if result and result[1] >= threshold:
                context = get_context_window(text, keyword)
                if context:
                    matches.append((keyword, context, result[1]))
        except Exception as e:
            print(f"Error in fuzzy matching for keyword {keyword}: {str(e)}")
            continue
    return matches

def clean_and_format_text(text):
    """
    Clean and format text entries with improved deduplication using fuzzy matching.
    """
    # Remove leading numbers, '0', and 'Submission)' text
    text = re.sub(r'(?m)^\d+\s*', '', text)
    text = re.sub(r'\b0\b\s*', '', text)
    text = re.sub(r'Submission\)\s*', '', text)
    
    # Split into entries (by periods, newlines, or date patterns)
    entries = re.split(r'(?<=[.!?])\s+|\n+|(?=(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4})', text)
    
    # Clean and deduplicate entries using fuzzy matching
    unique_entries = []
    seen = set()
    
    for entry in entries:
        # Clean the entry
        cleaned_entry = entry.strip()
        
        # Skip empty entries or entries that are too short
        if not cleaned_entry or len(cleaned_entry) < 10:
            continue
        
        # Create a normalized version for comparison
        normalized = ' '.join(cleaned_entry.lower().split())
        
        # Check for fuzzy duplicates
        is_duplicate = False
        for seen_entry in seen:
            if fuzz.ratio(normalized, seen_entry) > 85:  # Adjust threshold as needed
                is_duplicate = True
                break
        
        # Only add if not a duplicate
        if not is_duplicate:
            seen.add(normalized)
            unique_entries.append(cleaned_entry)
    
    # Join entries with proper spacing and formatting
    formatted_text = '\n\n'.join(entry.strip() for entry in unique_entries if entry.strip())
    
    # Final cleanup
    formatted_text = re.sub(r'\s{3,}', '\n\n', formatted_text)
    formatted_text = re.sub(r'\s+', ' ', formatted_text)
    
    return formatted_text

def classify_resume(resume_text, full_pdf_text):  # Modified to accept full_pdf_text
    """
    Enhanced resume classification with reference to original text.
    """
    classified_data = {}
    for category, keywords in CATEGORIES.items():
        extracted_text = extract_text_by_category(resume_text, keywords, full_pdf_text)  # Pass full_pdf_text
        if extracted_text:
            classified_data[category] = extracted_text
    return classified_data

def process_resumes_from_pdfs(folder_path, output_csv):
    """
    Process PDFs with reference to original text.
    """
    files = [f for f in os.listdir(folder_path) if f.endswith('.pdf')]
    data = []
    total_files = len(files)

    for index, pdf_doc in enumerate(files, 1):
        try:
            print(f"Processing {index}/{total_files}: {pdf_doc}")
            doc = fitz.open(os.path.join(folder_path, pdf_doc))
            
            # Get full PDF text
            full_pdf_text = ""
            for i in range(doc.page_count):
                full_pdf_text += doc.load_page(i).get_text("text") + "\n"
            
            # Classify using original PDF text as reference
            classified = classify_resume(full_pdf_text, full_pdf_text)  # Pass full_pdf_text twice
            classified["PDF Name"] = pdf_doc
            data.append(classified)
            
            print(f"Successfully processed {pdf_doc}")
            
        except Exception as e:
            print(f"Error processing {pdf_doc}: {str(e)}")
            continue
    
    output_df = pd.DataFrame(data)
    output_df.to_csv(output_csv, index=False)
    print(f"Processed {len(data)}/{total_files} resumes. Results saved to {output_csv}")

# Main script
if __name__ == "__main__":
    folder_path = "path" # Specify Path
    output_csv_path = "path" # Specify Path
    process_resumes_from_pdfs(folder_path, output_csv_path)
