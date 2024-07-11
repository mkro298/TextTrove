import numpy as np
from PyPDF2 import PdfReader
from summerization import *
import pymupdf


def seperate_file(file_name, chapter_name=None):
    doc = pymupdf.open(file_name)
    toc = doc.get_toc()
    print(toc)
    extract_chapters(file_name, toc, chapter_name)

def extract_chapters(file_name, toc, chapter_name):

    if (chapter_name == None):
        read_file(file_name=file_name)
        return 

    doc = pymupdf.open(file_name)
    start = 0
    end = 0

    heir = 0 
    name = ""

    for i in range(len(toc)):
        heirarchy = int(toc[i][0])
        title = toc[i][1]
        page_num = int(toc[i][2])

        if (heir != 0 and heirarchy == heir):
            #start is already defined 
            end = page_num - 2 
            print(start)
            print(end)
            print(name)
            turn_into_pdf(start=start, end=end, doc=doc, title=name)
            return 
        elif (title.strip().lower() == chapter_name.strip().lower()):
            #right chapter 
            start = page_num - 1
            name = title
            heir = heirarchy
        

def turn_into_pdf(start, end, doc, title):
    chap = pymupdf.open()
    chap.insert_pdf(doc, from_page=start, to_page=end)
    chap.save(f"{title}.pdf")
    read_file(f"{title}.pdf")

    

def read_file(file_name):
    reader = PdfReader(file_name)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    run(text)


def main():
    #seperate_file("notes.pdf", "Gale-Shapley Stable Matching")
    seperate_file("catSample.pdf")

if __name__=="__main__":
    main()