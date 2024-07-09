from transformers import pipeline
import textwrap
import numpy as np
import pandas as pd
from pprint import pprint

import requests

# URL of the file to download (modified for direct download)
url = 'https://dl.dropboxusercontent.com/s/7hb8bwbtjmxovlc/bbc_text_cls.csv'

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Specify the file path where you want to save the downloaded file
    file_path = 'bbc_text_cls.csv'

    # Open the file in binary write mode and write the contents of the response
    with open(file_path, 'wb') as f:
        f.write(response.content)

    print(f"File downloaded successfully to '{file_path}'")
else:
    print(f"Failed to download file, status code: {response.status_code}")

df = pd.read_csv('bbc_text_cls.csv')

pprint(df.head())

doc = df[df.labels == 'business']['text'].sample(random_state=42)

def wrap(x):
  return textwrap.fill(x, replace_whitespace=False, fix_sentence_endings=True)


print(wrap(doc.iloc[0]))
summarizer = pipeline('summarization')

doc = df[df.labels == 'business']['text'].sample(random_state=42)

summarizer(doc.iloc[0].split('\n',1)[1])

