import numpy as np
from PyPDF2 import PdfReader
from summerization import *
import pymupdf


def seperate_file(file_name):
    doc = pymupdf.open(file_name)
    toc = doc.get_toc()
    print(toc)
    #extract_chapters(file_name, toc, chapter)

def extract_chapters(file_name, toc, chapter):
    doc = pymupdf.open(file_name)
    start = 0
    end = 0



    """ for i in range(len(toc)):
       heirarchy = int(toc[i][0]) #only 1 is a main header 
       title = toc[i][1]
       page_num = toc[i][2] #start page number of section 
       if (heirarchy == 1):
           #it's the start of a main section 
           end = page_num - 1
           turn_into_pdf(start, end, doc, title)
           start = page_num - 1
    #reached last chapter 
    turn_into_pdf(start, len(doc) - 1, doc, title)
     """

def turn_into_pdf(start, end, doc, title):
    chap = pymupdf.open()
    chap.insert_pdf(doc, from_page=start, to_page=end)
    chap.save(f"{title}.pdf")
    read_file(f"{title}.pdf")

    

def read_file(file_name):
    reader = PdfReader(file_name)
    number_of_pages = len(reader.pages)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    run(text)


def main():
    seperate_file("notes.pdf")

if __name__=="__main__":
    main()