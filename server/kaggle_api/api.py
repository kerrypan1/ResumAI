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

# Create function to send all the downloaded data to our database, AWS s3 buckets