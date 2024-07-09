from transformers import pipeline
import textwrap
import numpy as np
import pandas as pd
from pprint import pprint

import requests

#fine tune dataset for academic texts 
#sciBert model 


summarizer = pipeline('summarization', model='facebook/bart-large-cnn')

def wrap(x):
  return textwrap.fill(x, replace_whitespace=False, fix_sentence_endings=True)


def summerize(text):
  wrapped_text = wrap(text)
  summary = summarizer(wrapped_text, max_length=400, min_length=50, do_sample=False)
  pprint(summary[0]['summary_text'])


