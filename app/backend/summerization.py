from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import textwrap
import numpy as np
import pandas as pd
from pprint import pprint


tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

pipe = pipeline("summarization", model=model, tokenizer=tokenizer)

def wrap(x):
  return textwrap.fill(x, replace_whitespace=False, fix_sentence_endings=True)


def summarize(text, max_input_length=1000, max_length=150, min_length=30, do_sample=False):
    if len(text) > max_input_length:
        text_chunks = textwrap.wrap(text, max_input_length)
        summary = []
        for chunk in text_chunks:
            summary.append(pipe(chunk, max_length=max_length, min_length=min_length, do_sample=do_sample)[0]['summary_text'])
        return ' '.join(summary)
    else:
        summary = pipe(text, max_length=max_length, min_length=min_length, do_sample=do_sample)
        return summary[0]['summary_text']
  

def run(text):
    wrapped_text = wrap(text)
    summary = summarize(wrapped_text)
    pprint(summary)


