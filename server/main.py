from flask import Flask, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from flask_cors import CORS
import os
from dotenv import load_dotenv

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