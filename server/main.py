from flask import Flask, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/api/users", methods=['GET'])

def users():
    return jsonify(
        {
            "users": [
                'Kerrry',
                'Eric is the goat',
                'Altay',
                'Yeonju',
                "Catherine",
                "Arthur",
                "Cathryn",
                'Daniel',
                'Katy',
                'Jesslyn',
                'Michelle',
                'Vivian',
            ] 
        }
    )


def generate_feedback(scores):
    #right now it is setup to take in a dictionary of different scores
    #doesn't know about the specific role that the user is applying/optimizing for
    prompt = f"""
    You are an experienced career coach specializing in computer science and data science jobs. 
    Evaluate the following candidate's resume for roles such as Data Scientist, Machine Learning Engineer, and Software Developer.

    The candidate has been evaluated with the following scores:
    - Experience: {scores['experience']}/5
    - Skills: {scores['skills']}/5
    - Education: {scores['education']}/5

    Provide detailed feedback:
    1. Highlight strengths in the candidate's resume.
    2. Identify weaknesses or gaps.
    3. Offer actionable advice on how to improve their resume for technical roles in data science or computer science.
    """
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # Or use "gpt-3.5-turbo"
            prompt=prompt,
            max_tokens=500,
            temperature=0.7,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return str(e)


# Route: Generate feedback for a resume
@app.route('/generate-feedback', methods=['POST'])
def generate_feedback_endpoint():
    """
    Handles requests for generating resume feedback based on scores.
    """
    try:
        # Parse the JSON payload from the frontend
        data = request.get_json()
        scores = data.get('scores', {})

        # Validate input
        if not scores or not all(k in scores for k in ['experience', 'skills', 'education']):
            return jsonify({'error': 'Invalid or incomplete scores provided'}), 400

        # Generate feedback using OpenAI
        feedback = generate_feedback(scores)
        return jsonify({'feedback': feedback}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



S3_BUCKET = 'resumai'
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
AWS_REGION = 'us-east-2'

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

@app.route('/upload-pdf', methods=['POST'])
#This endpoint takes a pdf and upload it to the amazon s3 bucket. 
def upload_pdf_to_s3():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    try:
        # Upload the file to S3
        s3_client.upload_fileobj(
            file,
            S3_BUCKET,
            file.filename,
            ExtraArgs={'ContentType': 'application/pdf'}
        )
        file_url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file.filename}"
        return jsonify({'message': 'File uploaded successfully', 'file_url': file_url}), 200

    except NoCredentialsError:
        return jsonify({'error': 'Credentials not available'}), 500
    except PartialCredentialsError:
        return jsonify({'error': 'Incomplete credentials configuration'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)