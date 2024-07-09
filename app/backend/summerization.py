from transformers import pipeline
import textwrap
import numpy as np
import pandas as pd
from pprint import pprint

import requests

url = 'https://dl.dropboxusercontent.com/s/7hb8bwbtjmxovlc/bbc_text_cls.csv'

response = requests.get(url)

if response.status_code == 200:
    file_path = 'bbc_text_cls.csv'

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

