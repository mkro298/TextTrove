from transformers import pipeline
from scraping import *
from summerization import *

pipe = pipeline("text2text-generation", model="voidful/context-only-question-generator")

def generate_question(context):
    question = pipe(context, max_length=20)
    question = question[0]['generated_text']
    return context, question

def extract_context(summary):
    sections = []
    curr = ""

    sentences = summary.split(". ")

    for sentence in sentences:
        curr += sentence + ". "

        if (len(curr) > 100):
            sections.append(curr)
            curr = ""

    if curr:
        sections.append(curr.strip())
    
    return sections

def generate(summary):
    sections = extract_context(summary)
    questions = []
    
    for section in sections:
        questions.append(generate_question(section))
    
    return sections, questions

