import numpy as np
from PyPDF2 import PdfReader
from summerization import *

def read_file(file_name):
    reader = PdfReader(file_name)
    number_of_pages = len(reader.pages)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    summerize(text)


def main():
    read_file("catSample.pdf")

if __name__=="__main__":
    main()