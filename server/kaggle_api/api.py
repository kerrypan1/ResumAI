import os
import boto3
from kaggle.api.kaggle_api_extended import KaggleApi
from pathlib import Path

# Set your Kaggle and AWS S3 configurations
KAGGLE_DATASETS = [
    'username/dataset1',  # Replace with actual Kaggle dataset names
    'username/dataset2',  # Example format: 'zillow/zecon'
    # Add more datasets as needed
]

KAGGLE_DATASET_ID = [
    'username, id' # Replace with actual Kaggle dataset ID
]

AWS_ACCESS_KEY_ID = 'YOUR_ACCESS_KEY'
AWS_SECRET_ACCESS_KEY = 'YOUR_SECRET_KEY'
S3_BUCKET_NAME = 'your-s3-bucket-name'     # Replace with your bucket name
S3_FOLDER = 'kaggle_datasets'              # Optional: S3 folder for organizing datasets
DOWNLOAD_PATH = '/tmp/kaggle_datasets'     # Temporary local download path

# Initialize Kaggle API
api = KaggleApi()
api.authenticate()

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# Download and unzip dataset
for dataset_id in KAGGLE_DATASET_ID:
    DOWNLOAD_PATH.mkdir(parents=True, exist_ok=True)
    api.dataset_download_files(dataset_id, path=str(DOWNLOAD_PATH), unzip=True)

# Function to upload files to S3
def upload_to_s3(local_file_path, bucket, s3_key):
    """
    Uploads a local file to S3.
    
    Args:
        local_file_path (str): Path to the local file.
        bucket (str): S3 bucket name.
        s3_key (str): Path in S3 bucket to upload the file.
    """
    s3_client.upload_file(local_file_path, bucket, s3_key)
    print(f"Uploaded {local_file_path} to s3://{bucket}/{s3_key}")

# Upload each downloaded file to S3
for file_path in DOWNLOAD_PATH.glob('*'):
    s3_key = f"{S3_FOLDER}/{file_path.name}" if S3_FOLDER else file_path.name
    upload_to_s3(str(file_path), S3_BUCKET_NAME, s3_key)
